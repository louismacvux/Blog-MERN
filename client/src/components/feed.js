import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../styling/feed.css';
import placeHolderphoto from '../asset/placeholder.jpeg'
import {Container, Row, Col, Button, Card, CardBody, CardText, CardTitle, CardImg} from 'reactstrap';
import DeleteModal from './deletepost.js';
import UploadModal from './uploadpost.js';

function Post(props){
    const [showModal, setShowModal] = useState(false);

    const openModal = ()=>{
        setShowModal(true);
    }

    const toggleModal = ()=>{
        setShowModal(!showModal)
    }
    return (
      <Card color="primary" outline>
        <CardImg src={placeHolderphoto} />
        <CardBody>
          <CardTitle tag="h4">{props.post.title}</CardTitle>
          <CardText>{props.post.content}</CardText>
          <Button onClick={openModal}>Delete</Button>
          <DeleteModal
            show={showModal}
            toggle={toggleModal}
            id={props.post._id}
          />
        </CardBody>
      </Card>
    );

}


export default function Feed(){
    const [feed, setFeed] = useState([]);
    const [showUpload, setShowUpload] = useState(false);

    const toggleUploadModal = () => {
        setShowUpload(!showUpload)
    }

    const openUploadModal = () => {
        setShowUpload(true)
    }
    useEffect(() =>{
        async function getPosts(){
            const response = await axios.get('http://localhost:8000/feed')
            if (!response){
                window.alert(`An error has occured: ${response.statusText}`)
                return
            }
        
            const feed = response.data;
            (feed.length !== 0) ? setFeed(feed) : window.alert("No posts")
        }

        getPosts();
        return;
    }, [feed.length])

    function showPosts(){
        return(
            <Row xs={2} md={3} className="g-4">
                {feed.map((post) => (
                    <Col key={post._id}>
                        <Post post = {post}/>
                    </Col>
                ))}
            </Row>
        );
    }


    return (
        <div>
        <Container>
           <Row>
             <Col className="col-4">
               <h2>Feed</h2>
             </Col>
             <Col className="col-4">
               <Button color="primary" onClick={openUploadModal}>Upload</Button>
               <UploadModal show = {showUpload} toggle = {toggleUploadModal}/>
             </Col>
           </Row>
           {showPosts()}
         </Container>
       </div>
    );
}
