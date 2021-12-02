/* 
20211115 이태훈 
비디오 보는 페이지 테스트중
*/

// 2021-11-22 강동하 WatchPage2 영상보기페이지 구현
// 로그인 구현 이후 useSelector 사용해서 로그인 정보 가져온 후 u_id value 변경
// 영상 링크 구현 이후 영상 정보 가져온 후 파라미터에 v_code로 변경

// 2021-11-23 강동하 댓글 select, insert 구현

// 2021-11-24 강동하 댓글 delete, update 구현
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Button,
  Grid,
  TextField,
  Modal,
  Box,
  Typography,
  Divider,
  makeStyles,
} from "../../node_modules/@material-ui/core/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  change,
  commentDelete_Action,
  commentInsert_Action,
  commentUpdate_Action,
} from "../modules/watchpage2";
import { useHistory } from "react-router";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import { CssTextField } from "../lib/styles/CssTextField";
import { useMediaQuery } from 'react-responsive'
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
// 댓글 로그인 권한 모달
const styleModal3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  //console.log(isDesktop);
  return isDesktop ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  //console.log(isMobile);
  return isMobile ? children : null
}

const WatchPage2 = (props) => {
  const dispatch = useDispatch();
  const { comment, comment_INSERT, comment_UPDATE, comment_DELETE } =
    useSelector((state) => ({
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

  // 로컬스토리지에서 ID 값 갖고오기
  const auth_Id = localStorage.getItem("u_id");
  const history = useHistory();
  // Modal
  // 1은 수정 2는 삭제 3은 로그인 권한
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
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
  const handleOpen3 = (e) => {
    setOpen3(true);
  };
  const handleClose3 = (e) => {
    setOpen3(false);
  };

  // 2021-11-25 강동하 영상 들어올 시 조회수 + 1
  // 최초 1회만
  useEffect(() => {
    axios.patch('/api/viewsinc', {v_code : props.match.params.v_code})
      .then(response => {
        console.log("조회수 증가" + response);
      })
      .catch(error => {
        console.log(error);
      })
  },[])

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
      .get(`/api/thisvideo/${props.match.params.v_code}`)
      //.get(`https://18.219.234.0:8080/api/thisvideo/${props.match.params.v_code}`)
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
    // console.log(e.currentTarget.id);
    // console.log(e.currentTarget.value);
    //console.log(e.currentTarget.style);
    
  };

  // 2021-11-23 강동하 댓글 insert
  const commentInsert = () => {
    console.log("댓글 작성");
    // 2021-11-24 강동하 로그인 id 값으로 댓글 구현 완
    comment !== ""
      ? dispatch(
          commentInsert_Action({ v_code, m_text: comment, u_id: auth_Id })
        )
      : alert("댓글을 입력해주세요.");
  };

  // 2021-11-23 강동하 댓글 select
  // 영상 링크 구현 이후 영상 정보 가져온 후 파라미터에 v_code로 변경
  const selectComment = () => {
    axios
      .get(`/api/commentselect/${props.match.params.v_code}`)
      //.get(`https://18.219.234.0:8080/api/commentselect/${props.match.params.v_code}`)
      .then((response) => {
        setCommentInfo(response.data);
        // let day = (new Date(response.data[0].m_date)).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        // console.log((new Date(response.data[0].m_date)).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}));
        
        //let a = day.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        //console.log(a);
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

  const login_Auth = () => {
    history.push("/LoginPage");
  };
  
  return (
    <>
    {/* 2021-11-30 강동하 css */}
    <Header />
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
            fullwidth="true"
            type="text"
            id="comment"
            value={`${changeUpdate}`}
          />
          <Button
            id={`${UpdateId}`}
            onClick={commentUpdate}
            color={'primary'}
            type="submit"
            variant="contained"
          >
            수정
          </Button>
          <Button
            id={`${UpdateId}`}
            onClick={handleClose}
            color={'primary'}
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
          </Typography>
          <br />
          <Button
            id={`${UpdateId}`}
            onClick={commentDelete}
            color={'primary'}
            type="submit"
            variant="contained"
          >
            삭제
          </Button>
          <Button
            id={`${UpdateId}`}
            onClick={handleClose2}
            color={'primary'}
            type="submit"
            variant="contained"
          >
            취소
          </Button>
        </Box>
      </Modal>

      {/* 비로그인 시 댓글 접근 Modal */}
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal3} align="center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom="50"
          >
            로그인 권한이 필요합니다.
            <br />
            로그인 페이지로 이동하시겠습니까?
          </Typography>
          <br />
          <Button
            id={`${UpdateId}`}
            onClick={login_Auth}
            color={'primary'}
            type="submit"
            variant="contained"
          >
            이동
          </Button>
          <Button
            id={`${UpdateId}`}
            onClick={handleClose3}
            color={'primary'}
            type="submit"
            variant="contained"
          >
            취소
          </Button>
        </Box>
      </Modal>

      {video !== 0 && (
        <Grid container style={{}}> 
        {/* 비디오 영상  */}
          <Grid item style={{ marginTop: '4%', marginLeft: '5%', marginBottom: '2%' }}>
            <Desktop>
            <video className='video' controls autoPlay loop muted style={{ width:'88vw', height:'80vh'}}>
              <source src={video[0].v_link} type="video/mp4"/>
            </video>
            </Desktop>
            <Mobile>
            <video className='video' controls autoPlay loop muted style={{ width:'88vw', height:'35vh'}}>
              <source src={video[0].v_link} type="video/mp4"/>
            </video>
            </Mobile>
          </Grid>

          {/* 상세정보 */}
          <Grid item style={{ marginLeft: '10%', width:'100vw', height: '100vh' }}>
            {/* 영상 제목 */}
            <Typography variant="h4" style={{ color: "white", marginBottom: 10 }}>
              {video[0].v_name}
            </Typography>

            {/* 올린 사람 */}
            <Typography variant="h5" style={{ color: "white" }}>{video[0].u_id}</Typography>

            {/* 영상 내용 */}
            <Typography style={{ color: "white" }}>{video[0].v_descript}</Typography>
            
            {/* 조회수 */}
            <Typography style={{ color: "white" }}>
              조회수 : {video[0].v_views}회
            </Typography>

            {/* 영상 업로드 일자 */}
            <Typography style={{ color: "white" }}>
              영상 업로드 일자 : {video[0].v_date}
            </Typography>

            <Divider variant="middle" style={{ width:'86%', background:'gray', marginBottom:20, marginTop: 20 }} />

            {comment_INSERT !== true &&
              (auth_Id === null ? (
                <>
                  <Grid>
                    <CssTextField
                      style={{
                        width: "80%",
                        height: "100%",
                        borderRadius: 3,
                        fontSize: 22,
                        padding:'2.5%',
                      }}
                      placeholder="로그인 후 이용해주세요."
                      fullwidth="true"
                      autoComplete='off'
                      autoFocus={false}
                      onClick={handleOpen3}
                      onChange={onChange}
                      value={""}
                    />
                    <Button
                      disabled={true}
                      onClick={commentInsert}
                      type="submit"
                      variant="contained"
                      style={{fontSize: 18, marginTop: '2%', color: '#4F4F5B'}}
                    >
                      댓글
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item style={{ marginBottom:20, marginRight: '5%' }} >
                  <Desktop>
                  <CssTextField
                    placeholder="댓글을 입력해주세요."
                    style={{
                      width: "80%",
                      height: "100%",
                      borderRadius: 3,
                      fontSize: 22,
                      padding:'2.5%',
                    }}
                    required
                    fullWidth
                    autoFocus={false}
                    id="comment"
                    autoComplete='false'
                    onChange={onChange}
                  />
                  </Desktop>
                  <Mobile>
                  <CssTextField
                    placeholder="댓글을 입력해주세요."
                    style={{
                      width: "70%",
                      height: "100%",
                      borderRadius: 3,
                      fontSize: 22,
                      padding:'2.5%',
                    }}
                    required
                    fullWidth
                    autoFocus={false}
                    id="comment"
                    autoComplete='false'
                    onChange={onChange}
                  />
                  </Mobile>
                    <Button
                      onClick={commentInsert}
                      type="submit"
                      variant="contained"
                      color={'primary'}
                      style={{fontSize: 18, marginTop: '2%'}}
                    >
                      댓글
                    </Button>
                  </Grid>
                </>
              ))}
             <Divider variant="middle" style={{ width:'86%', background:'gray', marginBottom:20}} />

            {commentSelectResult === 1 &&
              commentInfo.map((data, index) => (
                <Grid key={index} item style={{ marginBottom: 20}}>
                  <Typography variant="h6" style={{ color: "white" }}>{data.u_id}
                  {auth_Id === data.u_id &&
                  <>
                  <Button
                    id={`${data.m_num}`}
                    onClick={handleOpen}
                    type="submit"
                    //variant="contained"
                    value={data.m_text}
                    style={{color:"white", fontSize:17, marginLeft:20}}
                  >
                    수정
                  </Button>
                  <Button
                    id={`${data.m_num}`}
                    onClick={handleOpen2}
                    type="submit"
                    //variant="contained"
                    style={{color:"white", fontSize:17, marginLeft:5}}
                  >
                    삭제
                  </Button>
                  </>
                }
                </Typography>
                  <Typography style={{ color: "white", width: "75%"}}>{data.m_text}</Typography>
                  <Typography style={{ color: "white" }}>
                    {" "}
                    작성일 : {(new Date(data.m_date)).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})}
                  </Typography>

                  {/* <Button id={`${data.m_num}`} */}
                  
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default WatchPage2;
