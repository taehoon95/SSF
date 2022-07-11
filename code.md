 1. Server
 2. SocketContext
 
3. WatchPage
4. ChatContainer 
5. CreateaStreamContainer
6. StreamShowContainer
7. StreamingAPI
8. Streaming

# Backend
## Server.js
1. backend 설정은 express 영상이나 화면공유, 얼굴등을 보여주기 때문에 Https 프로토콜을 사용 했습니다.  
```js
const express = require("express");
const app = require("express")();
//const server = require('http').createServer(app);
const https = require("https");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const rootRouter = require("./routes/index");

app.use(bodyParser());

// ssl 인증키
const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

const server = https.createServer(options, app);
const PORT = 5000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

app.use(express.static("public"));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", rootRouter);

/*
Signaling Server
*/
// 특정 소켓이 실시간 데이터 전송에 사용
// data: 메시지
// 소켓 연결

// rooms객체 생성(스트리밍중인 방들이 저장될 예정)
let rooms = {};

// login한 사람들 채팅에 들어오면 MAP
const loginMap = new Map();

// login한 사람들 중 방에 따라 분류
let watchers = null;

const userMap = new Map();
io.on("connection", (socket) => {
  // clientSendMessage: chatting 에서 message보내기
  socket.on("clientSendMessage", (message, username, l_code, usersocket) => {
    socket.to(l_code).emit("serverRoomMessage", {
      message,
      username,
      usersocket,
    });
  });

  // clientCreateRoom 방 만들기(스트리머)
  socket.on("clientCreateRoom", (roomInfo) => {
    const l_code = roomInfo.l_code;
    const l_title = roomInfo.l_title;
    const l_description = roomInfo.l_description;
    const u_id = roomInfo.u_id;
    rooms[l_code] = {
      l_code,
      l_title,
      l_description,
      u_id,
    };
    socket.join(l_code);
    // 서버에 있는 rooms객체를 socket을 가진 client에게 전송
    socket.broadcast.emit("serverRooms", rooms);
    socket.emit("serverRooms", rooms);
    socket.emit("serverJoinRoom", roomInfo);
  });

  // 방 입장하기
  socket.on("clientJoinRoom", (l_code, u_id, usersocket) => {
    socket.join(l_code);
    loginMap.set(usersocket,l_code);
    userMap.set(usersocket,u_id);
    watchers = new Map([...loginMap].filter(([k,v]) => v === l_code));
    const total = watchers.size;
    socket.emit("serverJoinRoom", rooms[l_code], total);
    socket.to(l_code).emit("enterRoom", {total, u_id});
  });

  socket.on("exitRoom", (socketId, u_id, l_code) => {
    loginMap.delete(socketId);
    userMap.delete(socketId);
    watchers = new Map([...loginMap].filter(([k,v]) => v === l_code));
    const total = watchers.size;
    socket.to(l_code).emit("exitRoom", {total, u_id});
  });

  // 비정상적인 종료(닫기 버튼, 새로고침 시 소켓 연결 해제
  socket.on("disconnect", (e) => {
    let u_id = userMap.get(socket.id);
    let l_code = loginMap.get(socket.id);
    loginMap.delete(socket.id);
    watchers = new Map([...loginMap].filter(([k,v]) => v === l_code));
    const total = watchers.size;
    socket.to(l_code).emit("exitRoom", {total, u_id});
  });
});

// steaming 서버 포트 번호 및 http, https에서 사용할 포트번호
const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
  },
  https: {
    port: 8443,
    key: "./key.pem",
    cert: "./cert.pem",
  },
};

var nms = new NodeMediaServer(config);
nms.run();

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

```
 

