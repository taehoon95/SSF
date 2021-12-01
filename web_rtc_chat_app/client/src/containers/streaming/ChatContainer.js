import React, { useContext, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { SocketContext } from "../../SocketContext";
import { Avatar, Grid, TextField, Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// 2021 1125 이태훈 streaming 채팅 page
const ChatContainer = () => {

  const { socketRef, setMsgs, msgs } = useContext(SocketContext);
  // message: 채팅 메세지
  const [message, setMessage] = useState("");
  // l_code: rooms객체를 식별하기위한 것
  const { l_code } = useParams();
  // u_id: username처럼 쓸것
  const u_id = localStorage.getItem("u_id");

  const onChangeMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };
 

  const handleMessage = () => {
    // 일단 테스트용으로 socket id로 채팅 해본다.(spring security 잘되있어서 다른아이디로 여러 로그인 불가)
    const username = socketRef.id;
    socketRef.emit("clientSendMessage", message, username, l_code);

    setMsgs([
      ...msgs,
      {
        username: "You",
        message,
      },
    ]);
    setMessage("");
  };


  return (
    <>
      <div
        style={{
          background: "white",
          height: "600px",
          width: "300px",
          borderRadius: "5px",
          position:"relative",
          overflowY:"scroll",
          display:"block"

        }}
      >
        <h3 style={{ color: "blue", marginBottom:"10px" }}>{u_id}님의 채팅방</h3>
        <hr></hr>      
        <div>
        {msgs.map(({ message, username }, index) => {          
          return (
            <div>
              <div>
                <div key={index}>
                  <span style={{ fontSize: "13px" }}> {username} :</span>
                  <span style={{ fontSize: "13px" }}> {message}</span>
                  </div>
              </div>
            </div>
          );
        })}
        </div>
        <div style={
          {
            position:"fixed", 
            width: "300px",
            bottom:"235px"
          }}>
          <hr></hr>
        <div style={{ background:"white"}}>
        <input  type="text"onChange={onChangeMessage} value={message}/>
        <Button  onClick={handleMessage}>전송</Button>
        </div>
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
