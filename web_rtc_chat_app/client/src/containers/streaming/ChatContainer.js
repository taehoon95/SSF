import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { SocketContext } from "../../SocketContext";

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
    <div>
      <h1>채팅 공간</h1>
      <div>
        {msgs.map(({ message, username }, index) => {
          return (
            <div key={index}>
              <div key={index}>
                <span>{username} :</span>
                <span> {message}</span>
              </div>
            </div>
          );
        })}
      </div>
      <h1>채팅 치는곳</h1>
      <div>
        <input type="text" onChange={onChangeMessage} value={message} />
        <input
          type="button"
          onClick={handleMessage}
          value="전송"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
