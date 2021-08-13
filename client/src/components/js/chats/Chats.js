import React from "react";

import Chat from "../chat/Chat";
import NavigationBarDashboard from "../NavigationBarDashboard"

const Chats = () => {
  return (
    <>
    <NavigationBarDashboard />
    <div className="chats">
      <Chat
        imageUrl="https://admin.euro.savills.co.uk/_images/landscape-profile-images/sarah.mallard.jpg"
        name="sarah"
        message="Hey! how are you"
        timestamp="35 minutes ago"
      />
      <Chat
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sam_Rockwell_%2851492%29_%28cropped%29.jpg/1200px-Sam_Rockwell_%2851492%29_%28cropped%29.jpg"
        name="Ellen"
        message="Whats Up?"
        timestamp="55 minutes ago"
      />
      <Chat
        imageUrl="https://admin.euro.savills.co.uk/_images/landscape-profile-images/btjones.jpg"
        name="sandra"
        message="Ola"
        timestamp="3 days ago"
      />
      <Chat
        imageUrl="https://www.wtvq.com/wp-content/uploads/2019/02/190224_abc_countdown_rockwe_hpMain_16x9_992-1.jpg"
        name="Natasha"
        message="Oops there is he is!"
        timestamp="1 week ago"
      />
    </div>
    </>
  );
};

export default Chats;
