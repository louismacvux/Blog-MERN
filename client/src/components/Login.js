import React, { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import Logout from './Logout';
import baseAPI from '../utils/api';

export default function Login() {
    const [user,setUser] = useState();

    async function getHeader(){
        baseAPI.get("/header").then()
    }

    return (
      <div>
        <button onClick={getHeader}>getheader</button>
        {user ? (
          <div>
            Welcome {user && user.name} ({user && user.email}) - {user && user._id}
            <Logout setUser={setUser}>Logout</Logout>
          </div>
        ) : (
          <GoogleLogin setUser={setUser}></GoogleLogin>
        )}
      </div>
    );
}

//FOR TESTING LOGIN AND LOGOUT ONLY