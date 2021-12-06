const express = require("express");
const app = require("express")();
//const server = require('http').createServer(app);
const https = require("https");
const cors = require("cors");
const fs = require("fs");

// 11 19 강동하 bodyparser 구현
const bodyParser = require("body-parser");

// 11 19 강동하 /api 라우터 구현
const rootRouter = require("./routes/index");

// 11 19 강동하 bodyparser 구현
app.use(bodyParser());

// 11 17 강동하 수정
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

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running");
});

// 11 19 강동하 /api 라우터 구현
app.use("/api", rootRouter);

/*
Signaling Server
*/
// 특정 소켓이 실시간 데이터 전송에 사용
// data: 메시지
// 소켓 연결

// rooms객체 생성(스트리밍중인 방들이 저장될 예정)
let rooms = {};
// login한 사람들 채팅에 들어오면 SET

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
    console.log("2222222222222222222");
    socket.join(l_code);
    loginMap.set(usersocket,l_code);
    userMap.set(usersocket,u_id);
    console.log("------------------------");
    watchers = new Map([...loginMap].filter(([k,v]) => v === l_code));
    console.log("watchers   " ,watchers);
    console.log(watchers.size);
    console.log(loginMap.values());
    console.log("------------------------");
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

  console.log(socket.id);

  // 비정상적인 종료(닫기 버튼, 새로고침 시 소켓 연결 해제
  socket.on("disconnect", (e) => {
    console.log(11111);
    console.log(e);
    console.log(socket.id);
    let u_id = userMap.get(socket.id);
    let l_code = loginMap.get(socket.id);
    loginMap.delete(socket.id);
    watchers = new Map([...loginMap].filter(([k,v]) => v === l_code));
    const total = watchers.size;
    socket.to(l_code).emit("exitRoom", {total, u_id});
  });
});
// 
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