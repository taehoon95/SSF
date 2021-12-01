import React, { useContext, useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { SocketContext } from "../../SocketContext";
import "../../lib/styles/Chat.css";

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

  const messageEl = useRef("");

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const handleMessage = () => {
    // 일단 테스트용으로 socket id로 채팅 해본다.(spring security 잘되있어서 다른아이디로 여러 로그인 불가)
    const username = socketRef.id;
    socketRef.emit("clientSendMessage", message, username, l_code);
    // message값 없으면 리턴
    if(!message){
      return;
    }
    setMsgs([
      ...msgs,
      {
        username: "You",
        message,
      },
    ]);
    setMessage("");
  };

  const onkeyPress = (e) => {
    if(e.key == 'Enter'){
      handleMessage();
    }
  }

  return (
    <>
      <div className="chat">
        <div className="messages" ref={messageEl}>
          {msgs.map(({ message, username }, index) => {
            return (
              <div key={index}>
                <span className="msg">{username} :</span>
                <span className="msg"> {message}</span>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <input className="messageBox" onKeyPress={onkeyPress} type="text" onChange={onChangeMessage} value={message} placeholder="메세지 보내기"/>
          <input className="submitBtn" type="submit" onClick={handleMessage} value="채팅"/>
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
