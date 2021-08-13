import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../chatScreen/ChatScreen.css"

import { useInput } from "../Hooks/useInput";

const ChatScreen = () => {
  const {
    value: inputText,
    bind: bindInputText,
    reset: resetInputText,
  } = useInput("");

  const param = useParams();

  const [messages, setMessages] = useState([
    {
      name: "Ellen",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sam_Rockwell_%2851492%29_%28cropped%29.jpg/1200px-Sam_Rockwell_%2851492%29_%28cropped%29.jpg",
      text: "Whats up",
    },
    {
      name: "Ellen",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sam_Rockwell_%2851492%29_%28cropped%29.jpg/1200px-Sam_Rockwell_%2851492%29_%28cropped%29.jpg",
      text: "Hows it going!",
    },
    {
      text: "Hi! How are you Ellen!",
    },
  ]);

  const handleSend = (event) => {
    event.preventDefault();

    setMessages([...messages, { text: inputText }]);

    resetInputText();
  };

  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">
        You Matched With {param.person} on 10/08/20
      </p>
      {messages.map((message) =>
        message.name ? (
          <div key={Math.random()} className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              alt={message.name}
              src={message.imageUrl}
            />
            <p className="chatScreen__messageText">{message.text}</p>
          </div>
        ) : (
          <div key={Math.random()} className="chatScreen__message">
            <p className="chatScreen__messageUserText">{message.text}</p>
          </div>
        )
      )}
      <div>
        <form onSubmit={handleSend} className="chatScreen__input">
          <input
            className="chatScreen__inputField"
            type="text"
            placeholder="type a message..."
            {...bindInputText}
          />
          <button type="submit" className="chatScreen__inputButton">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
