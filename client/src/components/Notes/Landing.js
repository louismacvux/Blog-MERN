import React, { useState, useEffect } from "react";
import "../../styling/notes.css";
import "../../styling/modal.css";
import GoogleLogin from "../GoogleLogin";


export default function Landing(){
    return (
      <div className="app-container">
        <GoogleLogin setUser={setUser}></GoogleLogin>
      </div>
    );
}