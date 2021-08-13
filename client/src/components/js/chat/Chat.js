import React from "react";
import { Link } from "react-router-dom";
import "../chat/Chat.css";
import { Avatar } from "@material-ui/core";

const Chat = ({ imageUrl, name, message, timestamp }) => {
  return (
    <Link to={`/chats/${name}`}>
      <div className="chat">
        <Avatar className="chat__image" src={imageUrl} />
        <div className="chat__details">
          <h2>{name}</h2>
          <p>{message}</p>
        </div>
        <p className="chat__timestamp">{timestamp}</p>
      </div>
    </Link>
  );
};

export default Chat;
