import '../../styling/test.css';

import React, {useState} from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

const MessageLayout = () => {
  const [isSidebarOpen, openSidebar] = useState(false);

  function toggleSidebar(){
    openSidebar(!isSidebarOpen);
  }

  function toggleButton(){
    return (
      <button
        onClick={() => {
          toggleSidebar();
        }}
      >
        Toggle
      </button>
    );
  }
  return (
    <div className="test">
    <div className="container box">
      <div className={`sidebar box ${isSidebarOpen? "":"close"}`}>
        {toggleButton()}
        <ListGroup flush>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 1
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 2
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 3
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 4
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 5
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 6
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 7
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 8
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 9
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 10
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 11
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 12
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 13
          </ListGroupItem>
          <ListGroupItem className="sidebar-item rounded-item">
            Item 14
          </ListGroupItem>
        </ListGroup>
      </div>
      <div className="main-content box">
        {isSidebarOpen? "":toggleButton()}
        <div className="content"> Main Editor</div>
      </div>
    </div>
    </div>
  );
};

export default MessageLayout;
