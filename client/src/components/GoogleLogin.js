import React from 'react';
import axios from 'axios';
import { useGoogleLogin} from '@react-oauth/google';

export default function LoginGoogle(props) {

    const api = axios.create({
        baseURL:  "http://localhost:8000/api/v1",
        withCredentials: true,
    });

    const googleAuth = (code) => api.get(`/auth/google?code=${code}`);

    const googleapi = (code) => axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${code}`, {
                        headers: {
                            Authorization: `Bearer ${code}`,
                            Accept: 'application/json'
                        }
                    })
    const responseGoogle = async (authResult) => {
        console.log("responseGOOGle")
        try{
            if (authResult["code"]){
                console.log(authResult.code);
                const result = await googleAuth(authResult.code)
                props.setUser(result.data.data.user);
                alert("Succesuly logged in");
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