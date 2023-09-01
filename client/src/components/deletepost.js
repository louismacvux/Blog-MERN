import React from "react";
import { Modal, Button, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

export default function DeleteModal(props) {

    async function deletePost(id) {
        try {
            await axios.delete(`http://localhost:8000/feed/${id}`);
        } catch (err) {
            window.alert(`An error has occured: ${err.statusText}\n id:${id}`);
        }
    }

    const afterDelete =() => {
        deletePost(props.id).then(() => window.location.reload(true))
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