# Front-end
## SocketContext.js  
```js  
import React, { createContext, useState, useEffect } from "react";  
import  io from "socket.io-client";  
  
  
const SocketContext = createContext();  
// 배포시에 ip 변경하기  
// 땡겨받고 자기 ip로 변경  
  
const SOCKET_SERVER_URL = "[https://localhost:5000](https://localhost:5000/)";  
  
const socketRef = io(SOCKET_SERVER_URL);  

const ContextProvider = ({ children }) => {  
  const [usernaem,setUserName] = useState("");  
  // rooms: room 객체들 정보모음  
  const [rooms, setRooms] = useState({});  
  const [msgs, setMsgs] = useState([]);  
  // joinRoom: 현재 참여하고 있는 room정보  
  const [joinRoom, setJoinRoom] = useState("");  
  // 시청자 수  
  const [viewers ,setViewers] = useState(0);  
  
    // rooms 객체 설정  
    socketRef.on("serverRooms", (value) => {  
      setRooms(value)  
    })
	
    // 현재 참여하고 있는 방  
    socketRef.on("serverJoinRoom", (roomInfo,total) => {  
      setJoinRoom(roomInfo)  
      setMsgs([]);  
      setViewers(total);  
    })  
     
    useEffect(() => {  
      socketRef.on("serverRoomMessage",({message,username,usersocket})=> {  
        setMsgs((msgs) => [...msgs, {message,username}]);  
      })  
       
      socketRef.on("enterRoom",({total, u_id})=> {  
        setViewers(total);          
      })  
  
      socketRef.on("exitRoom",({total, u_id})=> {  
        setViewers(total);        
      })  
    },[socketRef])  
   
  return (  
    <SocketContext.Provider  
      value={{  
        socketRef,  
        rooms,  
        joinRoom,  
        usernaem,  
        setUserName,  
        msgs,  
        setMsgs,  
        setViewers,  
        viewers  
      }}  
    >  
      {children}  
    </SocketContext.Provider>  
  );  
};  
  
export { ContextProvider, SocketContext };  
```  
  



## WatchPage.js  
```js  
//실시간 방송 페이지 + 영상 클릭 후 페이지  
  
import React from "react";  
import StreamShowContainer from "../containers/streaming/StreamShowContainer";  
import { ContextProvider } from "../SocketContext";  
import Header from "../components/common/Header";  
  
const WatchPage = () => {  
return (  
<>  
{/* <Header /> */}  
	<ContextProvider>  
		<StreamShowContainer />  
	</ContextProvider>  
</>  
)};  
export default WatchPage;  
```  

## ChatContainer.js  
```js  
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
    setViewers(viewers);  
  }, []);  
  
  
  const handleMessage = () => {  
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
  
  // login 후 채팅 가능하도록 알림 후 로그인 창으로 이동
  const [open3, setOpen3] = useState(false);  
   
  const login_Auth = () => {  
    socketRef.emit("exitRoom", socketRef.id, u_id, l_code);  
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

```




