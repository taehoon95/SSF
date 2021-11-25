import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useSelector } from "react-redux";
import { showstreaming } from "../../modules/streaming";

// 2021 1125 이태훈 streaming list
const StreamListContainer = () => {
  const dispatch = useDispatch();
  const login_id = localStorage.getItem('u_id');
  const  { streamInfo }  = useSelector( state =>({
    streamInfo: state.streaming.streamRes
  }))

  useEffect(() => {
    // dispatch(showStreaming("noSearch","noCondition"))
    dispatch(showstreaming("noSearch","noCondition"))
  },[])

  const renderList = () => {
    return streamInfo.map((value) => {
      return (
        <div key={value.l_code}>
          <h1>=======================================</h1>
          <div>
            <Link to={`/WatchPage/${value.l_code}`} >
              {value.l_title}
            </Link>
            <div>{value.l_description}</div>
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
          <Link to={`/LiveSettingPage/${login_id}`}>
            방 만들기
          </Link>
        </div>
      );
    }
  };
  
  return (
    <div>
      <h2>실시간 방송 리스트</h2>
      <div>{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

export default StreamListContainer;
