import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import baseAPI from '../utils/api';
import { useGoogleLogin } from '@react-oauth/google';
import "../styling/notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginGoogle(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
      const user = localStorage.getItem("user");
      return JSON.parse(user) || null;
    });

    useEffect(() => {
        if (user && user.until > new Date()){
            navigate("/notes");
        }
        document.title = `Login`;
    },[])

    const googleAuth = (code) => baseAPI.get(`/auth/login/google?code=${code}`);

    const responseGoogle = async (authResult) => {
        try{
            if (authResult["code"]){
                const result = await googleAuth(authResult.code)
                setUser(result.data);
                let date = new Date()
                let expires = date.setDate(date.getDate()+1) //2 days
                let new_user = {...result.data, until:expires}
                localStorage.setItem('user',JSON.stringify(new_user));
                navigate("/notes");
            }else{
                console.log(authResult);
            }
        }
        catch (e){
            console.log(e)
        }
        
        console.log("googleLogin")
    };

    const login = useGoogleLogin({onSuccess: responseGoogle, onError: responseGoogle, flow: "auth-code",});

    return (
      <div onClick={login}>
        <FontAwesomeIcon icon={faGoogle} /> {props.buttonName}
      </div>
    ); 
}