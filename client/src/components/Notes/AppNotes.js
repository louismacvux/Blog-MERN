import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';
import GoogleLogin from '../GoogleLogin';
import "../../styling/notes.css";

import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default function AppNotes() {
    const [notes, setNotes] = useState(null);
    const [selectedId, setSelectedId] = useState(0)
    const [user,setUser] = useState()

    useEffect(() => {           
      api
        .get("/feed")
        .then((response) => {
          if (response.status !== 200) {
            window.alert(`An error has occured: ${response.statusText}`);
          }
          return response.data;
        })
        .then((data) => {
            setNotes(data)})
        .catch((error) => console.log(`An error has occured: ${error}`));
    }, [user]);

    const selectNote = (id) =>{
        setSelectedId(id)
    }

    async function deleteNote () {
        api
          .delete(`/post/${selectedId}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            window.alert(`An error has occured: ${error.statusText}`);
          });
    }

    async function newNote(){
        //add fake note at the top of list to show on sidebar
        if(notes[0]._id !== "0000"){
          notes.unshift({
            _id: "0000",
            title: "New Note",
            content: "## Welcome to the Note App!"
          });
          selectNote(notes[0]._id)
        }
    }

    async function saveNote(){
      const selectedNote = notes.find((note) => note._id === selectedId)
      if (selectedNote) window.alert(selectedNote.content)
      else window.alert("Choose a note to edit first, or create new note.")
    }

    function showLoggedIn(){
      return (
        <Container className="container app">
          {notes ? (
            <div>
              <Row className="header">
                <h3>
                  {user && user.name} ({user && user.email})'s Note
                </h3>
                <Button
                  className="col-3 mx-3 delete-note"
                  onClick={() => deleteNote()}
                >
                  Delete
                </Button>
                <Button className="col-3" onClick={() => saveNote()}>
                  Save
                </Button>
                <Button className="col-3 mx-3" onClick={() => newNote()}>
                  New Note
                </Button>
              </Row>
              <Row>
                <Col className="col-4 col-lg-3">
                  <SideBar
                    notes={notes}
                    selectNote={selectNote}
                    selectedId={selectedId}
                  />
                </Col>
                <Col className="col-8 col-lg-9">
                  <NoteEditor
                    note={notes.find((note) => selectedId === note._id)}
                  />
                </Col>
              </Row>
            </div>
          ) : (
            <p className="no-note">fetching notes...</p>
          )}
        </Container>
      );
    }

    function Login(){
      return(
        <GoogleLogin setUser={setUser}></GoogleLogin>
      )
    }

    return (
      <div className="app-container">
        {user ? (showLoggedIn()): (Login())}
      </div>
    );
}