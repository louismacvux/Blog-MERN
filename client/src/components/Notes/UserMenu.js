// src/components/UserDropdown.js
import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Logout from "../Logout";
import "../../styling/notes.css";
import "../../styling/modal.css";
import releaseNote from "../../utils/releasenote.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faUser,
  faBug,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

const UserDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ReleaseNoteModal, setReleaseNoteModal] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
      <DropdownToggle data-toggle="dropdown" tag="span">
        <img
          src={user && user.image}
          alt={user && user.name}
          style={{ borderRadius: "50%", width: "30px", height: "30px" }}
          referrerPolicy="no-referrer"
        />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <FontAwesomeIcon icon={faUser} /> {` ${user && user.name}`}
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="button">
          <Logout setUser={props.setUser} />
        </DropdownItem>
        <DropdownItem className="button">
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            style={{ color: "black", textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faCircleQuestion} /> Tutorial
          </a>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="button">
          <a
            href="mailto:minhlong9696@gmail.com?subject=Bug%20Report"
            style={{ color: "black", textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faBug} /> Report a bug
          </a>
        </DropdownItem>
        <DropdownItem
          className="button"
          onClick={() => setReleaseNoteModal(true)}
        >
          <FontAwesomeIcon icon={faNoteSticky} /> Release Note
        </DropdownItem>
      </DropdownMenu>
      <Modal
        className="modal"
        isOpen={ReleaseNoteModal}
        fade={false}
        centered={true}
        toggle={() => setReleaseNoteModal(false)}
      >
        <ModalHeader
          className="close"
          toggle={() => setReleaseNoteModal(false)}
        >
          Release Note
        </ModalHeader>
        <ModalBody>{releaseNote()}</ModalBody>
      </Modal>
    </Dropdown>
  );
};

export default UserDropdown;