## CreateaStreamContainer.js
```js
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, cut, insertStreaming, showStreamingByLnum } from "../../modules/streaming";
import { nanoid } from "nanoid";
import { useHistory } from "react-router";
import { SocketContext } from "../../SocketContext";
import Container from "@mui/material/Container";
import { Grid, Typography, Input, IconButton } from "../../../node_modules/@material-ui/core/index";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// 2021 1125 streaming 방만들기 이태훈 
const CreateaStreamContainer = () => {
  const { socketRef } = useContext(SocketContext);
  const u_id = localStorage.getItem("u_id");
  const dispatch = useDispatch();
  const nano = nanoid();
  useEffect(()=>{
    dispatch(showStreamingByLnum(streamInfo.l_code));
    dispatch(change({ name:"u_id", value:u_id }));
  },[])
  const history = useHistory();

  const [isValidCheck, setIsValidCheck] = useState(false);
  const [selectedIFile, setSelectedIFile] = useState(null); // 이미지
  const [img, setImg] = useState(""); // 이미지
  const [streamKey, setStreamKey] = useState(nano); // 스트림키인 l_code 재발급용
  const [copy, setCopy] = useState(false);
  // 이미지 file max size 50MB
  const maxSize = 50 * 1024 * 1024;
  const fileSize = null;

  const {streamInfo, l_code, l_title, l_description, l_img } = useSelector((state) => ({
    streamInfo:state.streaming,
    l_code:state.streaming.l_code,
    l_title:state.streaming.l_title,
    l_description:state.streaming.l_description,
    l_img:state.streaming.l_img,
  }))

  const handleStreamInfo = (e) => {
    setIsValidCheck(false);
    const { name, value } = e.target;
    dispatch(change({ name, value }));
  };

  const createStreaming = () => {
    dispatch(showStreamingByLnum(streamInfo.l_code));

    if(streamInfo.streamRes !== "방 만들기 가능"){
      alert("사용중인 스트림키 입니다.")
      return;
    }
    console.log(streamInfo.u_id);
    if(u_id === ""){
      alert("로그인이 필요한 작업입니다.")
      return;
    }
    // 방만들기
    if (streamInfo.l_title === "") {
      setIsValidCheck(true);
      return;
    }
  
    if (window.confirm(`스트림키는 ${streamInfo.l_code}입니다.`)) {
      socketRef.emit("clientCreateRoom", streamInfo);
      dispatch(insertStreaming(streamInfo));
      history.push(`/WatchPage/${streamInfo.l_code}`)
    } else {
      alert("방만들기를 취소 하셨습니다.");
    }
  };

  // 2021-12-02 썸네일 이미지 업로드
  // 2021-12-02 썸네일 이미지 onChange

  const handleImgChange = (e) => {
    const file = e.currentTarget.files[0];
    if(file.size > maxSize){
      alert("사이즈 50MB이하 파일로 올려주세요");
      return;
    }    
    setSelectedIFile(e.target.files[0]);
  };

  useEffect(()=>{
    console.log(222);
    selectedIFile && fileNameCheck();
  }, [selectedIFile])

    // 2021-12-02 썸네일 이미지 파일 정규표현식 및 중복체크
    const fileNameCheck = (e) => {
      if (selectedIFile != null ) {
        let imegePattern = /(.png|.jpg|.jpeg|.gif|.bmp|.dib|.tif|.tiff)$/;
        if(imegePattern.test(selectedIFile.name) !== true) {
          alert("이미지 파일을 확인해주세요. \n\n사용가능 파일 : PNG, JPG, JPEG, GIF, BMP, DIB, TIF, TIFF");
        }
        else {
          console.log(selectedIFile);
          let imagePreProcess = selectedIFile.name.replace(imegePattern, "");
          // 썸네일 파일이름 중복체크
          axios.get(`/api/streamfilename/${imagePreProcess}`)
          .then(response => {
            let INumber = response.data;
            if(INumber != 0) {
              INumber = INumber + 1;
              let IFileSplit = selectedIFile.name.split('.');
              var IResult = IFileSplit[0].concat(` (${INumber}).${IFileSplit[1]}`);
            } else {
              var IResult = selectedIFile.name;
            }
            setImg(IResult);
            const url = "https://ssfupload.s3.ap-northeast-2.amazonaws.com/streaming/";
            const l_imgURL = url + IResult;
            // 2021-12-02  s3 url + 파일명 스토어에 저장
            dispatch(change({ name: 'l_img', value: l_imgURL }));
          })
          .catch(error => {
            // console.log(error);
          })
        }
        return true;
      } 
    }

    // 2021-12-02 썸네일 이미지 파일 저장
    const handleFileUpload = () => {
      
      // 2021-12-02 S3 업로드
      if (selectedIFile != null) {
        const imgData = new FormData();
        imgData.append("file", selectedIFile, img);
  
        axios
        .post("/api/uploadimg", imgData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      }
      // 2021-12-02 db에 이미지 경로 업로드(방송 시작)
      createStreaming();
    };

    const handleStreamKey = () => {
      setStreamKey(nano);
      streamKey && dispatch(change({ name:"l_code", value:streamKey }));
      setCopy(false);
    }

    const textAreaRef = useRef();
    const keyCopy = (e) => {
      textAreaRef.current.select();
      document.execCommand("copy");
      textAreaRef.current.focus();
      setCopy(true);
    }
    const noPointer = {cursor: 'default'};

  return (
    <div>
      <Container
        component="main"
        maxWidth="xs"
        
        style={{
          background: "#FFFF",
          borderRadius: 5,
          marginTop: 170,
          height: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20,fontFamily:'Noto Sans KR' }}>실시간 방 만들기</h2>
        <Button
          onClick={() => window.open("https://fern-vanadium-ef2.notion.site/OBS-50200eb992404b39a5f9c4be906efc72", '_blank')}    
        >OBS를 이용해 방송 키는 방법</Button>
        <p>스트림 키</p>
        <div style={{display: "flex",
              justifyContent: "space-between"}}>
          <TextField
            style={{marginTop: "3%"}}
            InputProps={{ disableUnderline: true }}
            fullWidth
            onClick={keyCopy}
            id="outlined-basic"
            name="l_code"
            value={l_code}
            inputRef={textAreaRef}
            readOnly
          />
          <IconButton style={noPointer} tooltip="clipboard copy">
            <ContentCopyIcon style={noPointer} onClick={keyCopy} />
          </IconButton>
        </div>
        {copy &&
          <Alert severity="success">
            <strong>copy</strong>
          </Alert>}
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ marginTop: 30, marginBottom: 20 }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleStreamKey}
          >
            스트림키 재발급
          </Button>
        </div>
        <div>
          <p>방 제목</p>
          <TextField
            fullWidth
            name="l_title"
            onChange={handleStreamInfo}
            value={l_title}
          />
        </div>
        <div>
          {isValidCheck && (
            <label style={{ color: "red",fontFamily:'Noto Sans KR' }}>방 제목을 입력 해주세요</label>
          )}
        </div>
        <p style={{ marginTop: 20,fontFamily:'Noto Sans KR' }}>방 설명</p>
        <TextField
          name="l_description"
          onChange={handleStreamInfo}
          value={l_description}
          fullWidth
        />
            {/* 이미지 선택 */}
            {/* 2021-12-02 방송중 썸네일 업로드 */}
            <Grid style={{ marginTop: 30 }}>
              <Typography style={{fontFamily:'Noto Sans KR'}}>썸네일 파일 선택</Typography>
            </Grid>
            <Grid>
              
              <Input
                inputProps ={{accept:"image/*"}}
                name="l_img"
                type="file"
                required
                onChange={handleImgChange}
                style={{ width: '100%' }}
              />
              
            </Grid>

        <div style={{ textAlign: "center" }}>
          <Button
            style={{ marginTop: 30, marginBottom: 20,fontFamily:'Noto Sans KR' }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFileUpload}
          >
            방만들기{" "}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateaStreamContainer;
```
## StreamShowContainer.js
```js
import React, { useContext, useEffect, useRef, useState } from "react";
import flv from "flv.js";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  cut,
  showStreamingByLnum,
  updateStreaming,
} from "../../modules/streaming";
import "../../lib/styles/Modal.css";
import ChatContainer from "./ChatContainer";
import { SocketContext } from "../../SocketContext";
import { Grid } from "@mui/material";
import { Button, Box, IconButton } from "@material-ui/core";
// icon
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
// makeStyleHook
import { makeStyles } from "@material-ui/core/styles";
import { WhereToVote } from "../../../node_modules/@mui/icons-material/index";
import {
  TextField,
  Typography,
} from "../../../node_modules/@material-ui/core/index";

import Header from "../../components/common/Header";

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { Desktop, Mobile } from "../../pages/WatchPage2"
import { deleteStreaming } from "../../lib/api/StreamingAPI";


const useStyles = makeStyles({
  isChat: {
    color: "white",
  },
  button: {
    color: "white",
  },
});
// 2021 1125 이태훈 streaming show page 방송 정보,편집,종료
const StreamShow = () => {
  const history = useHistory();
  const u_id = localStorage.getItem("u_id");
  const { l_code } = useParams();
  const dispatch = useDispatch();

  const videoRef = useRef();
  const [offStreaming, setOffStreaming] = useState(false);

  const { streamInfo } = useSelector((state) => ({
    streamInfo: state.streaming.streamRes,
  }));

  const { socketRef, viewers } = useContext(SocketContext);
  const { s_code } = useSelector((state) => ({
    s_code: state.streaming.streamRes.s_code,
  }));

  // 주소창으로 들어오면
  // 1. 방에 입장하는 것을 소켓에 알려주고
  // 2. l_code로 검색후 방정보들을 store에 저장
  // 3. buildPlayer로 방송 실행
  const usersocket = socketRef.id;
  useEffect(() => {
    setOffStreaming(false);
    socketRef.emit("clientJoinRoom", l_code, u_id, usersocket);
    dispatch(showStreamingByLnum(l_code));
    buildPlayer();
  }, [offStreaming]);

  // 방송 실행 메서드
  const buildPlayer = () => {
    const player = flv.createPlayer({
      type: "flv",
      url: `https://localhost:8443/live/${l_code}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
    if (offStreaming) {
      player.destroy();
      deleteStreaming({u_id, l_code}).then(() => (history.push('/')));
    }
  };

  // 방송 종료
  const offStreamingbtn = () => {
    if (window.confirm(`방송종료 하시겠습니까?`)) {
      dispatch(cut());
      setOffStreaming(true);
      return;
    } else {
      alert("방송종료를 취소 하셨습니다.");
      return;
    }
  };
  // 방송 나가기
  const exitStreamingbtn = () => {
    if (window.confirm(`이 방송에서 나가시겠습니까?`)) {
      socketRef.emit("exitRoom", socketRef.id, u_id, l_code);
      history.push("/");
      return;
    } else {
      alert("시청을 계속 합니다.");
      return;
    }
  };

  // 뒤로 가기 버튼 클릭 감지
  window.onpopstate = (e) => {
    socketRef.emit("exitRoom", socketRef.id, u_id, l_code);
  }

  // 방설정 편집
  const [l_title, setL_title] = useState("");
  const [l_description, setL_description] = useState("");
  // 모달창 show
  const [show, setShow] = useState(false);
  // 유효성 검사
  const [isValid, setIsValid] = useState(false);

  // 모달창 끄기 modal-card div밖에클릭해야 창이 꺼짐
  const handleModalClose = (e) => {
    const currentClass = e.target.className;
    if (currentClass === "modal-card" || currentClass === "modal-item") return;
    setShow(false);
  };
  // 모달창 켜기
  const handleModalOpen = (e) => {
    setL_title(streamInfo.l_title);
    setL_description(streamInfo.l_description);
    setShow(true);
  };
  // 제목,설명 변경값
  const handleEditItem = (e) => {
    const { name, value } = e.target;
    name === "l_title" && setL_title(value);
    name === "l_description" && setL_description(value);
    // console.log(name);
    // console.log(isValid);

    if (name === "l_title" && value !== "") {
      setIsValid(false);
    } else if (name === "l_title" && value === "") {
      setIsValid(true);
    }
  };
  // 완료 클릭시
  const handleEdit = (e) => {
    if (l_title === "") {
      setIsValid(true);
    } else {
      dispatch(
        updateStreaming(u_id, streamInfo.l_code, l_title, l_description)
      );
      setShow(false);
    }
  };

  const classes = useStyles();
  // 채팅창 보였다 안보였다 설정
  const [isShowChat, setIsShowChat] = useState(false);
  const handleShowChat = () => {
    setIsShowChat(!isShowChat);
  };
  return (
    <>

    {/* 2021-12-06 반응형 */}
      <Header socket={socketRef} userid={u_id} l_code={l_code}/>
      <Desktop>
      <Grid container style={{ marginTop: 70 }}>
        {/* 실시간 영상 */}
        <Grid item xs={12} sm={9}>
          <video
            ref={videoRef}
            style={{ width: "95%", marginLeft: "30px" }}
            controls
          />
          <Box sx={{ marginLeft: "30px", color: "white", witdh:"100%"}} >
            <Box display="flex" justifyContent="space-between" width="98%" alignItems="center">

              <h1>
                {streamInfo.u_id}님의 방송                
                {isShowChat ? (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlineOutlinedIcon"
                  >
                    <ChatBubbleOutlineOutlinedIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlinedIcon"
                  >
                    <ChatBubbleOutlinedIcon />
                  </IconButton>
                )}                
              </h1>
              <Box display="flex" style={{ marginRight: 12 }} >
                <PeopleAltRoundedIcon style={{ marginRight: 5, marginTop: 6 }}/>
                <h3 style={{ marginTop: 4 }}>{viewers - 1}</h3>
              </Box>
            </Box>
            <Box>
              <h2> {streamInfo.l_title}</h2>
            </Box>
            <h3> {streamInfo.l_description}</h3>
            <Box sx={{ marginTop: "10px" }}>
              {u_id && u_id === streamInfo.u_id ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ExitToAppOutlinedIcon />}
                    className={classes.button}
                    onClick={offStreamingbtn}
                  >
                    방송종료
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<SettingsOutlinedIcon />}
                    className={classes.button}
                    onClick={handleModalOpen}
                    style={{ marginLeft: "20px" }}
                  >
                    방송정보편집
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ExitToAppOutlinedIcon />}
                  className={classes.button}
                  onClick={exitStreamingbtn}
                >
                  방송나가기
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          {!isShowChat && <ChatContainer />}
        </Grid>

        {/* 모달창 */}
        <div hidden={!show}>
          <Grid item className="modal-background">
            <Grid
              item
              className="modal-card"
              textAlign="center"
              style={{ textAlign: "center", marginTop: 300, marginLeft: "37%" }}
            >
              <Grid item>
                <Typography variant="h6">방송제목</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_title"
                  value={l_title}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
                {isValid && (
                  <Typography
                    variant="body2"
                    color="error"
                    className="modal-item"
                  >
                    방송제목을 입력해주세요
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h6">방송설명</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_description"
                  value={l_description}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
              </Grid>

              {/* 취소, 완료 버튼 */}
              <Grid item style={{ marginTop: 10, textAlign: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleModalClose}
                  style={{ width: "20%" }}
                >
                  취소
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleEdit}
                  style={{ marginLeft: 40, width: "20%" }}
                >
                  완료
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      </Desktop>
      <Mobile>
      <Grid container style={{ marginTop: 70 }}>
        {/* 실시간 영상 */}
        <Grid item xs={12} sm={9}>
          <video
            ref={videoRef}
            style={{ width: "95%", marginLeft: "2%", marginRight: "2%"}}
            controls
          />
          <Box sx={{ marginLeft: "30px", color: "white", witdh:"100%"}} >
            <Box display="flex" justifyContent="space-between" width="98%" alignItems="center">
              <h3>
                {streamInfo.u_id}님의 방송
                {isShowChat ? (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlineOutlinedIcon"
                  >
                    <ChatBubbleOutlineOutlinedIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlinedIcon"
                  >
                    <ChatBubbleOutlinedIcon />
                  </IconButton>
                )}
              </h3>
              <Box display="flex" style={{ marginRight: 12 }} >
                <PeopleAltRoundedIcon style={{ marginRight: 5, marginTop: 6 }}/>
                <h4 style={{ marginTop: 4 }}>{viewers}</h4>
              </Box>
            </Box>
            <Box>
              <h4> {streamInfo.l_title}</h4>
            </Box>
            <h5> {streamInfo.l_description}</h5>
            <Box sx={{ marginTop: "10px" }}>
              {u_id && u_id === streamInfo.u_id ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ExitToAppOutlinedIcon />}
                    className={classes.button}
                    onClick={offStreamingbtn}
                  >
                    방송종료
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<SettingsOutlinedIcon />}
                    className={classes.button}
                    onClick={handleModalOpen}
                    style={{ marginLeft: "20px" }}
                  >
                    방송정보편집
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ExitToAppOutlinedIcon />}
                  className={classes.button}
                  onClick={exitStreamingbtn}
                >
                  방송나가기
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          {!isShowChat && <ChatContainer />}
        </Grid>

        {/* 모달창 */}
        <div hidden={!show}>
          <Grid item className="modal-background">
            <Grid
              item
              className="modal-card"
              textAlign="center"
              style={{ textAlign: "center", marginTop: 300, marginLeft: "37%" }}
            >
              <Grid item>
                <Typography variant="h6">방송제목</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_title"
                  value={l_title}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
                {isValid && (
                  <Typography
                    variant="body2"
                    color="error"
                    className="modal-item"
                  >
                    방송제목을 입력해주세요
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h6">방송설명</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_description"
                  value={l_description}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
              </Grid>

              {/* 취소, 완료 버튼 */}
              <Grid item style={{ marginTop: 10, textAlign: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleModalClose}
                  style={{ width: "20%" }}
                >
                  취소
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleEdit}
                  style={{ marginLeft: 40, width: "20%" }}
                >
                  완료
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      </Mobile>

    </>
  );
};
                                                                                 
