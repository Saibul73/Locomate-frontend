import "./Chat.css";
import React from "react";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userChats } from "../../Api/ChatRequest";
import Conversation from "../../components/Conversation/Conversation";
import { UilSetting } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";
import RightSide from "../../components/RightSide/RightSide";

function Chat() {
  const user = useSelector((state) => state.authReducer.authData.user);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // receive message to socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  const checkOnlineStatus =(chat)=>{
    const chatMembers = chat.members.find((member)=>member!==user._id)
    const online = onlineUsers.find((user)=>user.userId===chatMembers)
    return online?true:false;
  }
  return (
    <div className="Chat">
      {/* Left side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => {
              return (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
       
        <RightSide/>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
