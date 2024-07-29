// src/Modal.js
import React from "react";
import "../../styling/modal.css";

function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className="modal-buttons">
          <button onClick={props.onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={props.onClose} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