export default StreamShow;
```


## StreamingAPI.js
- 스프링에서 작성한 API 사용

```js
import axios from "axios";

// 2021-11-25 이태훈 스트리밍 리스트(조건: l_description, l_title, u_id)
export const showStreaming = ({ streaming, condition }) =>
  axios.get(`/api/showStreaming/${streaming}/${condition}`);

// 2021-11-25 이태훈 스트리밍 방만들기
export const insertStreaming = ({ streamInfo }) =>
  axios.post("/api/insertStreaming", streamInfo);

// 2021-11-25 이태훈 스트리밍 방 이름 ,description 변경
export const updateStreaming = ({ u_id, l_code, l_title, l_description }) =>
  axios.patch("/api/updateStreaming", { u_id, l_code, l_title, l_description });

// 2021-11-25 이태훈 방송종료 후 스트리밍 방 삭제
export const deleteStreaming = ( { u_id, l_code } ) =>
  axios.delete("/api/deleteStreaming", {data:{ u_id, l_code }});

// 2021-11-25 이태훈 l_num으로 스트리밍 방 상세 검색
export const showStreamingByLnum = ({ l_code }) =>
  axios.get(`/api/showStreamingByLnum/${l_code}`);

// 2021-12-02 이태훈 검색 시 스트리밍 리스트
export const showSearchStreaming = ({search}) =>
  axios.get(`/api/showSearchStreaming/${search}`)

