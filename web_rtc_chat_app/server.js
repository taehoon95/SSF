const express = require("express");
const app = require('express')();
//const server = require('http').createServer(app);
const https = require('https');
const cors = require('cors');
const fs = require('fs');

// 11 19 강동하 bodyparser 구현
const bodyParser = require('body-parser');

// 11 19 강동하 /api 라우터 구현
const rootRouter = require('./routes/index');

// 11 19 강동하 bodyparser 구현
app.use(bodyParser());

// 11 17 강동하 수정
// ssl 인증키
const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  };

const server = https.createServer(options, app);

server.listen(5000, ()=>{
    console.log("Server listening on port");
});


const io = require('socket.io')(server, {
    cors : {
        origin:"*",
        method:["GET", "POST"],
    }
});

app.use(express.static('public'));

app.use(cors());
app.get("/", (req, res) => {
    res.send('Server is running');
});

// 11 19 강동하 /api 라우터 구현
app.use('/api', rootRouter);

// 특정 소켓이 실시간 데이터 전송에 사용
// 데이터는 메시지, 오디오 또는 비디오
// 소켓 연결
io.on('connection', socket => {
    socket.emit('me', socket.id);

    // 소켓 연결 해제
    socket.on('disconnect', () => {
        // 일괄적으로 메시지 전송
        socket.broadcast.emit("callended");
    });

    // 참여
    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
        console.log("참여");
        console.log(userToCall, signalData, from, name);
        io.to(userToCall).emit("calluser", { signal : signalData, from, name});
    });

    // 참여 허용
    socket.on("answercall", data => {
        io.to(data.to).emit("callaccepted", data.signal);
    })
});

// steaming 서버 포트 번호 및 http, https에서 사용할 포트번호
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  },
  https: {
    port: 8443,
    key:'./key.pem',
    cert:'./cert.pem',
  }
};

var nms = new NodeMediaServer(config);
nms.run();