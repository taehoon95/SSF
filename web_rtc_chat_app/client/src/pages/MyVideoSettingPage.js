// 내 영상 관리 페이지 (기능 : 영상 제목, 내용 변경, 영상 삭제 )

// 2021-11-18
// 윤성준
// 내 영상 관리 페이지 추가
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import Header from "../components/common/Header";
import { videorecord } from "../lib/api/videoRecord";
import Pagination from "./Pagination";

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
  padding: 5px 20px 5px 12px;
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

const MyVideoSettingPage = ({ history }) => {
  const u_id = localStorage.getItem("u_id");
  const [myList, setMyList] = useState([]);

  // 2021-12-01 윤성준 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5); // 한 페이지당 보여줄 게시물 수

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
    if (currentPage < Math.ceil(myList.length / 3)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const backbutton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
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
        console.log(11111);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };


  // VideoList 삭제
  const deleteListLine = (u_id, v_code) => {
    console.log(v_code);
    axios
      .post(`/api/videoDelete`, { u_id, v_code })
      //.post(`https://18.219.234.0:8080/api/videoDelete`, { u_id, v_code})
      .then((response) => {
        console.log(response);
        // videorecord(u_id)
        myVideoList();
        alert(`${v_code}가 삭제되었습니다.`);
      })
      .catch((error) => {
        alert("삭제 실패");
        console.log(error);
      });
  };

  // VideoList 삭제
  const deleteListLine2 = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.name);
    deleteListLine(u_id, e.currentTarget.name);
  };

  //수정 버튼 시 pk 값 가져가기
  const onUpdate = (e) => {
    alert(e.currentTarget.name);
    history.push(`/ListChangePage/${e.currentTarget.name}`);
  };

  return (
    <>
      <Header />
      <TableContainer style={{ marginTop: 65, background: "#303030" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">
                <Typography variant="h5" style={{ color: "white" }}>
                  코드번호
                </Typography>
              </TableCell> */}
              <TableCell align="center">
                <Typography variant="h5" style={{ color: "white" }}>
                  이미지
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  영상 제목
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  등록 날짜
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  조회수
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  수정
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  삭제
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {currentPosts(myList).map((data, idx) => (
            <TableBody style={{ borderColor: "gray" }} >
              {/* <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h6" style={{ color: "white" }}>
                  {data.v_code}
                </Typography>
              </TableCell> */}
              <TableCell style={{ borderColor: "gray" }} align="center" height="100">
                <Link
                  to={`/WatchPage2/${data.v_code}`}
                  style={{ textDecoration: "none" }}
                >
                  <img src={data.v_img}  width="200" />
                </Link>
              </TableCell>
              <TableCell align="center" style={{ color: "white", borderColor: "gray"  }}>
                <Typography
                  component={Link}
                  to={`/WatchPage2/${data.v_code}`}
                  variant="h6"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {data.v_name}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white", borderColor: "gray"  }}>
                <Typography variant="h6" style={{ color: "white" }}>
                  {data.v_date}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white", borderColor: "gray"  }}>
                <Typography variant="h6" style={{ color: "white" }}>
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
                >
                  수정
                </Button>

                {/* <input type="button" onClick={onUpdate} value="수정" name={data.v_code} /> */}
              </TableCell>
              <TableCell style={{ borderColor: "gray" }} align="center">
                <Button
                  type="button"
                  onClick={deleteListLine2}
                  name={data.v_code}
                  variant="contained"
                  color="secondary"
                >
                  삭제
                </Button>
              </TableCell>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
      
      {/* {페이징} */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <PageUl style={{ marginTop: 20, marginBottom: 20 }}>
          {currentPage > 1 && (
            <PageLi onClick={backbutton}>
              <PageSpan className="page-link">prev</PageSpan>
            </PageLi>
          )}
        </PageUl>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={myList.length}
          paginate={setCurrentPage}
          myList={currentPosts(myList)}
          plusPage={plusPage}
        />
        <PageUl style={{ marginTop: 20, marginBottom: 20 }}>
          {currentPage < 2 && (
            <PageLi onClick={nextbutton}>
              <PageSpan>next</PageSpan>
            </PageLi>
          )}
        </PageUl>
      </div>
    </>
  );
};

export default MyVideoSettingPage;