// 2021-12-02 이태훈 비디오 무한 스크롤
export const showInfiniteVideoSearch = (search, pageNum) => 
  axios.get(`/api/videoInfiniteSearch/${search}/${pageNum}`)

// 2021-12-03 이태훈 스트리밍 무한 스크롤
export const showInfiniteStreamingSearch = (search, pageNum) => 
  axios.get(`/api/streamingInfiniteSearch/${search}/${pageNum}`)
```


## streaming.js
- 리덕스 사용하여 API 사용

```js
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as streamingAPI from "../lib/api/StreamingAPI";
import { takeLatest } from "redux-saga/effects";
import { nanoid } from "nanoid";
import produce from "immer";

const CHANGE = "streaming/CHANGE";

const CUT = "streaming/CUT";

const [SHOWSTREAMING, SHOWSTREAMING_SUCCESS, SHOWSTREAMING_FAILURE] =
  createRequestActionTypes("showstreaming");

const [INSERTSTREAMING, INSERTSTREAMING_SUCCESS, INSERTSTREAMING_FAILURE] =
  createRequestActionTypes("insertStreaming");

const [UPDATESTREAMING, UPDATESTREAMING_SUCCESS, UPDATESTREAMING_FAILURE] =
  createRequestActionTypes("updateStreaming");

