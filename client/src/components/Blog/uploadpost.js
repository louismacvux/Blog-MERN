import React, { useState } from "react";
import {Modal, ModalHeader, ModalBody,
Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function UploadModal(props){
  const [postContent, setPostContent] = useState({title:"",  time: "", content:""});

  const handleChange = (event) =>{
    const value = event.target.value;
    setPostContent(prevState => ({
      ...prevState, [event.target.name]: value
    }))
  }

  async function UploadPost(){
    try{
      await axios.post("http://localhost:8000/feed/post", postContent);
    }
    catch(err){
      window.alert(`An error has occured: ${err.statusText}`)
    }
  }

  const handleSubmit = (event) =>{
    //window.alert(JSON.stringify(postContent))
    UploadPost().then(() => window.location.reload(true));
    props.toggle();
  }

  return (
    <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader>Upload</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <FormGroup row>
              <Label for="title" sm={2}>
                Title
              </Label>
              <Col sm={10}>
                <Input
                  required
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="content" sm={2}>
                Content
              </Label>
              <Col sm={10}>
                <Input
                  required
                  id="content"
                  name="content"
                  placeholder="What's on your mind?"
                  type="textarea"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="img" sm={2}>
                Photos
              </Label>
              <Col sm={10}>
                <Input id="img" name="file" type="file" 
                accept="image/*"/>
              </Col>
            </FormGroup>
            <Button style={{marginRight:10}} type="submit" color="primary">Post</Button>
            <Button onClick={props.toggle}>Cancel</Button>
          </Form>
        </ModalBody>
    </Modal>
  );
}
