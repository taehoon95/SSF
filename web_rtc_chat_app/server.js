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

// room에 있는 user들 정보
let users = {};

// chat의 message정보
// let msgs = {};
let msgs = [];
io.on("connection", (socket) => {
  
  // clientSendMessage: chatting 에서 message보내기
  socket.on("clientSendMessage", (message, username, l_code) => {
    // msgs.push({message,username});
    // console.log(msgs);
    socket.to(l_code).emit("serverRoomMessage", {
      message,
      username,
    });
    // socket.broadcast.to(l_code).emit("serverRoomMessage", msgs);
    // socket.to(l_code).emit("serverRoomMessage", msgs);
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
  socket.on("clientJoinRoom", (l_code, u_id) => {
    socket.join(l_code);
    socket.emit("serverJoinRoom", rooms[l_code]);
  });
  
  //
  socket.on("joinRoom", (data) => {
    console.log(data);
    // user[room]에는 room에 있는 사용자들이 배열 형태로 저장된다.
    // room이 존재한다면
    if (users[data.room]) {
      const length = users[data.room].length;
      // 최대 인원을 충족시켰으면 더 이상 접속 불가
      if (length === maximum) {
        socket.to(socket.id).emit("room_full");
        return;
      }
      // 인원이 최대 인원보다 적으면 접속 가능
      users[data.room].push({ id: socket.id, email: data.email });
    } else {
      // room이 존재하지 않는다면 새로 생성
      users[data.room] = [{ id: socket.id, email: data.email }];
    }
    // 해당 소켓이 어느 room에 속해있는 지 알기 위해 저장
    // socketToRoom[socket.id] = data.room;

    socket.join(data.room);
    // console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

    // 본인을 제외한 같은 room의 user array
    const usersInThisRoom = users[data.room].filter(
      (user) => user.id !== socket.id
      );

      // console.log(usersInThisRoom);
      
    // 본인에게 해당 user array를 전송
    // 새로 접속하는 user가 이미 방에 있는 user들에게 offer(signal)를 보내기 위해
    io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
  });

  // 소켓 연결 해제
  socket.on("disconnect", () => {
    // const roomID = socketToRoom[socket.id];
    // let room = users[roomID];
    // if (room) {
    //   room = room.filter((user) => user.id !== socket.id);
    //   users[roomID] = room;
    //   if (room.length === 0) {
      //     delete users[roomID];
      //     return;
    //   }
    // }
    // socket.to(roomID).emit("user_exit", { id: socket.id });
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