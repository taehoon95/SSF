import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { change, insertStreaming } from "../../modules/streaming";
import { nanoid } from "nanoid";
import { useHistory } from "react-router";
// 2021 1125 streaming 방만들기 이태훈
const StreamCreate = () => {
  const u_id = localStorage.getItem("u_id");
  const dispatch = useDispatch();
  const l_code = nanoid();

  const history = useHistory();

  const streamingInfo = {
    l_code,
    u_id,
    l_title: "",
    l_description: "",
  };

  const [streamInfo, setStreamInfo] = useState(streamingInfo);

  const handleStreamInfo = (e) => {
    setStreamInfo({ ...streamInfo, [e.target.name]: e.target.value });
    dispatch(change({ streamInfo }));
  };

  const createStreaming = () => {
    console.log(streamInfo);

    if (window.confirm(`스트림키는 ${streamInfo.l_code}입니다.`)) {
      dispatch(insertStreaming(streamInfo));
      history.push(`/WatchPage/${streamInfo.l_code}`)
    } else {
      alert("방만들기를 취소 하셨습니다.");
    }
  };

  return (
    <div>
      <h3>Create a Stream</h3>
      <input
        type="text"
        name="l_title"
        onChange={handleStreamInfo}
        value={streamInfo.l_title}
      />
      <input
        type="text"
        name="l_description"
        onChange={handleStreamInfo}
        value={streamInfo.l_description}
      />
      <input type="button" onClick={createStreaming} value="방만들기" />
    </div>
  );
};

export default StreamCreate;
