import React, { useState } from "react";
import GoogleLogin from "./GoogleLogin";

export default function Login() {
    const [user,setUser] = useState();

    return (
        <div>
            <GoogleLogin setUser={setUser}></GoogleLogin>
            {user && user.name}
            {user && user.email}
        </div>
    )
}