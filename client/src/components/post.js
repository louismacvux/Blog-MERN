import React, { useState, useEffect } from "react";
import {Button} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from "./deletepost.js";
import EditModal from "./editpost.js";
import MyNav from './navbar.js';
import "../styling/post.css";

export default function Post(props){
    const [post, setPost] = useState([]);
    const [showDelete, setshowDelete] = useState(false);
    const [showEdit, setshowEdit] = useState(false);
    
    const openDelete = () => {
      setshowDelete(true);
    };

    const toggleDelete = () => {
      setshowDelete(!showDelete);
    };

    const openEdit = () => {
      setshowEdit(true);
    };

    const toggleEdit = () => {
      setshowEdit(!showEdit);
    };
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
      async function getPost() {
        axios.get(`http://localhost:8000/post/${id}`)
              .then((response) => {
                setPost(response.data)
              })
              .catch((error) => {
                console.log(`An error has occured: ${error}`);
                navigate("/oops");
              })
      }
      getPost();
    },[id,navigate]);

    function showPost(){
        return (
          <div>
            {post ? (
              <div className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.update_time ? (
                  <p>Edited at {post.update_time}</p>
                ) : (
                  <p>{post.time}</p>
                )}
                <Button
                  style={{ marginRight: 10 }}
                  color="danger"
                  onClick={openDelete}
                >
                  Delete
                </Button>
                <DeleteModal
                  show={showDelete}
                  toggle={toggleDelete}
                  id={post._id}
                />
                <Button color="primary" onClick={openEdit}>
                  Edit
                </Button>
                <EditModal show={showEdit} toggle={toggleEdit} post={post} />
              </div>
            ) : null}
          </div>
        );
    }

    return(
      <div>
        <MyNav/>
        {showPost()}
      </div>
    );
}