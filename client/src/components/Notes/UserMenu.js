// src/components/UserDropdown.js
import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Logout from "../Logout";
import "../../styling/notes.css";

const UserDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
      <DropdownToggle data-toggle="dropdown" tag="span">
        <img
          src={user.image}
          alt={user.name}
          style={{ borderRadius: "50%", width: "30px", height: "30px" }}
          referrerPolicy="no-referrer"
        />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{user.name}</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <a
            href="mailto:minhlong9696@gmail.com?subject=Bug%20Report"
            style={{color: "black", textDecoration: "none"}}>
            Report a bug
          </a>
        </DropdownItem>
        <DropdownItem>
          <Logout setUser={props.setUser}>Logout</Logout>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
