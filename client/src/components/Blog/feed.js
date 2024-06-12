import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../../styling/feed.css';
import {Container, Row, Col, Button, Card, CardBody, CardText, CardTitle, CardImg, Placeholder,
} from 'reactstrap';
import UploadModal from './uploadpost.js';
import MyNav from './navbar.js';
import {useNavigate} from 'react-router-dom';
import placeholder from '../../asset/placeholder.jpeg';

function PostCard(props){
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  let placeholder = "https://fastly.picsum.photos/300/200";
  const content = props.post.content
    return (
      <div>
        {loaded ? (
          <Card
            color="primary"
            outline
            className="postcard"
            onClick={() => navigate(`/post/${props.post._id}`)}
          >
            <CardImg className="cardimg" src={placeholder} top />
            <CardBody className="multine-ellipsis">
              <CardTitle tag="h5">{props.post.title}</CardTitle>
              <CardText className="text-muted">{content}</CardText>
            </CardBody>
          </Card>
        ) : (
          <div>
            <PostHolder src={props.src} />
            <img
              alt="img"
              src={placeholder}
              onLoad={() => setLoaded(true)}
              style={{ display: "none" }}
            ></img>
          </div>
        )}
      </div>
    );

}

function PostHolder(props){
  return (
    <Card color="primary" outline className="postcard">
      <CardImg alt="Card image cap" src={props.src} top className="cardimg" />
      <CardBody>
        <Placeholder animation="glow" tag="h5">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder animation="glow" tag="p">
          <Placeholder xs={12} />
          <Placeholder xs={12} />
        </Placeholder>
      </CardBody>
    </Card>
  );
}

export default function Feed(){
    const [feed, setFeed] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const src=placeholder;
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
        return (
          <Row xs="1" sm="2" md="3">
            {(feed.map((post) => (
              <Col key={post._id}>
                <PostCard
                  post={post} src={src}
                />
              </Col>
            )))}
          </Row>
        );
    }


    return (
      <div>
        <MyNav/>
        <Container>
          <Row>
            <Col className="col-4">
              <h2>Feed</h2>
            </Col>
            <Col className="col-4">
              <Button color="primary" onClick={openUploadModal}>
                Upload
              </Button>
              <UploadModal show={showUpload} toggle={toggleUploadModal} />
            </Col>
          </Row>
          {showPosts()}
        </Container>
      </div>
    );
}