const [DELETESTREAMING, DELETESTREAMING_SUCCESS, DELETESTREAMING_FAILURE] =
  createRequestActionTypes("deleteStreaming");

const [
  SHOWSTREAMINGBYLNUM,
  SHOWSTREAMINGBYLNUM_SUCCESS,
  SHOWSTREAMINGBYLNUM_FAILURE,
] = createRequestActionTypes("showStreamingByLnum");

const [
  SHOWSEARCHSTREAMING,
  SHOWSEARCHSTREAMING_SUCCESS,
  SHOWSEARCHSTREAMING_FAILURE,
] = createRequestActionTypes("showSearchStreaming");

const showstreamingSaga = createRequestSaga(
  SHOWSTREAMING,
  streamingAPI.showStreaming
);
const insertStreamingSaga = createRequestSaga(
  INSERTSTREAMING,
  streamingAPI.insertStreaming
);
const updateStreamingSaga = createRequestSaga(
  UPDATESTREAMING,
  streamingAPI.updateStreaming
);
const deleteStreamingSaga = createRequestSaga(
  DELETESTREAMING,
  streamingAPI.deleteStreaming
);
const showStreamingByLnumSaga = createRequestSaga(
  SHOWSTREAMINGBYLNUM,
  streamingAPI.showStreamingByLnum
);
const showSearchStreamingSaga = createRequestSaga(
  SHOWSEARCHSTREAMING,
  streamingAPI.showSearchStreaming
);

