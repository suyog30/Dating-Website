import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import '../css/index.css'
import {useState} from 'react'
import { setUserSession } from '../utils/Common'
import NavigationBarSignIn from './NavigationBarSignIn'



async function loginUser(credentials, props) {
    return fetch('http://localhost:8000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .then((data) => {
          if(data.status == "Success"){
              setUserSession(data.token, data.user);
              props.history.push("/dashboard");
          }else{
              var element = document.getElementById("error");
              element.classList.remove("error-hidden");
              element.innerText = data.error;
          }
      })
      .catch((error) => {
          var element = document.getElementById("error");
          element.classList.remove("error-hidden");
          element.innerText = error.error;
      })
   }


function SignIn(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
            email,
            password,
        }, props);
    }

    return (
<>
<NavigationBarSignIn/>
        <div className="signup-login">
            <div>
                <div>
                    <div className="login-form">
                        <form className="login_form" onSubmit={handleSubmit}>
                            <div className="sidenav">
                                <div className="login-main-text">
                                    <h2>Login</h2>
                                    <p className="hint-text">Login or register from here to access.</p>
                                </div>
                            </div>
                            <div className="form-group">
                                
                                <input type="email" name="email" id="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                       
                                <input type="password" name="password" id="password" className="form-control"
                                    placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <p className="error error-hidden" id="error"></p>
                            <button type="submit" className="btn btn-success btn-lg btn-block center">Sign in</button>
                        </form>
                        <div className="text-center">Don't have an account?<Link to='/sign-up'>Sign up</Link></div>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default SignIn
// SignIn.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
