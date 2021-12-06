import React, { useContext, useRef, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { SocketContext } from "../../SocketContext";
import "../../lib/styles/Chat.css";
import { Box, Button, Modal, Typography } from "../../../node_modules/@material-ui/core/index";

// 2021 1125 이태훈 streaming 채팅 page
const ChatContainer = () => {
  const { socketRef, setMsgs, msgs, viewers, setViewers } = useContext(SocketContext);
  // message: 채팅 메세지
  const [message, setMessage] = useState("");
  // l_code: rooms객체를 식별하기위한 것
  const { l_code } = useParams();
  // u_id: username처럼 쓸것
  const u_id = localStorage.getItem("u_id");

  const onChangeMessage = (e) => {
    const { value } = e.target
    u_id ? setMessage(value) : setMessage("");
  };

  const messageEl = useRef("");

  // 댓글 로그인 권한 모달
  const styleModal3 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 340,
    height: 100,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    console.log(viewers);
    setViewers(viewers);
  }, []);


  const handleMessage = () => {
    // 일단 테스트용으로 socket id로 채팅 해본다.(spring security 잘되있어서 다른아이디로 여러 로그인 불가)
    const username = u_id;
    const usersocket = socketRef.id;
    socketRef.emit("clientSendMessage", message, username, l_code, usersocket);
    // message값 없으면 리턴
    if(!message){
      return;
    }
    setMsgs([
      ...msgs,
      {
        username: "ME",
        message,
      },
    ]);
    setMessage("");
  };

  const onkeyPress = (e) => {
    if(e.key === 'Enter'){
      handleMessage();
    }
  }
  const history = useHistory();

  // login 후 채팅 가능하게
  const [open3, setOpen3] = useState(false);
  
  const login_Auth = () => {
    history.push("/LoginPage");
  };
  const handleOpen3 = (e) => {
    !u_id && setOpen3(true);
  };
  const handleClose3 = (e) => {
    setOpen3(false);
  };

  return (
    <>
      <div className="chat">
        <div className="messages" ref={messageEl}>
          {msgs.map(({ message, username }, index) => {
            return (
              <div key={index}>           
                {/* 2021-12-05 강동하 내 채팅 노란색 */}
                {username == "ME" ? 
                (<>
                <span className="msg">{username && `${username}:`} </span>
                <span className="msg"> {message}</span>
                </>)
                :
                (<>
                <span className="msgviewer">{username && `${username}:`}</span>
                <span className="msgviewer"> {message}</span>
                </>)
                }
              </div>
            );
          })}
        </div>
        <div className="footer">
          <input className="messageBox" onClick={handleOpen3} onKeyPress={onkeyPress} type="text" onChange={onChangeMessage} value={message} placeholder="메세지 보내기"/>
          <input className="submitBtn" type="submit" onClick={handleMessage} value="채팅"/>
        </div>
        {/* 비로그인 시 댓글 접근 Modal */}
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal3} align="center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom="50"
          >
            로그인 권한이 필요합니다.
            <br />
            로그인 페이지로 이동하시겠습니까?
          </Typography>
          
          <Button
            style={{ marginTop: 10 }}
            onClick={login_Auth}
            color={'primary'}
            type="submit"
            variant="contained"
          >
            이동
          </Button>
          <Button
          style={{ marginTop: 10, marginLeft: 30 }}
            onClick={handleClose3}
            color={'primary'}
            type="submit"
            variant="contained"
          >
            취소
          </Button>
        </Box>
      </Modal>
      </div>
    </>
  );
};

export default ChatContainer;
