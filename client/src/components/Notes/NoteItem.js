import "../../styling/notes.css";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function NoteItem({note,selectNote,isSelected,deleteItem,saveItem}){
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function stripMarkdown(md) {
    return (
      md
        // Remove headers
        .replace(/^\s{0,3}(#{1,6})\s+/gm, "")
        // Remove bold and italic
        .replace(/(\*\*|__)(.*?)\1/g, "$2")
        .replace(/(\*|_)(.*?)\1/g, "$2")
        // Remove strikethrough
        .replace(/~~(.*?)~~/g, "$1")
        // Remove inline code
        .replace(/`([^`]+)`/g, "$1")
        // Remove links
        .replace(/\[([^\]]+)]\([^\)]+\)/g, "$1")
        .replace(/<([^>]+)>/g, "$1")
        // Remove images
        .replace(/!\[([^\]]*)]\([^\)]+\)/g, "$1")
        // Remove blockquotes
        .replace(/^\s{0,3}>\s?/gm, "")
        // Remove horizontal rules
        .replace(/^-{3,}$/gm, "")
        // Remove lists
        .replace(/^\s{0,3}(\*|\+|\-|\d+\.)\s+/gm, "")
        // Remove extra spaces
        .replace(/\s+/g, " ")
        .trim()
    );
  }
  function truncateString(str, length = 50) {
    if (str.length <= length) {
      return str;
    }
    return str.slice(0, length) + "...";
  }
  function daysFrom(time) {
    const date = new Date(time);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - date.getTime();
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 3600 * 24)
    );
    return differenceInDays;
  }
  function formatDate(time) {
    var localtime = new Date(time);
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (daysFrom(time) === 0) {
      return localtime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (daysFrom(time) < 7) {
      return dayNames[localtime.getDay()];
    } else {
      return localtime.toLocaleDateString();
    }
  }

  function NoteStatus(time) {
    if (time === 0) {
      return "Not Saved";
    }
    if (!time) {
      return "New";
    }

    return formatDate(time);
  }

  function OptionMenu(){
    return (
      <Dropdown
        className="option-menu"
        isOpen={dropdownOpen}
        toggle={toggle}
        direction="down"
      >
        <DropdownToggle data-toggle="dropdown" tag="span">
          <FontAwesomeIcon title="Options" icon={faEllipsisVertical} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="button">
            <div onClick={saveItem}>
              <FontAwesomeIcon icon={faFloppyDisk} /> Save
            </div>
          </DropdownItem>
          <DropdownItem className="button">
            <div onClick={deleteItem}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  return (
    <div
      key={note}
      className={`note-item style ${isSelected ? "selected" : ""}`}
      onClick={() => selectNote(note._id)}
    >
      <div className="note-title">
        <strong>{truncateString(stripMarkdown(note.content))}</strong>
      </div>

      <div className="note-status">
        <small>{NoteStatus(note.time)}</small>
      </div>

      <div className={`option-button wrap style ${isSelected ? "" : "hidden"}`}>
        <div onClick={() => toggle}>
          {OptionMenu()}
        </div>
      </div>
      <div className={`${isSelected ? "" : "overlay wrap style"}`}></div>
    </div>
  );
}