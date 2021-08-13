import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import '../css/index.css'
import { getUser } from '../utils/Common'
import { storage } from '../utils/firebase'
import NavigationBarSignUp from './NavigationBarSignUp'


function signupUser(credentials, props) {
    return fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .then((data) => {
          if(data.message == "Success!"){
            //   setUserSession(data.token, data.user);
              props.history.push("/sign-in");
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


   function handleFileUpload(props) {
	const uploadTask = storage.ref('images/' + getUser()._id + '/' + props.fileName).put(props.file);
	uploadTask.on(
		"state_changed",
		snapshot => { },
		error => {
			console.log(error);
		},
		() => {
			storage
				.ref("images")
				.child(getUser()._id)
				.child(props.fileName)
				.getDownloadURL()
				.then(url => {
					console.log(url);
					props.setImageUrl(url);
				});
		}
	);
};

function SignUp(props) {

	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState(null);
	const [name, setFirstName] = useState(null);
	const [lastname, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [gender, setGender] = useState(null);
	const [lookingfor, setLookingFor] = useState(null);
	const [birthday, setDob] = useState(null);
	const [profileImgUrl, setImageUrl] = useState(null);

	const handleFirstName = (event) => {
		setFirstName(event.target.value);
	}

	const handleLastName = (event) => {
		setLastName(event.target.value);
	}

	const handleEmail = (event) => {
		setEmail(event.target.value);
	}

	const handlePassword = (event) => {
		setPassword(event.target.value);
	}

	const handleGender = (event) => {
		setGender(event.target.value);
	}

	const handleLookingFor = (event) => {
		setLookingFor(event.target.value);
	}

	const handleDob = (event) => {
		setDob(event.target.value);
	}

	const handleFileSelection = (event) => {
		console.log("File values")
		console.log(event.target.files[0]);
		setFile(event.target.files[0]);
		setFileName(event.target.files[0].name);
		
	}

	

	const handleSubmit = async e => {
        e.preventDefault();
		const uploadTask = storage.ref('images/' + email + '/' + fileName).put(file);
		uploadTask.on(
		"state_changed",
		snapshot => { },
		error => {
			console.log(error);
		},
		() => {
			storage
				.ref("images")
				.child(email)
				.child(fileName)
				.getDownloadURL()
				.then(url => {
					console.log(url);
					setImageUrl(url);
					signupUser({
						name,
						lastname,
						email,
						password,
						gender,
						lookingfor,
						birthday,
						"profileImgUrl": url
					}, props);
				});
		}
	);
        
        
    }

	return (
		<>
			<NavigationBarSignUp />
			<div className="signup-login">
				<form name="registration" onSubmit={handleSubmit}>
					<h2>Register</h2>
					<p className="hint-text">Create your account. It's free and only takes a minute.</p>
					<div className="form-group">
						<div className="row">
							<div className="col"><input type="text" className="form-control" name="first_name"
								placeholder="First Name" id="first_name" onChange={handleFirstName}  required/></div>
							<div className="col"><input type="text" className="form-control" name="last_name"
								placeholder="Last Name" id="last_name" onChange={handleLastName}  required/></div>
						</div>
					</div>
					<div className="form-group">
						<input type="email" className="form-control" name="email" placeholder="Email" id="email" onChange={handleEmail}  required/>
					</div>
					<div className="form-group">
						<input type="password" className="form-control" name="password" placeholder="Password" id="password" onChange={handlePassword}  required/>
					</div>
					<label for="gender">Gender</label>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="radio" name="inlineRadioGender" id="inlineRadio1" value="male" checked={gender == "male"} onChange={handleGender} required/>
							<label className="form-check-label" for="inlineRadio1">Male</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="radio" name="inlineRadioGender" id="inlineRadio2" value="female" checked={gender == "female"} onChange={handleGender} required/>
							<label className="form-check-label" for="inlineRadio2">Female</label>
						</div>
					</div>
					<label for="lookingfor">Looking For</label>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="radio" name="inlineRadioLookingFor" id="inlineRadio4" value="male" checked={lookingfor == "male"} onChange={handleLookingFor} required/>
							<label className="form-check-label" for="inlineRadio1">Male</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="radio" name="inlineRadioLookingFor" id="inlineRadio5" value="female" checked={lookingfor == "female"} onChange={handleLookingFor} required/>
							<label className="form-check-label" for="inlineRadio2">Female</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="radio" name="inlineRadioLookingFor" id="inlineRadio6" value="notsure" checked={lookingfor == "notsure"} onChange={handleLookingFor} required/>
							<label className="form-check-label" for="inlineRadio3">Both</label>
						</div>
					</div>
					<div className="form-group">
						<label for="dateofbirth">Date Of Birth</label>
						<input className="form-control" type="date" id="example-date-input" onChange={handleDob} required></input>
					</div>
					<div className="form-group">
						<label for="picture">Select your picture</label>
						<input type="file" className="form-control-file" name="picture" onChange={handleFileSelection} required/>
						<img src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : null} width={file ? "100px" : "0Px"} height={file ? "100px" : "0px"} />
					</div>
					<div className="form-group">
						<p className="error error-hidden" id="error"></p>
						<button type="submit" className="btn btn-success btn-lg btn-block center" id="btnSignUp">Register
						Now</button>
					</div>
				</form>
				<div className="text-center">Already have an account? <Link to='/sign-in'>Sign in</Link></div>
			</div>
		</>
	)
}

export default SignUp
