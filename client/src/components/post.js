import React, { useState, useEffect } from "react";
import {Button} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from "./deletepost.js";

export default function Post(props){
    const [post, setPost] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };

    const toggleModal = () => {
      setShowModal(!showModal);
    };
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
      async function getPost() {
        try{
          const response = await axios.get(`http://localhost:8000/post/${id}`);
          setPost(response.data)
        }
        catch (error) {
            console.log(`An error has occured: ${error}`);
            navigate("/oops")
          return;
        }
      }
      getPost();
      return;
    },[id]);

    function showPost(){
        return (
          <div>
            {post ?
            (<div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>{post.time}</p>
              <Button onClick={openModal}>Delete</Button>
              <DeleteModal
                show={showModal}
                toggle={toggleModal}
                id={post._id}
              />
            </div>) : null}
          </div>
        );
    }

    return(
      showPost()
    );
}