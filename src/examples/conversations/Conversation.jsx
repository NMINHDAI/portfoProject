/* eslint-disable no-param-reassign, no-underscore-dangle */
import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.result._id);

    const getUser = async () => {
      try {
        const res = await axios(
          `https://cors-proxy420.herokuapp.com/https://danganhapi.herokuapp.com/api/users?userId=${friendId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src="https://i.imgur.com/iPWP9mn.jpg" alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
