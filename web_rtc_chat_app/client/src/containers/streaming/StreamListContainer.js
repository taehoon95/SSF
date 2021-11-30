import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { showstreaming } from "../../modules/streaming";
import { useHistory } from "react-router";
import { SocketContext } from "../../SocketContext";
import MainStreamingListContainer from "./MainStreamingListContainer";

// 2021 1125 이태훈 streaming list
const StreamListContainer = () => {
  const u_id = localStorage.getItem("u_id")
  const history = useHistory();
  const login_id = localStorage.getItem("u_id");
  const dispatch = useDispatch();

  // 방 리스트 뽑기 애매함
  // DB에서 방리스트 뽑아오기(처음 페이지 접속했을때 사용)
  const  {streamRes}  = useSelector((state) => ({
    streamRes: state.streaming.streamRes,
  }));

  // useContext를 이용해서 실시간으로 방생성 될 때마다 받아오기(처음이후 계속 이용)
  const { socketRef, rooms } = useContext(SocketContext);

  useEffect(() => {
    dispatch(showstreaming("noSearch", "noCondition"));
  }, []);

  const handleJoinRoom = (e) => {
    // const l_code = e.target.classname;
    const {className} = e.target;
    const l_code = className;
    socketRef.emit("clientJoinRoom", l_code, u_id);
    history.push(`/WatchPage/${e.target.className}`);
  };

  const dbRenderList = () => {
    return streamRes.map((value,i) => {
      return (
        <div key={i}>
           <MainStreamingListContainer l_code={value.l_code}/>
          <div>
            <div onClick={handleJoinRoom} className={value.l_code}>
              {value.l_title}
              <div className={value.l_code}>{value.l_description}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  const liveRenderList = () => {
    return Object.keys(rooms).map((value,i) => {
      return (
        <div key={i}>
           <MainStreamingListContainer l_code={rooms[value].l_code}/>
          <div>
            <div onClick={handleJoinRoom} className={rooms[value].l_code}>
              {rooms[value].l_title}
              <div className={rooms[value].l_code}>{rooms[value].l_description}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h2>실시간 방송 리스트</h2>
      <div>{Object.keys(rooms).length ? liveRenderList() : dbRenderList()}</div>
    </div>
  );
};

export default StreamListContainer;