export function* streamingSaga() {
  yield takeLatest(SHOWSTREAMING, showstreamingSaga);
  yield takeLatest(INSERTSTREAMING, insertStreamingSaga);
  yield takeLatest(UPDATESTREAMING, updateStreamingSaga);
  yield takeLatest(DELETESTREAMING, deleteStreamingSaga);
  yield takeLatest(SHOWSTREAMINGBYLNUM, showStreamingByLnumSaga);
  yield takeLatest(SHOWSEARCHSTREAMING, showSearchStreamingSaga);
}

// 2021-12-02 리덕스 수정
const init = {
  searchInfo: "",
  condition: "",
  streamInfo: {},
  streamRes: [],
  showStreamRes: [],
  streamError: null,
  l_code: nanoid(),
  u_id: localStorage.getItem("u_id"),
  l_title: "",
  l_description: "",
  l_img: "",
}


export const change = createAction(CHANGE, ({ name, value }) => {
  // console.log(name);
  // console.log(value);
  return({
  name,
  value,
})});


// 2021-12-02 방송 종료 시 값 초기화
export const cut = createAction(CUT, () => ({
  l_title: "",
  l_description: "",
  l_img: "",
}));

export const showstreaming = createAction(SHOWSTREAMING, (streamInfo) => ({
  streamInfo,
}));

