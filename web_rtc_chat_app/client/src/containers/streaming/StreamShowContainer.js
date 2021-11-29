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
import ChatContainer from "./ChatContainer";

// 2021 1125 이태훈 streaming show page
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
    if (window.confirm(`스트림키는 ${streamInfo.l_code}입니다.`)) {
      dispatch(deleteStreaming(u_id, l_code));
      history.push("/");
    } else {
      alert("방송종료를 취소 하셨습니다.");
    }
    setOffStreaming(true);
  };

  // 방설정 편집
  const [l_title, setL_title] = useState("");
  const [l_description, setL_description] = useState("");
  // 모달창 show
  const [show, setShow] = useState(false);

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
  };
  // 완료 클릭시
  const handleEdit = () => {
    dispatch(updateStreaming(u_id, streamInfo.l_code, l_title, l_description));
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: "70%" }} controls />
      <div>
        <div hidden={!show}>
          <div className="modal-background" onClick={handleModalClose}>
            <div className="modal-card">
              <p className="modal-item">
                방송제목:{" "}
                <input
                  className="modal-item"
                  type="text"
                  name="l_title"
                  value={l_title}
                  onChange={handleEditItem}
                ></input>
              </p>
              <p className="modal-item">
                방송설명:{" "}
                <input
                  className="modal-item"
                  type="text"
                  name="l_description"
                  value={l_description}
                  onChange={handleEditItem}
                ></input>
              </p>
              <input type="button" value="취소" />
              <input type="button" value="완료" onClick={handleEdit} />
            </div>
          </div>
        </div>
        {u_id && u_id === streamInfo.u_id && (
          <>
            <input
              className="button"
              type="button"
              value="방송종료"
              onClick={offStreamingbtn}
            />
            <button className="button" onClick={handleModalOpen}>
              방송정보편집
            </button>
          </>
        )}
        <h1>{streamInfo.l_title}</h1>
        <h3>{streamInfo.l_description}</h3>
        <ChatContainer />
      </div>
    </div>
  );
};

export default StreamShow;
