import React, { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import Logout from './Logout';
import baseAPI from '../utils/api';

export default function Login() {
    const [user,setUser] = useState();
    const [session, setSession] = useState();

    async function getHeader(){
      baseAPI.get("/header")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err))
    }

    async function getSession(){
      baseAPI.get("/session/get")
      .then((response) => {
        console.log(response.data.user);
        setSession(response.data.user);
      })
      .catch((err) => console.log(err))
    }

    async function clearSession(){
      baseAPI.get("/session/destroy")
      .then((response) => {
        console.log(response);
        setSession();
      })
      .catch((err) => console.log(err))
    }

    return (
      <div>
        <button onClick={getHeader}>getHeader</button>
        <button onClick={getSession}>getSession</button>
        <button onClick={clearSession}>clearSession</button>
        Welcome {session && session.username} - {session && session.user_id}
        {user ? (
          <div>
            Welcome {user && user.name} ({user && user.email}) -{" "}
            {user && user._id}
            <Logout setUser={setUser}>Logout</Logout>
          </div>
        ) : (
          <GoogleLogin setUser={setUser}></GoogleLogin>
        )}
      </div>
    );
}

//FOR TESTING LOGIN AND LOGOUT ONLY