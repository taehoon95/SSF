import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { change, insertStreaming } from "../../modules/streaming";
import { nanoid } from "nanoid";
import { useHistory } from "react-router";
import { SocketContext } from "../../SocketContext";
import Container from "@mui/material/Container";
import { Typography } from "../../../node_modules/@material-ui/core/index";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

// 2021 1125 streaming 방만들기 이태훈
const CreateaStreamContainer = () => {
  const { socketRef } = useContext(SocketContext);
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
  const [isValidCheck, setIsValidCheck] = useState(false);

  const handleStreamInfo = (e) => {
    setStreamInfo({ ...streamInfo, [e.target.name]: e.target.value });
    setIsValidCheck(false);
    dispatch(change({ streamInfo }));
  };

  const createStreaming = () => {
    // 방만들기
    if (streamInfo.l_title === "") {
      setIsValidCheck(true);
      return;
    }
    if (window.confirm(`스트림키는 ${streamInfo.l_code}입니다.`)) {
      socketRef.emit("clientCreateRoom", streamInfo);
      dispatch(insertStreaming(streamInfo));
      history.push(`/WatchPage/${streamInfo.l_code}`);
    } else {
      alert("방만들기를 취소 하셨습니다.");
    }
  };

  return (
    <div>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          background: "#FFFFFF",
          borderRadius: 5,
          marginTop: 170,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>실시간 방 만들기</h2>
        <div>
          <p>방 제목</p>
          <TextField
            fullWidth
            name="l_title"
            onChange={handleStreamInfo}
            value={streamInfo.l_title}
          />
        </div>
        <div>
          {isValidCheck && (
            <label style={{ color: "red" }}>방 제목을 입력 해주세요</label>
          )}
        </div>
        <p style={{ marginTop: 20 }}>방 설명</p>
        <TextField
          name="l_description"
          onChange={handleStreamInfo}
          value={streamInfo.l_description}
          fullWidth
        />
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ marginTop: 30, marginBottom: 20 }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={createStreaming}
          >
            방만들기{" "}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateaStreamContainer;
