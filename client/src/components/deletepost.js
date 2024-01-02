import React from "react";
import { Modal, Button, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function DeleteModal(props) {
    const navigate = useNavigate();

    async function deletePost(id) {
        try {
            await axios.delete(`http://localhost:8000/post/${id}`);
        } catch (err) {
            window.alert(`An error has occured: ${err.statusText}\n id:${id}`);
        }
    }

    const afterDelete =() => {
        deletePost(props.id).then(() => navigate('/feed'))
        props.toggle();
    }

    return (
        <Modal isOpen={props.show} toggle={props.toggle}>
            <ModalHeader>
            Delete
            </ModalHeader>
            <ModalBody>Do you want to delete?</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.toggle}>Cancel</Button>
                <Button color="danger" onClick={() => {afterDelete()}}>Delete</Button>
            </ModalFooter>
        </Modal>
    );
}
