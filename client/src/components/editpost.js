import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, 
    Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";

export default function EditModal(props) {
  const [postContent, setPostContent] = useState(props.post);

  useEffect(() => {
    setPostContent(props.post)
  }, [props.post]);

  const handleChange = (event) => {
    const value = event.target.value;
    setPostContent((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  async function UpdatePost() {
    axios.patch(`http://localhost:8000/post/${props.post._id}`, postContent)
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            window.alert(`An error has occured: ${error.statusText}`);
          })
  }

  const handleSubmit = (event) => {
    window.alert(JSON.stringify(postContent))
    UpdatePost().then(() => window.location.reload(true));
    props.toggle();
  };

  return (
    <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader>Edit</ModalHeader>
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
                defaultValue={postContent.title}
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
                defaultValue={postContent.content}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="img" sm={2}>
              Photos
            </Label>
            <Col sm={10}>
              <Input id="img" name="file" type="file" accept="image/*" />
            </Col>
          </FormGroup>
          <Button style={{ marginRight: 10 }} type="submit" color="primary">
            Update
          </Button>
          <Button onClick={props.toggle}>Cancel</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}
