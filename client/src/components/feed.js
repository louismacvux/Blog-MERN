import React, {useState, useEffect} from 'react'
//import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../styling/feed.css';
import {Modal,Container, Row, Col, Button} from 'reactstrap';
import Delete from './deletepost.js';

function Post(props){
    const [showModal, setShowModal] = useState(false);

    const openModal = ()=>{
        setShowModal(true);
    }

    const toggleModal = ()=>{
        setShowModal(!showModal)
    }
    return(
        <Container>
            <Row className="justify-content-center">
                <Col className="col-6 post"> <h4>Title: {props.post.title}</h4></Col>
                <Col className="col-6 post align-content-flex-end"><p>Time: {props.post.time}</p></Col>
                <Col className="col post"><h5>{props.post.content}</h5></Col>
            </Row>
            <Row>
                <Col className="col-4"><Button onClick={openModal}>Delete</Button></Col>
            </Row>
            <Delete show={showModal} toggle = {toggleModal} id={props.post._id} />
        </Container>
    )

}


export default function Feed(){
     const [feed, setFeed] = useState([]);

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
        return feed.map((post) => {
            return (
                <div className="post">
                    <Post post = {post}/>
                </div>
            )
        });
     }


     return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Feed</h1>
                        <tr>
                            <td>
                                {showPosts()}
                            </td>
                        </tr>
                    </Col>
                </Row>
            </Container>
        </div>
     );
}
