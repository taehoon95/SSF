import React, { useEffect, useRef, useState } from "react";
import flv from "flv.js";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteStreaming, showStreamingByLnum } from "../../modules/streaming";

// 2021 1125 이태훈 streaming show page
const StreamShow = () => {
  const u_id = localStorage.getItem("u_id");
  const { l_code } = useParams();
  const dispatch = useDispatch();

  const videoRef = useRef();
  const [offStreaming, setOffStreaming] = useState(false);

  const { streamInfo } = useSelector((state) => ({
    streamInfo: state.streaming.streamRes,
  }));

  useEffect(() => {
    dispatch(showStreamingByLnum(l_code));
    buildPlayer();
  }, [offStreaming]);

  const buildPlayer = () => {
    const player = flv.createPlayer({
      type: "flv",
      url: `https://localhost:8443/live/${l_code}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
    if (offStreaming) {
      player.destroy();
      dispatch(deleteStreaming(l_code));
    }
  };

  const offStreamingbtn = () => {
    setOffStreaming(true);
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <input type="button" value="방송종료" onClick={offStreamingbtn} />
      <h1>{streamInfo.l_title}</h1>
      <h5>{streamInfo.l_description}</h5>
    </div>
  );
};

export default StreamShow;
