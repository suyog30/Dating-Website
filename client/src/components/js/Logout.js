import React from 'react'
import { removeUserSession } from '../utils/Common'


function logoutUser(props) {
    return fetch('http://localhost:8000/api/signout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .then((data) => {
          if(data.message == "User signout successful"){
              removeUserSession();
              props.history.push("/sign-in");
          }else{
            console.log(data);
          }
      })
      .catch((error) => {
          console.log(error);
      })
   }


function Logout(props) {
    logoutUser(props);
    return (
        <>

        </>
    )
}

export default Logout