export const insertStreaming = createAction(INSERTSTREAMING, (streamInfo) => ({
  streamInfo,
}));

export const updateStreaming = createAction(
  UPDATESTREAMING,
  (u_id, l_code, l_title, l_description) => ({
    u_id,
    l_code,
    l_title,
    l_description,
  })
);

export const deleteStreaming = createAction(
  DELETESTREAMING,
  (u_id, l_code) => ({
    u_id,
    l_code,
  })
);

export const showStreamingByLnum = createAction(
  SHOWSTREAMINGBYLNUM,
  (l_code) => ({
    l_code,
  })
);

export const showSearchStreaming = createAction(
  SHOWSEARCHSTREAMING,
  (search) => ({
    search,
  })
);

const streaming = handleActions(
  {
    [CHANGE]: (state, { payload: { name, value } }) =>
      produce(state, (draft) => {
        draft[name] = value;
      }),

    [CUT]: (state, { payload: showStreamRes }) => ({
      ...state,
      l_title: "",
      l_description: "",
      l_img: "",
    }),

    [SHOWSTREAMING_SUCCESS]: (state, { payload: showStreamRes }) => ({
      ...state,
      streamError: null,
      showStreamRes,
    }),

    [SHOWSTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [INSERTSTREAMING_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [INSERTSTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [UPDATESTREAMING_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [UPDATESTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [DELETESTREAMING_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [DELETESTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [SHOWSTREAMINGBYLNUM_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [SHOWSTREAMINGBYLNUM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [SHOWSEARCHSTREAMING_SUCCESS]: (
      state,
      { payload: showSearchStreamRes }
    ) => ({
      ...state,
      streamError: null,
      showSearchStreamRes,
    }),

    [SHOWSEARCHSTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
  },
  init
);

export default streaming;
```