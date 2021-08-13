import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Route } from "react-router";
import NavigationBarWithSearch from "../NavigationBarWithSearch"
import EditProfile from '../EditProfile'
import TinderCards from '../tinderCards/TinderCards'
import SwipeButtons from '../swipeButtons/SwipeButtons'
import { makeStyles } from '@material-ui/core/styles';
// import "./admin.css"
import axios from "axios"
import {
    Grid,
    Card,
    CardContent,
    Button,
    CardHeader,
    Box,
    CardMedia
  } from "@material-ui/core/";
import NavigationBarWithSearchAdmin from '../NavigationBarWithSearchAdmin';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },

    color: {
      backgroundColor: '#625d59',
      color: '#fff'
      }
  }));



export function getCards() {
    return fetch('http://localhost:8000/api/users')
      .then(data => data.json())
  }

const AdminDashboard = () => {
    const classes = useStyles();
    const [people, setPeople] = useState([])
    const [filteredPeople, setFilteredPeople] = useState([])


    useEffect(() => {
      let mounted = true;
     getCards()
       .then(items => {
         if(mounted) {
          setPeople(items.user)
          setFilteredPeople(items.user)
         }
       })
     return () => mounted = false;
   }, []);

    const history = useHistory();
    function onEdit(e) {
        console.log(e.target.value);
        
        history.push('/editProfile', {
            edit_id: e.target_valuse
          })
    }

    const handleInput = (e) => {
        console.log(e.target.value)
        let filteredData = people.filter((person) => {
          return person.name.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setFilteredPeople(filteredData)
      }

     const  handleSoftDelete=(personID)=>{
        return fetch('http://localhost:8000/api/softdelete/'+personID, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "id": personID,
            "isSoftDeleted":1
        }) 
        })
        .then(res => {
          console.log(res);
          window.location.reload();
        })
          .catch(err => console.log(err))
        
      }

    return (
        <>
            <NavigationBarWithSearchAdmin handleInput={handleInput}/>
            {/* {people.map((person) => (
                <div key={person._id}>
                    <div className = "column">
                        <div className = "rowlen">
                            <div className="card" style={{backgroundImage: `url(${person.profileImgUrl})`}}>
                                <h3 className="h3">{person.name}</h3>
                                <Link key ={person._id} to='/editProfile' className="btn btn-primary b1" >Edit</Link>
                                <Link to="/userprofile" className="btn btn-primary b2">Delete</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            ))} */}


<div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {filteredPeople.map((person) => {
            console.log("outside if loop:ID:"+person._id+"isSoftDeleted"+person.isSoftDeleted);
            if(person.isSoftDeleted!=1){
              console.log("inside if loop:ID:"+person._id+"isSoftDeleted"+person.isSoftDeleted);
              
              return <Grid item xs={4} key={person._id}>
              <Card className={classes.color}>
                <CardHeader
                  title={`Name : ${person.name}`}
                  subheader={`Bio : ${person.bio}`}
                />
                <CardContent>
                  <CardMedia
                    component="img"
                    className='mediastyle'
                    image={person.profileImgUrl}
                    height="300px"
                    width="500px"
                  />
                  <br></br>

                  <Box align='center' display="flex" justifyContent="space-between">
                    <Button
                      color='primary'
                      size='large'
                      variant='contained'
                    >
                      Edit Profile
    </Button>
                    <Button
                      color='primary'
                      size='large'
                      variant='contained'
                      // value={person._id}
                      onClick={() =>handleSoftDelete(person._id)}
                    >
                      Delete
    </Button></Box>

                </CardContent>

              </Card>
            </Grid>
            }
}
          // )
          )}
        </Grid>
      </div>
        </>
    )
}

export default AdminDashboard;