import React from "react";
import "./SwipeButtons.css";

import { IconButton } from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import { getUser } from "../../utils/Common";



function rightSwipe(userId) {
  return fetch('http://localhost:8000/api/rightswipe', {
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
          console.log("Right swiped")
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


const SwipeButtons = () => {
  return (
    <div className="swipeButtons">
      <IconButton className="swipeButtons__repeat">
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__left">
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__star">
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__right">
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
