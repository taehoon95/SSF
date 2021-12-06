import React, { createContext, useState, useEffect } from "react";
import  io, {Socket}  from "socket.io-client";


const SocketContext = createContext();
// 11 17 강동하 수정
// 배포시에 ip 변경하기
// 땡겨받고 자기 ip로 변경

const SOCKET_SERVER_URL = "https://localhost:5000";
// const socket = io("https://218.159.169.101:5000",{ secure : true });
// const socket = io("https://18.219.234.0:5000",{ secure : true });
// const socket = io("https://172.31.47.101:5000",{ secure : true });


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
        console.log(usersocket);
        console.log(username);
        setMsgs((msgs) => [...msgs, {message,username}]);
      })
      
      socketRef.on("enterRoom",({total, u_id})=> {
        console.log(total);
        console.log(u_id);
        setViewers(total);
        // u_id 
        //     ? setMsgs((msgs) => [...msgs, { message:`${u_id} 입장하셧습니다.`,u_id}]) 
        //     : setMsgs((msgs) => [...msgs, { message:`비회원이 입장하셧습니다.`,u_id}])
        
      })

      socketRef.on("exitRoom",({total, u_id})=> {
        console.log(total);
        console.log(u_id);
        setViewers(total);
        // u_id
        //  ? setMsgs((msgs) => [...msgs, {message:`${u_id} 퇴장하셧습니다.`,u_id}])
        //  : setMsgs((msgs) => [...msgs, { message:`비회원이 퇴장하셧습니다.`,u_id}])
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
