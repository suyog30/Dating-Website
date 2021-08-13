import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getUser } from '../utils/Common';
import NavigationBarDashboard from "./NavigationBarDashboard"
import { storage } from '../utils/firebase'

const axios = require('axios');

class EditProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        _id: "",
        name: "",
        lastname: "",
        bio: "",
        profileImgUrl: "",
        gender: "",
        genderM: "false",
        genderF: "false",
        genderN: "false",
        lookingfor: "",
        lookingforM: "false",
        lookingforF: "false",
        lookingforN: "false",
        file: "",
        filename: ""
      }
    }
  
    fetchUserDetails = (_id) => {
      axios.get("http://localhost:8000/api/users/" + _id, {
        headers: {
          "content-type": "application/json"
        }
      }).then(res => {
        console.log("Fetch results");
        console.log(res);
        this.setState({ _id: res.data.user._id });
        this.setState({ name: res.data.user.name });
        this.setState({ lastname: res.data.user.lastname });
        this.setState({ gender: res.data.user.gender });
        this.setState({ lookingfor: res.data.user.lookingfor });
        this.setState({ profileImgUrl: res.data.user.profileImgUrl });
        this.radioconditions1();
        this.radioconditions2();
        console.log("State:")
        console.log(this.state)
      })
        .catch(err => console.log(err))
  
    }
  
    componentDidMount() {
      var _id = getUser()._id;
      console.log(_id);
      this.fetchUserDetails(_id);
    }
  
    uploadToFirebase() {
      const uploadTask = storage.ref('images/' + this.state.filename).put(this.state.file);
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(this.state.filename)
            .getDownloadURL()
            .then(url => {
              console.log("Current URL")
              console.log(url);
              this.state.profileImgUrl = url;
              console.log("Url state value")
              console.log(this.state.profileImgUrl)
            });
        }
      );
  
  
    }
  
    UpdateProfileHandler = (e) => {
      e.preventDefault();
      const formData = new Object(this.state);
      console.log("Formdata");
      console.log(JSON.stringify(formData));
      axios.put("http://localhost:8000/api/users/" + this.state._id, formData, {
        headers: {
          "content-type": "application/json"
        }
      }).then(res => {
        console.log(res);
      })
        .catch(err => console.log(err))
      window.location.reload();
    }
  
    handleInputChange = (e) => {
      console.log("Input changed")
      const key = e.target.name
      console.log("Key is" + key)
      const value = e.target.value
      this.setState({
        [key]: value
      })
      console.log(value);
    }
  
    handleLookingFor = (event) => {
      console.log("Looking for changed")
    }
  
    radioconditions1() {
      if (this.state.gender == "male") {
        this.setState({ genderM: "true" });
      }
      else if (this.state.gender == "female") {
        this.setState({ genderF: "true" });
      }
      else if (this.state.gender == "notsure") {
        this.setState({ genderN: "true" });
      }
    }
    radioconditions2() {
      if (this.state.lookingfor == 'male') {
        this.state.lookingforM = 'true'
      }
      else if (this.state.lookingfor == 'female') {
        this.state.lookingforF = 'true'
      }
      else if (this.state.lookingfor == "notsure") {
        this.state.lookingforN = 'true'
      }
  
    }
  
    handleFileSelection = (e) => {
      console.log("File values")
      console.log(e.target.files[0]);
  
      const key = e.target.name
      const value = e.target.files[0]
      console.log(key);
      console.log(value);
  
      // this.setState({[key]: value});
      // this.setState({filename:e.target.files[0].name});
      this.state.file = e.target.files[0];
      this.state.filename = e.target.files[0].name;
      console.log("Current File value")
      console.log(this.state.file)
  
      console.log("Current Filename value")
      console.log(this.state.filename)
      this.uploadToFirebase();
  
  
    }
  
  
    render() {
      const imagestyle = {
        width: "100%", height: "100%", dispaly: "block"
      }
      return (
        <div>
          <NavigationBarDashboard />
          <Row>
            <Col>
              <img src={this.state.profileImgUrl} style={imagestyle} alt="profile pic" />
            </Col>
            <Col>
              <h1>User Profile</h1>
  
  
              <Form onSubmit={this.UpdateProfileHandler} className="form">
                <Form.Group controlId="formCategory1">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name='name' value={this.state.name} onChange={this.handleInputChange} />
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name='lastname' value={this.state.lastname} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formCategory2">
                  <h6>Bio</h6>
                  <Form.Control type="textarea" name='bio' value={this.state.bio} onChange={this.handleInputChange} />
                </Form.Group>
  
                <Form.Group controlId="formCategory3">
                  <h5>Gender</h5>
                  <label>
                    Male
            <input
                      id="gender1"
                      name="gender"
                      type="radio"
                      value="male"
                      checked={this.state.genderM}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <label>
                    Female
            <input
                      id="gender2"
                      name="gender"
                      type="radio"
                      value="female"
                      checked={this.state.genderF}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <label>
                    Other
            <input
                      id="gender3"
                      name="gender"
                      type="radio"
                      value="notsure"
                      checked={this.state.genderN}
                      onChange={this.handleInputChange}
                    />
                  </label>
                </Form.Group>
  
                <Form.Group controlId="formCategory4">
                  <h5> Looking For</h5>
                  <label>
                    Male
            <input
                      name="lookingfor"
                      type="radio"
                      value="male"
                      checked={this.state.lookingforM}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <label>
                    Female
            <input
                      name="lookingfor"
                      type="radio"
                      value="female"
                      checked={this.state.lookingforF}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <label>
                    Both
            <input
                      name="lookingfor"
                      type="radio"
                      value="notsure"
                      checked={this.state.lookingforN}
                      onChange={this.handleInputChange}
                    />
                  </label>
                </Form.Group>
  
                {/* <Form.Group controlId="formCategory4">
      <Form.Label>Profile Image</Form.Label>
      <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
      </Form.Group> */}
  
                <Form.Label>Profile Image</Form.Label>
                <input type="file" className="form-control-file" name="file" onChange={this.handleFileSelection} />
                {/* <img src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : null} /> */}
  
                <Button type='submit'>Update Profile</Button>
              </Form>
            </Col>
  
          </Row>
        </div>
      )
    }
  }

export default EditProfile;