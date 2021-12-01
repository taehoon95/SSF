import React, { useEffect, useRef, useState } from "react";
import flv from "flv.js";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStreaming,
  showStreamingByLnum,
  updateStreaming,
} from "../../modules/streaming";

import "../../lib/styles/Modal.css";

import { Avatar, Grid, TextField, Typography } from "@material-ui/core";
import ChatContainer from "./ChatContainer";
import Footer from "../../components/common/Footer";
import { CenterFocusStrong } from "../../../node_modules/@mui/icons-material/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// 2021 1125 이태훈 streaming show page 방송 정보,편집,종료
const StreamShow = () => {
  const history = useHistory();
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
      dispatch(deleteStreaming(u_id, l_code));
      history.push("/");
    }
  };

  // 방송 종료
  const offStreamingbtn = () => {
    if (window.confirm(`방송종료 하시겠습니까?`)) {
      setOffStreaming(true);
      return;
    } else {
      alert("방송종료를 취소 하셨습니다.");
      return;
    }
  };

  // 방설정 편집
  const [l_title, setL_title] = useState("");
  const [l_description, setL_description] = useState("");
  // 모달창 show
  const [show, setShow] = useState(false);
  // 유효성 검사
  const [isValid, setIsValid] = useState(false);

  // 모달창 끄기 modal-card div밖에클릭해야 창이 꺼짐
  const handleModalClose = (e) => {
    const currentClass = e.target.className;
    if (currentClass === "modal-card" || currentClass === "modal-item") return;
    setShow(false);
  };
  // 모달창 켜기
  const handleModalOpen = (e) => {
    setL_title(streamInfo.l_title);
    setL_description(streamInfo.l_description);
    setShow(true);
  };
  // 제목,설명 변경값
  const handleEditItem = (e) => {
    const { name, value } = e.target;
    name === "l_title" && setL_title(value);
    name === "l_description" && setL_description(value);
    if (name === "l_title" && value !== "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  // 완료 클릭시
  const handleEdit = () => {
    if (l_title === "") {
      setIsValid(true);
    } else {
      dispatch(
        updateStreaming(u_id, streamInfo.l_code, l_title, l_description)
      );
      setShow(false);
    }
  };

  return (
    <>
      <Grid container style={{ marginTop: 100 }}>
        {/* 실시간 영상 */}
        <Grid item xs={10}>
          <video
            ref={videoRef}
            style={{ width: 1570, height: 600, marginLeft: 30 }}
            controls
          />
        </Grid>
        <Grid item xs={2}>
          <ChatContainer />
        </Grid>
        <div hidden={!show}>
          <Grid item className="modal-background" onClick={handleModalClose}>
            <Grid item className="modal-card">
              <p className="modal-item">
                방송제목:
                <input
                  className="modal-item"
                  type="text"
                  name="l_title"
                  value={l_title}
                  onChange={handleEditItem}
                ></input>
              </p>
              {isValid && <p className="modal-item">방송제목을 입력해주세요</p>}
              <p className="modal-item">
                방송설명:
                <input
                  className="modal-item"
                  type="text"
                  name="l_description"
                  value={l_description}
                  onChange={handleEditItem}
                ></input>
              </p>
              <input type="button" value="취소" />
              <input
                className="modal-item"
                type="button"
                value="완료"
                onClick={handleEdit}
              />
            </Grid>
          </Grid>
        </div>
        <Box sx={{ marginLeft:"30px", color:"white" }}>
          <Box>
            <h1>{streamInfo.u_id}님의 방송</h1>
          </Box>
          <Box>
            <h2> {streamInfo.l_title}</h2>
          </Box>
          <h3>  {streamInfo.l_description}</h3>
          <Box xs={{marginTop:"20px"}}>
            {u_id && u_id === streamInfo.u_id && (
              <>
                <Button variant="contained" className="button" onClick={offStreamingbtn} >
                  방송종료
                </Button>

                <Button variant="contained" className="button" onClick={handleModalOpen} style={{marginLeft:"20px"}}>
                  방송정보편집
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default StreamShow;
