import React from 'react';
import baseAPI from '../utils/api';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginGoogle(props) {

    const googleAuth = (code) => baseAPI.get(`/auth/login/google?code=${code}`);

    const responseGoogle = async (authResult) => {
        console.log("responseGOOGle")
        try{
            if (authResult["code"]){
                // console.log(authResult.code);
                const result = await googleAuth(authResult.code)
                props.setUser(result.data);
                console.log(result);
                localStorage.setItem('user',JSON.stringify(result.data));
            }else{
                console.log(authResult);
            }
        }
        catch (e){
            console.log(e)
        }
    };

    const login = useGoogleLogin({onSuccess: responseGoogle, onError: responseGoogle, flow: "auth-code",});


    return (
        <div>
            <button style={{ padding: "10px 20px" }} onClick={login}>
              Sign in with Google 🚀
            </button>
        </div>
    ); 
}