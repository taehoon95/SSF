/* 
20211115 이태훈 
비디오 보는 페이지 테스트중
*/

// 2021-11-22 강동하 WatchPage2 영상보기페이지 구현
// 로그인 구현 이후 useSelector 사용해서 로그인 정보 가져온 후 u_id value 변경
// 영상 링크 구현 이후 영상 정보 가져온 후 파라미터에 v_code로 변경

// 2021-11-23 강동하 댓글 select, insert 구현

// 2021-11-24 강동하 댓글 delete, update 구현
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Modal,
  Box,
  Typography,
} from "../../node_modules/@material-ui/core/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  change,
  commentDelete_Action,
  commentInsert_Action,
  commentUpdate_Action,
} from "../modules/watchpage2";
// 수정모달
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 150,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// 삭제모달
const styleModal2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WatchPage2 = () => {
  const dispatch = useDispatch();
  const {
    comment,
    comment_INSERT,
    comment_UPDATE,
    comment_DELETE,
  } = useSelector((state) => ({
    comment: state.watchpage2.comment,
    comment_INSERT: state.loading.comment_INSERT,
    comment_UPDATE: state.loading.comment_UPDATE,
    comment_DELETE: state.loading.comment_DELETE,
  }));

  //const cdn = "https://d3lafl73dhs1s7.cloudfront.net/";

  const [video, setVideo] = useState(0);
  const [v_code, setV_code] = useState("");
  const [commentSelectResult, setCommentSelectResult] = useState(0);
  const [commentInfo, setCommentInfo] = useState([]);
  const [changeUpdate, setChangeUpdate] = useState("");
  const [UpdateId, setUpdateId] = useState("");

  // Modal
  // 1은 수정 2는 삭제
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = (e) => {
    setChangeUpdate(e.currentTarget.value);
    setUpdateId(e.currentTarget.id);
    setOpen(true);
  };
  const handleClose = (e) => {
    setChangeUpdate("");
    setOpen(false);
  };
  const handleOpen2 = (e) => {
    setUpdateId(e.currentTarget.id);
    setOpen2(true);
  };
  const handleClose2 = (e) => {
    setOpen2(false);
  };

  // state 가 갱신되었을때 alert 출력 후 리렌더링
  useEffect(() => {
    selectVideo();
    selectComment();
    comment_INSERT === true && alert("댓글이 작성되었습니다.");
    comment_UPDATE === true && alert("댓글이 수정되었습니다.");
    comment_DELETE === true && alert("댓글이 삭제되었습니다.");
  }, [comment_INSERT, comment_UPDATE, comment_DELETE]);

  // 영상 링크 구현 이후 영상 정보 가져온 후 파라미터에 v_code로 변경
  const selectVideo = () => {
    axios
      .get(`/api/thisvideo/avi01`)
      .then((response) => {
        console.log(response.data);
        setVideo(response.data);
        setV_code(response.data[0].v_code);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setChangeUpdate(value);
    dispatch(change({ id, value }));
  };

  // 2021-11-23 강동하 댓글 insert
  const commentInsert = () => {
    console.log("댓글 작성");
    // 로그인 구현 이후 useSelector 사용해서 로그인 정보 가져온 후 u_id value 변경
    dispatch(commentInsert_Action({ v_code, m_text: comment, u_id: "kang97" }));
  };

  // 2021-11-23 강동하 댓글 select
  // 영상 링크 구현 이후 영상 정보 가져온 후 파라미터에 v_code로 변경
  const selectComment = () => {
    axios
      .get(`/api/commentselect/avi01`)
      .then((response) => {
        setCommentInfo(response.data);
        console.log(response.data);
        setCommentSelectResult(1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 2021-11-23 강동하 댓글 update
  const commentUpdate = (e) => {
    const { id } = e.currentTarget;
    dispatch(commentUpdate_Action({ m_num: id, m_text: comment }));
    setOpen(false);
  };

  // 2021-11-23 강동하 댓글 delete
  const commentDelete = (e) => {
    const { id } = e.currentTarget;
    // const { id } = e.target;
    dispatch(commentDelete_Action({ m_num: id }));
    setOpen2(false);
  };

  return (
    <>
      {/* 댓글 수정 Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom="50"
          >
            댓글 수정
          </Typography>
          <p />
          <Typography
            id="modal-modal-subtitle"
            variant="h6"
            component="h4"
            marginBottom="50"
          >
            댓글을 입력하세요.
          </Typography>
          <p />
          <TextField
            //onKeyUp={onKeyUpEmailCheck}
            style={{
              background: "#FFFFFF",
              marginTop: 2,
              borderRadius: 3,
            }}
            onChange={onChange}
            margin="normal"
            required
            fullWidth
            type="text"
            id="comment"
            value={`${changeUpdate}`}
          />
          <Button
            id={`${UpdateId}`}
            onClick={commentUpdate}
            type="submit"
            variant="contained"
          >
            수정
          </Button>
          <Button
            id={`${UpdateId}`}
            onClick={handleClose}
            type="submit"
            variant="contained"
          >
            취소
          </Button>
        </Box>
      </Modal>
      {/* 댓글 삭제 Modal */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal2} align="center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom="50"
          >
            정말로 댓글을 삭제하시겠습니까?
          </Typography><br/>
          <Button
            id={`${UpdateId}`}
            onClick={commentDelete}
            type="submit"
            variant="contained"
          >
            삭제
          </Button>
          <Button
            id={`${UpdateId}`}
            onClick={handleClose2}
            type="submit"
            variant="contained"
          >
            취소
          </Button>
        </Box>
      </Modal>

      {video !== 0 && (
        <Grid container style={{ marginTop: 80, marginLeft: 120 }}>
          <Grid item style={{ marginBottom: 20 }}>
            <video controls autoPlay loop muted>
              <source src={video[0].v_link} type="video/mp4" />
            </video>
          </Grid>
          <Grid item xs={12} style={{ marginRight: 640 }}>
            <h2 style={{ color: "black", marginBottom: 10 }}>
              {video[0].v_name}
            </h2>
            <label style={{ color: "black" }}>{video[0].v_descript}</label>
            <p />
            <label style={{ color: "black" }}>
              조회수 : {video[0].v_views}회
            </label>
            <p />
            <label style={{ color: "black" }}>
              영상 업로드 일자 : {video[0].v_date}
            </label>
            <hr color="#000000" style={{ marginTop: 20 }} />
                <Grid item>
                  <TextField
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 3,
                      padding: 8,
                    }}
                    placeholder="댓글을 작성해주세요."
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    id="comment"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={1} style={{ marginTop: 10 }}>
                  <Button
                    onClick={commentInsert}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    댓글
                  </Button>
                </Grid>

            <hr color="#000000" style={{ marginTop: 20, marginBottom: 20 }} />
              </>
            )}


            {commentSelectResult === 1 &&
              commentInfo.map((data, index) => (
                <Grid key={index} item style={{ marginBottom: 20 }}>
                  <label style={{ color: "black" }}>{data.u_id} : </label>
                  <label style={{ color: "black" }}>{data.m_text}</label>
                  <label style={{ color: "black" }}>
                    {" "}
                    작성일 : {data.m_date}
                  </label>

                  {/* <Button id={`${data.m_num}`} */}
                  <Button
                    id={`${data.m_num}`}
                    onClick={handleOpen}
                    type="submit"
                    variant="contained"
                    value={data.m_text}
                  >
                    수정
                  </Button>
                  <Button
                    id={`${data.m_num}`}
                    onClick={handleOpen2}
                    type="submit"
                    variant="contained"
                  >
                    삭제
                  </Button>

                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default WatchPage2;
