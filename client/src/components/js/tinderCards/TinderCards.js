import React, { useState, useEffect } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import { getUser } from "../../utils/Common";


export function getCards() {
  return fetch('http://localhost:8000/api/tindercards/'+getUser()._id)
    .then(data => data.json())
}



function rightSwipe(userId) {
  return fetch('http://localhost:8000/api/rightswipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idfrom": String(getUser()._id),
      "idto": String(userId)
  })
  })
    .then(data => data.json())
    .then((data) => {
      console.log("Response is "+data.message)
        if(data.message == "Success"){
          console.log("Right swiped")
        }else if(data.message == "Match"){
          alert("It's a match")
        }
    })
    .catch((error) => {
      console.log("Error "+error)
    })
 }


 function leftSwipe(userId) {
  return fetch('http://localhost:8000/api/leftswipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idfrom": getUser()._id,
      "idto": userId
  })
  })
    .then(data => data.json())
    .then((data) => {
        if(data.message == "Success"){
          console.log("Left swiped")
        }
    })
    .catch((error) => {
      console.log("Error "+error)
    })
 }

 

const TinderCards = () => {
  const [people, setPeople] = useState([]);

  const [swipeUser, setSwipeUser] = useState();

  const [swipedDirection, setSwipedDirection] = useState()

  

  useEffect(() => {

    let mounted = true;
      getCards()
        .then(items => {
          if(mounted) {
           setPeople(items.user)
           console.log(people)
          }
        })
      return () => mounted = false;
    // if(!people){
      
    // }
    // if(swipedDirection === "right"){
    //   rightSwipe(swipeUser)
    // }else if(swipedDirection === "left"){
    //   leftSwipe(swipeUser)
    // }

    


    
 }, []);


//  const onSwipe = (direction, id) => {
//   console.log('You swiped: ' + direction)
//   console.log("Swiped user is "+id)
//   if(direction == "right"){
//     setSwipedDirection("right")
//   }
// }

const swiped = (direction, id) => {
  setSwipedDirection("right")
  setSwipeUser(id)
  if(direction == "right"){
    rightSwipe(id)
  }else if(direction == "left"){
    leftSwipe(id)
  }
}
 
// const onCardLeftScreen = (myIdentifier) => {
//   console.log(myIdentifier + ' left the screen')
// }

const setTheSwipedUser = (id) => {
  setSwipeUser(id)
  console.log("set user called "+id)
  console.log("Swiped direction is "+swipedDirection)

    if(swipedDirection == "right"){
      rightSwipe(id)
    }else if(swipedDirection == "left"){
      leftSwipe(id)
    }
  
  
}


  return (
    <div className="tinderCards">
      
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            key={person.name}
            className="swipe"
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person._id)} >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
<div class="tinderCards__cardContainer">
  <img src="caught_up.png" width="500px" height="250px"></img>
</div>
      </div>
    </div>
  );
};

export default TinderCards;
