/* eslint-disable no-param-reassign, no-underscore-dangle */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useMaterialUIController, setOpenChat } from "context";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Conversation from "../../examples/conversations/Conversation";
import Message from "../../examples/message/Message";
import socket from "./socketio";

export default function Messenger() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode, openChat } = controller;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const scrollRef = useRef();
  const handleChat = () => setOpenChat(dispatch, !openChat);
  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    socket.current = io(process.env.mainSocket);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(
    () =>
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]),
    [arrivalMessage, currentChat]
  );

  useEffect(() => {
    socket.current.emit("addUser", user.result._id);
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `https://danganhapi.herokuapp.com/conversations/${user?.result._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.result._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `https://danganhapi.herokuapp.com/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.result._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== user.result._id);
    console.log("receiverId: ", receiverId);
    try {
      const res = await axios.post("https://danganhapi.herokuapp.com/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }

    socket.current.emit("sendMessage", {
      senderId: user.result._id,
      receiverId,
      text: newMessage,
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      {!openChat ? (
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setCurrentChat(c);
                  handleChat();
                }}
                onKeyDown={() => {
                  setCurrentChat(c);
                  handleChat();
                }}
              >
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="chatBox">
          <MDBox sx={{ mx: 1, width: "4rem", minWidth: "4rem" }}>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleChat}
              fullWidth
              sx={sidenavTypeButtonsStyles}
            >
              Back
            </MDButton>
          </MDBox>
          <div className="chatBoxWrapper">
            {openChat ? (
              <>
                <MDBox pt={0.5} pb={3} px={3} style={{ overflowY: "scroll" }} height="50vh">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user.result._id} />
                    </div>
                  ))}
                </MDBox>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button type="button" className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Op</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
