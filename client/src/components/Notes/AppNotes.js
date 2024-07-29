import React, {useState, useEffect} from 'react';
import baseAPI from '../../utils/api';
import SideBar from './SideBar';
import NoteEditor from './NoteEditor';
import GoogleLogin from '../GoogleLogin';
import UserDropdown from './UserMenu.js';
import intro from '../../utils/intro.js'
import "../../styling/notes.css";
import "../../styling/modal.css";

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader, 
  ModalBody,
  ModalFooter
} from "reactstrap";

export default function AppNotes() {
    const [notes, setNotes] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const [isSidebarCollapsed, setIsSidebarCollapsed] =  useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(() => {
      const user = localStorage.getItem("user");
      return JSON.parse(user) || null;
    });

    async function getNotes(){
      baseAPI
        .get("/notes")
        .then((response) => {
          if (response.status !== 200) {
            window.alert(`An error has occured: ${response.statusText}`);
          }
          return response.data;
        })
        .then((data) => {
          setNotes(data);
          if (data.length > 0 && selectedId === 0){
            setSelectedId(data[0]._id)
          }
        })
        .catch((error) => console.log(`An error has occured: ${error}`));
    }

    useEffect(() => {
      if (user){
        document.title = `${user.name}'s notes`;
        getNotes();
      }
    },[])
    
    const selectNote = (id) =>{
        setSelectedId(id)
    }
    
    async function deleteNote () {
      const selectedNote = notes.find((note) => note._id === selectedId);
      const index = notes.indexOf(selectedNote)
      if (selectedId === "1111"){
        notes.shift()
      }else{
        baseAPI
          .delete(`/note/${selectedId}`)
          .then((response) => {
            if (response.status !== 200){
              throw new Error("Delete error");
            }
            getNotes();
            if (notes.length > 2){
              if (index+1 < notes.length){
                selectNote(notes[index+1]._id) //select the lower note after delete
              }
              else{
                selectNote(notes[index - 1]._id);
              }
            }
            else{
              selectNote(notes[0]._id); //one note left - select the top
            }
          })
          .catch((error) => {
            window.alert(`An error has occured: ${error}`);
          });
      }
      setSelectedId(notes[0]._id);
      setIsModalOpen(false);
    }

    async function newNote(){
        //add fake note at the top of list to show on sidebar
        if(notes.length === 0 || notes[0]._id !== "1111"){
          notes.unshift({
            _id: "1111",
            content: intro
          });
          setSelectedId(notes[0]._id)
        }
    }

    async function updateNote(){
      const selectedNote = notes.find((note) => note._id === selectedId);
      baseAPI
        .put(`note/${selectedId}`, selectedNote)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          getNotes();
        })
        .catch((error) => {
          window.alert(`An error has occured: ${error}`);
        });
    }

    async function uploadNote(){
      const selectedNote = notes.find((note) => note._id === selectedId);
      baseAPI
        .post("/note", selectedNote)
        .then((response) => {
          if (response.status !== 200){
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.data;
        })
        .then((data) => {
          getNotes();
          selectNote(data.noted_id);})
        .catch((error) => {
          window.alert(`An error has occured: ${error}`);
        });
    }

    async function saveNote(){
      const selectedNote = notes.find((note) => note._id === selectedId)
      if (selectedNote){
        if (selectedId === "1111") {
          uploadNote();
        } else {
          updateNote();
        }
      }
      else window.alert("Choose a note to edit first, or create new note.")
    }

    function showLoggedIn(){
      return (
        <Container className="app">
          {notes ? (
            <div>
              <Row>
                <Col>
                  <Container>
                    <Row>
                      <Button
                        className="col-5"
                        onClick={() =>
                          setIsSidebarCollapsed(!isSidebarCollapsed)
                        }>
                        Sidebar
                      </Button>
                      <Button className="col-5" onClick={() => newNote()}>
                        New Note
                      </Button>
                    </Row>
                    <Row>
                      {!isSidebarCollapsed && (
                        <SideBar
                          notes={notes}
                          selectNote={selectNote}
                          selectedId={selectedId}
                        />
                      )}
                    </Row>
                  </Container>
                </Col>
                <Col
                  className={` ${
                    isSidebarCollapsed ? "col-12" : "col-8 col-lg-9"
                  }`}
                >
                  <div className="box col-1 offset-6">
                    <UserDropdown setUser={setUser} />
                  </div>
                  <NoteEditor
                    note={notes.find((note) => selectedId === note._id)}
                    collapsed={isSidebarCollapsed}
                    deleteNote={setIsModalOpen}
                    saveNote={saveNote}
                  />
                </Col>
              </Row>
              <Modal
                className="modal"
                isOpen={isModalOpen}
                fade={false}
                centered={true}
                toggle={() => setIsModalOpen(false)}
              >
                <ModalHeader
                  className="close"
                  toggle={() => setIsModalOpen(false)}
                >
                  Confirm Delete
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete this note?
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="confirm-button fa fa-lg fa-trash"
                    onClick={() => deleteNote()}
                  ></Button>{" "}
                  <Button
                    className="cancel-button fa fa-lg fa-times"
                    onClick={() => setIsModalOpen(false)}
                  ></Button>
                </ModalFooter>
              </Modal>
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