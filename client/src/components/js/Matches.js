import React, { useState, useEffect } from 'react'
import NavigationBarWithSearch from './NavigationBarWithSearch'
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import '../css/matches.css'
import { getUser } from '../utils/Common';
import './cards/Cards.css'
import CardItem from './cards/CardItem';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box
} from "@material-ui/core/";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },

  color: {
    backgroundColor: '#fff',
    color: '#fff'
    }

}));



export function getMatches() {
  var _id = getUser()._id;
  return fetch('http://localhost:8000/api/matches/' + _id)
    .then(data => data.json())
}

const Matches = () => {

  let history = useHistory()

  const handleInput = (e) => {
    console.log(e.target.value)
    let filteredData = people.filter((person) => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    console.log(filteredData)
    setFilteredPeople(filteredData)
  }

  const handleChat = () => {
    console.log("Chat is clicked");
    history.push('/chats')
  }


  const handleUnmatch = (id) => {
    // console.log("Handle unmatch called "+id)
    return fetch('http://localhost:8000/api/unmatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idfrom": String(getUser()._id),
      "idto": String(id)
  })
  })
    .then(data => data.json())
    .then((data) => {
      console.log("Response is "+data.message)
    })
    .catch((error) => {
      console.log("Error "+error)
    })
  }

  const classes = useStyles();

  const [people, setPeople] = useState([])
  const [filteredPeople, setFilteredPeople] = useState([])
  useEffect(() => {
    let mounted = true;
    getMatches()
      .then(items => {
        if (mounted) {
          setPeople(items.user)
          setFilteredPeople(items.user)
        }
      })
    return () => mounted = false;
  }, [people]);

  return (
    <>
      <NavigationBarWithSearch handleInput={handleInput}/>
      <div className={classes.root}>
      <ul className='cards__items'>
      <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
      {filteredPeople.map((person) => (
        <Grid item xs={4} key={person.id}>
          <Card className={classes.color}>
                <CardHeader
                  title={`${person.name}`}
                />
          <CardContent>
            <CardItem
            src={person.url}
            text="This is my bio"
            label={person.name}
          />
          <Box align='center' display="flex" justifyContent="space-between">
                    <Button
                      size='large'
                      color='primary'
                      variant='contained'
                      onClick={() => handleUnmatch(person.id)}
                    >
                      Unmatch
    </Button>
                    <Button
                      size='large'
                      color='primary'
                      variant='contained'
                      onClick={() => handleChat()}
                    >
                      Chat
    </Button></Box>
    </CardContent>
    </Card>
          </Grid>
      ))}
      </Grid>
          </ul>

          </div>

      
    </>
  )

}
export default Matches;
