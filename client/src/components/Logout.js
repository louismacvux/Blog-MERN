import React  from 'react';
import baseAPI from '../utils/api';

export default function Logout(props){

    function logout(){
        baseAPI.post("api/v1/auth/logout")
                .then((response) => {
                    props.setUser(null);
                })
                .catch((error) => {console.log(`An error has occured: ${error}`)});
    }

    return (
      <div>
        <button style={{ padding: "10px 20px" }} onClick={logout}>
          Log Out
        </button>
      </div>
    );

}
