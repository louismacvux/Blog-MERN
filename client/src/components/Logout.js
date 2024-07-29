import React  from 'react';
import baseAPI from '../utils/api';
import { Button } from "reactstrap";

export default function Logout(props){

    function logout(){
        baseAPI.post("/auth/logout")
                .then((response) => {
                    props.setUser(null);
                    localStorage.clear();
                })
                .catch((error) => {console.log(`An error has occured: ${error}`)});
    }

    return (
        <div className="col-2" onClick={() => logout()}>
          Log Out
        </div>
    );

}
