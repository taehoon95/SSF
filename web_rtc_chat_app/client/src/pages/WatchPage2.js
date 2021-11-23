/* 
20211115 이태훈 
비디오 보는 페이지 테스트중
*/

// 2021-11-22 강동하 WatchPage2 영상보기페이지 구현
// 로그인 구현 이후 useSelector 사용해서 로그인 정보 가져온 후 u_id value 변경
// 영상 링크 구현 이후 영상 정보 가져온 후 파라미터에 v_code로 변경

import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
} from "../../node_modules/@material-ui/core/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { change, commentInsert_Action } from "../modules/watchpage2";

const WatchPage2 = () => {
  const dispatch = useDispatch();
  const { comment, commentInsert_Ation, commentInsert_AtionError } =
    useSelector((state) => ({
      comment: state.watchpage2.comment,
      commentInsert_Ation: state.watchpage2.commentInsert_Ation,
      commentInsert_AtionError: state.watchpage2.commentInsert_AtionError,
    }));

  const cdn = "https://d3lafl73dhs1s7.cloudfront.net/";

  const [video, setVideo] = useState(0);
  const [v_code, setV_code] = useState("");
  const [commentResult, setCommentResult] = useState(0);
  const [commentSelectResult, setCommentSelectResult] = useState(0);
  const [commentInfo, setCommentInfo] = useState([]);

  // state 가 갱신되었을때 alert 출력 후 리렌더링
  useEffect(() => {
    selectVideo();
    selectComment();
    commentResult === 1 && alert("댓글이 작성되었습니다.");
    setCommentResult(0);
  }, [commentResult]);

  // 댓글이 성공적으로 달리면 state 갱신
  useEffect(() => {
    commentInsert_Ation !== "" && setCommentResult(1);
  }, [commentInsert_Ation]);

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
        setCommentSelectResult(1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
              조회수 {video[0].v_views}회
            </label>
            <p />
            <label style={{ color: "black" }}>
              영상 업로드 일자 {video[0].v_date}
            </label>
            <hr color="#000000" style={{ marginTop: 20 }} />
            {commentResult === 0 && (
              <>
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
              </>
            )}
            <hr color="#000000" style={{ marginTop: 20 }} />
            {commentSelectResult === 1 && (commentInfo.map( (data, index) => 
              <Grid key={index} item style={{ marginBottom: 20 }}>
                <label style={{ color: "black" }}>{data.u_id} : </label>
                <label style={{ color: "black" }}>{data.m_text}</label>
                <label style={{ color: "black" }}> 작성일 : {data.m_date}</label>
              </Grid>
              ))
            }
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default WatchPage2;
