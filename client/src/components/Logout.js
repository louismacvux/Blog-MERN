import React  from 'react';
import { useNavigate } from "react-router-dom";
import baseAPI from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Logout(props){
    const navigate = useNavigate();
    function logout(){
        baseAPI.post("/auth/logout")
                .then((response) => {
                    props.setUser(null);
                    localStorage.clear();
                     navigate("/");
                })
                .catch((error) => {console.log(`An error has occured: ${error}`)});
    }

    return (
      <div className="col-2" onClick={() => logout()}>
        <FontAwesomeIcon icon={faArrowRightFromBracket}/> Log out
      </div>
    );

}
