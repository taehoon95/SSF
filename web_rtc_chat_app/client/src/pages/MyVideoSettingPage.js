// 내 영상 관리 페이지 (기능 : 영상 제목, 내용 변경, 영상 삭제 )

// 2021-11-18
// 윤성준
// 내 영상 관리 페이지 추가
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import Header from "../components/common/Header";
import Pagination from "./Pagination";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { deletevideo } from "../modules/videodelete";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 2px solid;
  border-bottom: 2px solid;
  background-color: rgba(0, 0, 0, 0.4);
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 6px 2px 0px 0px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

// 삭제모달
const styleModal2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  height: 80,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyVideoSettingPage = ({ history }) => {
  const u_id = localStorage.getItem("u_id");
  const [myList, setMyList] = useState([]);

  const dispatch = useDispatch();

  // 2021-12-01 윤성준 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5); // 한 페이지당 보여줄 게시물 수
  const [DeleteId, setDeleteId] = useState("");
  const [DeleteName, setDeleteName] = useState("");
  const [nextPagevalue, setNextPageValue] = useState("");
  const [open, setOpen] = useState(false);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const plusPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const nextbutton = () => {
    if (currentPage < Math.ceil(myList.length / 5)) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage === nextPagevalue) {
      return;
    }
  };
  const backbutton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOpen = (e) => {
    setDeleteId(u_id);
    setDeleteName(e.currentTarget.name);
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  useEffect(() => {
    setNextPageValue(currentPage);
    // console.log(nextPagevalue);
    // console.log(currentPage);
  }, [currentPage]);

  useEffect(() => {
    myVideoList();
  }, []);

  // VideoList 가져오기
  const myVideoList = () => {
    axios
      .get(`/api/videorecord/${u_id}`)
      //.get(`https://18.219.234.0:8080/api/videorecord/${u_id}`)
      .then((response) => {
        setMyList(response.data);
        // console.log(11111);
      })
      .catch((error) => {
        //alert("record 가져오기 실패");
        // console.log(error);
      });
  };

  // VideoList 삭제 handler
  const deleteListLine2 = (e) => {
    e.preventDefault();
    dispatch(deletevideo(DeleteId, DeleteName));
    myVideoList();
    setOpen(false);
  };

  //수정 버튼 시 pk 값 가져가기
  const onUpdate = (e) => {
    // alert(e.currentTarget.name);
    history.push(`/ListChangePage/${e.currentTarget.name}`);
  };

  return (
    <>
      <Header />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal2} align="center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom="50"
            style={{ fontFamily: "Noto Sans KR" }}
          >
            정말로 영상을 삭제하시겠습니까?
          </Typography>
          <br />
          <Button
            onClick={deleteListLine2}
            color={"primary"}
            type="submit"
            variant="contained"
          >
            삭제
          </Button>
          <Button
            onClick={handleClose}
            color={"primary"}
            type="submit"
            variant="contained"
            style={{ marginLeft: 30 }}
          >
            취소
          </Button>
        </Box>
      </Modal>
      <TableContainer style={{ marginTop: 65, background: "#303030" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography
                  variant="h5"
                  style={{ color: "white", fontFamily: "Noto Sans KR" }}
                >
                  이미지
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography
                  variant="h5"
                  style={{ color: "white", fontFamily: "Noto Sans KR" }}
                >
                  영상 제목
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography
                  variant="h5"
                  style={{ color: "white", fontFamily: "Noto Sans KR" }}
                >
                  등록 날짜
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography
                  variant="h5"
                  style={{ color: "white", fontFamily: "Noto Sans KR" }}
                >
                  조회수
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography
                  variant="h5"
                  style={{ color: "white", fontFamily: "Noto Sans KR" }}
                >
                  수정
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography
                  variant="h5"
                  style={{ color: "white", fontFamily: "Noto Sans KR" }}
                >
                  삭제
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {myList &&
            currentPosts(myList).map((data, idx) => (
              <TableBody style={{ borderColor: "gray" }}>
                <TableCell
                  style={{ borderColor: "gray" }}
                  align="center"
                  height="100"
                >
                  <Link
                    to={`/WatchPage2/${data.v_code}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={data.v_img}
                      width="200"
                      style={{ marginTop: 7 }}
                    />
                  </Link>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", borderColor: "gray" }}
                >
                  <Typography
                    component={Link}
                    to={`/WatchPage2/${data.v_code}`}
                    variant="h6"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "Noto Sans KR",
                    }}
                  >
                    {data.v_name}
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", borderColor: "gray" }}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white", fontFamily: "Noto Sans KR" }}
                  >
                    {data.v_date}
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", borderColor: "gray" }}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white", fontFamily: "Noto Sans KR" }}
                  >
                    {data.v_views} 회
                  </Typography>
                </TableCell>
                <TableCell style={{ borderColor: "gray" }} align="center">
                  <Button
                    type="button"
                    onClick={onUpdate}
                    variant="contained"
                    name={data.v_code}
                    color="primary"
                    style={{ fontFamily: "Noto Sans KR" }}
                  >
                    수정
                  </Button>
                </TableCell>
                <TableCell style={{ borderColor: "gray" }} align="center">
                  <Button
                    type="button"
                    name={data.v_code}
                    variant="contained"
                    color="secondary"
                    onClick={handleOpen}
                    style={{ fontFamily: "Noto Sans KR" }}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableBody>
            ))}
        </Table>
      </TableContainer>

      {/* {페이징} */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bottom: 0,
        }}
      >
        <PageUl
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontFamily: "Noto Sans KR",
          }}
        >
          <PageLi onClick={backbutton}>
            <PageSpan className="page-link">
              <NavigateBeforeIcon />
            </PageSpan>
          </PageLi>
        </PageUl>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={myList.length}
          paginate={setCurrentPage}
          myList={currentPosts(myList)}
          plusPage={plusPage}
        />
        <PageUl style={{ marginTop: 20, marginBottom: 20 }}>
          <PageLi onClick={nextbutton}>
            <PageSpan>
              <NavigateNextIcon />
            </PageSpan>
          </PageLi>
        </PageUl>
      </div>
    </>
  );
};

export default MyVideoSettingPage;
