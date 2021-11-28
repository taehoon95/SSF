// import React, { createContext, useState, useRef, useEffect } from "react";
// import  io  from "socket.io-client";

// const SocketContext = createContext();

// // 11 17 강동하 수정
// // 배포시에 ip 변경하기
// // 땡겨받고 자기 ip로 변경

// const SOCKET_SERVER_URL = "https://localhost:5000";
// // const socket = io("https://218.159.169.101:5000",{ secure : true });
// // const socket = io("https://18.219.234.0:5000",{ secure : true });
// // const socket = io("https://172.31.47.101:5000",{ secure : true });


// const ContextProvider = ({ children }) => {
//   const socketRef = useRef();
//   // rooms: room 객체들 정보모음
//   const [rooms, setRooms] = useState({});
//   // joinRoom: 현재 참여하고 있는 room정보
//   const [joinRoom, setJoinRoom] = useState("");

//   const [usernaem,setUserName] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socketRef = io.connect(SOCKET_SERVER_URL,{ secure : true });

//     // rooms 객체 설정
//     socketRef.on("serverRooms", (value) => {
//       console.log(value);
//       setRooms(value)
//     })

//     // 현재 참여하고 있는 방
//     socketRef.on("serverJoinRoom", (roomInfo) => {
//       setJoinRoom(roomInfo)
//     })

//     // disconnect
//     return () => {
//       if(socketRef){
//         socketRef.disconnect();
//       }
//     }
//   }, []); 
 
//   return (
//     <SocketContext.Provider
//       value={{
//         socketRef,
//         rooms,
//         joinRoom,
//         usernaem,
//         messages,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export { ContextProvider, SocketContext };
