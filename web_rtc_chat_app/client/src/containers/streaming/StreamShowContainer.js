import React, { useContext, useEffect, useRef, useState } from "react";
import flv from "flv.js";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  cut,
  deleteStreaming,
  showStreamingByLnum,
  updateStreaming,
} from "../../modules/streaming";
import "../../lib/styles/Modal.css";
import ChatContainer from "./ChatContainer";
import { SocketContext } from "../../SocketContext";
import { Grid } from "@mui/material";
import { Button, Box, IconButton } from "@material-ui/core";
// icon
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
// makeStyleHook
import { makeStyles } from "@material-ui/core/styles";
import { WhereToVote } from "../../../node_modules/@mui/icons-material/index";
import {
  TextField,
  Typography,
} from "../../../node_modules/@material-ui/core/index";

import Header from "../../components/common/Header";

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { Desktop, Mobile } from "../../pages/WatchPage2"


const useStyles = makeStyles({
  isChat: {
    color: "white",
  },
  button: {
    color: "white",
  },
});
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

  const { socketRef, viewers } = useContext(SocketContext);
  const { s_code } = useSelector((state) => ({
    s_code: state.streaming.streamRes.s_code,
  }));

  // 주소창으로 들어오면
  // 1. 방에 입장하는 것을 소켓에 알려주고
  // 2. l_code로 검색후 방정보들을 store에 저장
  // 3. buildPlayer로 방송 실행
  const usersocket = socketRef.id;
  useEffect(() => {
    setOffStreaming(false);
    socketRef.emit("clientJoinRoom", l_code, u_id, usersocket);
    dispatch(showStreamingByLnum(l_code));
    buildPlayer();
  }, [offStreaming]);
  
  useEffect(() => {
    setOffStreaming(false);
    socketRef.emit("clientJoinRoom", l_code, u_id, usersocket);
    dispatch(showStreamingByLnum(l_code));
    buildPlayer();
  }, [u_id]);

  // 방송 실행 메서드
  // 2021-12-03 강동하 방송 종료 시 s_code 전송
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
      dispatch(cut());
      setOffStreaming(true);
      return;
    } else {
      alert("방송종료를 취소 하셨습니다.");
      return;
    }
  };
  // 방송 나가기
  const exitStreamingbtn = () => {
    if (window.confirm(`이 방송에서 나가시겠습니까?`)) {
      socketRef.emit("exitRoom", socketRef.id, u_id, l_code);
      history.push("/");
      return;
    } else {
      alert("시청을 계속 합니다.");
      return;
    }
  };

  // 뒤로 가기 버튼 클릭 감지
  window.onpopstate = (e) => {
    socketRef.emit("exitRoom", socketRef.id, u_id, l_code);
  }

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
    // console.log(name);
    // console.log(isValid);

    if (name === "l_title" && value !== "") {
      setIsValid(false);
    } else if (name === "l_title" && value === "") {
      setIsValid(true);
    }
  };
  // 완료 클릭시
  const handleEdit = (e) => {
    if (l_title === "") {
      setIsValid(true);
    } else {
      dispatch(
        updateStreaming(u_id, streamInfo.l_code, l_title, l_description)
      );
      setShow(false);
    }
  };

  const classes = useStyles();
  // 채팅창 보였다 안보였다 설정
  const [isShowChat, setIsShowChat] = useState(false);
  const handleShowChat = () => {
    setIsShowChat(!isShowChat);
  };
  return (
    <>

    {/* 2021-12-06 강동하 반응형 */}
      <Header socket={socketRef} userid={u_id} l_code={l_code}/>
      <Desktop>
      <Grid container style={{ marginTop: 70 }}>
        {/* 실시간 영상 */}
        <Grid item xs={12} sm={9}>
          <video
            ref={videoRef}
            style={{ width: "95%", marginLeft: "30px" }}
            controls
          />
          <Box sx={{ marginLeft: "30px", color: "white", witdh:"100%"}} >
            <Box display="flex" justifyContent="space-between" width="98%" alignItems="center">

              <h1>
                {streamInfo.u_id}님의 방송                
                {isShowChat ? (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlineOutlinedIcon"
                  >
                    <ChatBubbleOutlineOutlinedIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlinedIcon"
                  >
                    <ChatBubbleOutlinedIcon />
                  </IconButton>
                )}                
              </h1>
              <Box display="flex" style={{ marginRight: 12 }} >
                <PeopleAltRoundedIcon style={{ marginRight: 5, marginTop: 6 }}/>
                <h3 style={{ marginTop: 4 }}>{viewers - 1}</h3>
              </Box>
            </Box>
            <Box>
              <h2> {streamInfo.l_title}</h2>
            </Box>
            <h3> {streamInfo.l_description}</h3>
            <Box sx={{ marginTop: "10px" }}>
              {u_id && u_id === streamInfo.u_id ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ExitToAppOutlinedIcon />}
                    className={classes.button}
                    onClick={offStreamingbtn}
                  >
                    방송종료
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<SettingsOutlinedIcon />}
                    className={classes.button}
                    onClick={handleModalOpen}
                    style={{ marginLeft: "20px" }}
                  >
                    방송정보편집
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ExitToAppOutlinedIcon />}
                  className={classes.button}
                  onClick={exitStreamingbtn}
                >
                  방송나가기
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          {!isShowChat && <ChatContainer />}
        </Grid>

        {/* 모달창 */}
        <div hidden={!show}>
          <Grid item className="modal-background">
            <Grid
              item
              className="modal-card"
              textAlign="center"
              style={{ textAlign: "center", marginTop: 300, marginLeft: "37%" }}
            >
              <Grid item>
                <Typography variant="h6">방송제목</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_title"
                  value={l_title}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
                {isValid && (
                  <Typography
                    variant="body2"
                    color="error"
                    className="modal-item"
                  >
                    방송제목을 입력해주세요
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h6">방송설명</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_description"
                  value={l_description}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
              </Grid>

              {/* 취소, 완료 버튼 */}
              <Grid item style={{ marginTop: 10, textAlign: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleModalClose}
                  style={{ width: "20%" }}
                >
                  취소
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleEdit}
                  style={{ marginLeft: 40, width: "20%" }}
                >
                  완료
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      </Desktop>
      <Mobile>
      <Grid container style={{ marginTop: 70 }}>
        {/* 실시간 영상 */}
        <Grid item xs={12} sm={9}>
          <video
            ref={videoRef}
            style={{ width: "95%", marginLeft: "2%", marginRight: "2%"}}
            controls
          />
          <Box sx={{ marginLeft: "30px", color: "white", witdh:"100%"}} >
            <Box display="flex" justifyContent="space-between" width="98%" alignItems="center">
              <h3>
                {streamInfo.u_id}님의 방송
                {isShowChat ? (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlineOutlinedIcon"
                  >
                    <ChatBubbleOutlineOutlinedIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleShowChat}
                    className={classes.isChat}
                    aria-label="ChatBubbleOutlinedIcon"
                  >
                    <ChatBubbleOutlinedIcon />
                  </IconButton>
                )}
              </h3>
              <Box display="flex" style={{ marginRight: 12 }} >
                <PeopleAltRoundedIcon style={{ marginRight: 5, marginTop: 6 }}/>
                <h4 style={{ marginTop: 4 }}>{viewers}</h4>
              </Box>
            </Box>
            <Box>
              <h4> {streamInfo.l_title}</h4>
            </Box>
            <h5> {streamInfo.l_description}</h5>
            <Box sx={{ marginTop: "10px" }}>
              {u_id && u_id === streamInfo.u_id ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ExitToAppOutlinedIcon />}
                    className={classes.button}
                    onClick={offStreamingbtn}
                  >
                    방송종료
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<SettingsOutlinedIcon />}
                    className={classes.button}
                    onClick={handleModalOpen}
                    style={{ marginLeft: "20px" }}
                  >
                    방송정보편집
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ExitToAppOutlinedIcon />}
                  className={classes.button}
                  onClick={exitStreamingbtn}
                >
                  방송나가기
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          {!isShowChat && <ChatContainer />}
        </Grid>

        {/* 모달창 */}
        <div hidden={!show}>
          <Grid item className="modal-background">
            <Grid
              item
              className="modal-card"
              textAlign="center"
              style={{ textAlign: "center", marginTop: 300, marginLeft: "37%" }}
            >
              <Grid item>
                <Typography variant="h6">방송제목</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_title"
                  value={l_title}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
                {isValid && (
                  <Typography
                    variant="body2"
                    color="error"
                    className="modal-item"
                  >
                    방송제목을 입력해주세요
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h6">방송설명</Typography>
                <TextField
                  variant="outlined"
                  className="modal-item"
                  name="l_description"
                  value={l_description}
                  onChange={handleEditItem}
                  style={{ width: 300 }}
                ></TextField>
              </Grid>

              {/* 취소, 완료 버튼 */}
              <Grid item style={{ marginTop: 10, textAlign: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleModalClose}
                  style={{ width: "20%" }}
                >
                  취소
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleEdit}
                  style={{ marginLeft: 40, width: "20%" }}
                >
                  완료
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      </Mobile>

    </>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
export default StreamShow;
