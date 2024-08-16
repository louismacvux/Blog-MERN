import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
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
    const navigate = useNavigate();
    const [notes, setNotes] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const [isSidebarCollapsed, setIsSidebarCollapsed] =  useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSessModalOpen, setIsSessModalOpen] = useState(false);
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
      if (user && user.until > new Date()){
        document.title = `${user.name}'s notes`;
        getNotes();
        setIsSessModalOpen(false);
      }
      else{
        localStorage.clear();
        navigate("/login")
      }
    },[])
    
    useEffect(() => {
      const expire = setTimeout(() => {
        baseAPI
          .post("/auth/logout")
          .then((response) => {
            setUser(null);
            localStorage.clear();
            setIsSessModalOpen(false);
            navigate("/login");
          })
          .catch((error) => {
            console.log(`An error has occured: ${error}`);
          });
      }, 86398000); //86398000
      const reminder = setTimeout(() => {
        setIsSessModalOpen(true);
      }, 86338000); //86338000
      return () => {
        clearTimeout(expire);
        clearTimeout(reminder);
      };
    },[isSessModalOpen])

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
      setIsDeleteModalOpen(false);
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

    async function refresh(){
      baseAPI
        .get("/auth/refresh")
        .then(()=>{setIsSessModalOpen(false);})
        .catch((error)=>{
        window.alert(`An error has occured: ${error}`);
      })
    }

    function toggleButton() {
      return(
      <Button className="sidebar-button" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
        Sidebar
      </Button>
      )
    }

    function showLoggedIn(){
      return notes ? (
        <div className="app">
          <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
            <div className="scrollable">
              <div className="nav sidebar-nav box">
                {toggleButton()}
                <Button onClick={() => newNote()}>New Note</Button>
              </div>
              <div className="note-lists">
                <SideBar
                  notes={notes}
                  selectNote={selectNote}
                  selectedId={selectedId}
                />
              </div>
            </div>
          </div>
          <div className="note-editor">
            <div className="nav editor-nav">
              {isSidebarCollapsed ? toggleButton() : " "}
              <div className='profile'> 
                <UserDropdown setUser={setUser} />
              </div>
            </div>
            <NoteEditor
              note={notes.find((note) => selectedId === note._id)}
              deleteNote={setIsDeleteModalOpen}
              saveNote={saveNote}
            />
          </div>
          <div className="popup">
            <Modal
              className="modal"
              isOpen={isDeleteModalOpen}
              fade={false}
              centered={true}
              toggle={() => setIsDeleteModalOpen(false)}
            >
              <ModalHeader
                className="close"
                toggle={() => setIsDeleteModalOpen(false)}
              >
                Confirm Delete
              </ModalHeader>
              <ModalBody>Are you sure you want to delete this note?</ModalBody>
              <ModalFooter>
                <Button
                  className="confirm-button fa fa-lg fa-trash"
                  onClick={() => deleteNote()}
                ></Button>{" "}
                <Button
                  className="cancel-button fa fa-lg fa-times"
                  onClick={() => setIsDeleteModalOpen(false)}
                ></Button>
              </ModalFooter>
            </Modal>

            <Modal
              className="modal"
              isOpen={isSessModalOpen}
              fade={false}
              centered={true}
              toggle={() => setIsSessModalOpen(false)}
            >
              <ModalHeader
                className="close"
                toggle={() => setIsSessModalOpen(false)}
              >
                Are you still here?
              </ModalHeader>
              <ModalBody>
                Due to inactivity, you will be logged out in 10 minutes.
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    refresh();
                  }}
                >
                  I'm here
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="app">
          <p className="no-note">fetching notes...</p>
        </div>
      );
    }
    
    return (
        showLoggedIn()
    );
}