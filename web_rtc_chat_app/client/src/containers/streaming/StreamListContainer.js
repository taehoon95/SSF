import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { showstreaming } from "../../modules/streaming";
import { useHistory } from "react-router";
import { SocketContext } from "../../SocketContext";

// 2021 1125 이태훈 streaming list
const StreamListContainer = () => {
  const u_id = localStorage.getItem("u_id")
  const history = useHistory();
  const login_id = localStorage.getItem("u_id");
  const dispatch = useDispatch();

  // 방 리스트 뽑기 애매함
  // DB에서 방리스트 뽑아오기(처음 페이지 접속했을때 사용)
  const { streamInfo } = useSelector((state) => ({
    streamInfo: state.streaming.streamRes,
  }));

  // useContext를 이용해서 실시간으로 방생성 될 때마다 받아오기(처음이후 계속 이용)
  const { socketRef, rooms } = useContext(SocketContext);

  useEffect(() => {
    dispatch(showstreaming("noSearch", "noCondition"));
  }, [dispatch]);

  const handleJoinRoom = (e) => {
    // const l_code = e.target.classname;
    const {className} = e.target;
    const l_code = className;
    socketRef.emit("clientJoinRoom", l_code, u_id);
    
    history.push(`/WatchPage/${e.target.className}`);
  };

  const dbRenderList = () => {
    return streamInfo.map((value) => {
      return (
        <div key={value.l_code}>
          <h1>=======================================</h1>
          <div onClick={handleJoinRoom} className={value.l_code}>
            <div className={value.l_code}>
              {value.l_title}
              <div className={value.l_code}>{value.l_description}</div>
            </div>
          </div>
          <h1>=======================================</h1>
        </div>
      );
    });
  };

  const liveRenderList = () => {
    return Object.keys(rooms).map((value) => {
      return (
        <div key={rooms[value].l_code}>
          <h1>=======================================</h1>
          <div>
            <div onClick={handleJoinRoom} className={rooms[value].l_code}>
              {rooms[value].l_title}
              <div className={rooms[value].l_code}>{rooms[value].l_description}</div>
            </div>
          </div>
          <h1>=======================================</h1>
        </div>
      );
    });
  };

  const renderCreate = () => {
    // 아이디 있는경우
    if (login_id) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to={`/LiveSettingPage/${login_id}`}>방 만들기</Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>실시간 방송 리스트</h2>
      <div>{dbRenderList()}</div>
      <div>{liveRenderList()}</div>
      {renderCreate()}
    </div>
  );
};

export default StreamListContainer;
