// 내 영상 관리 페이지 (기능 : 영상 제목, 내용 변경, 영상 삭제 )

// 2021-11-18
// 윤성준
// 내 영상 관리 페이지 추가
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import { Link } from "react-router-dom";
import {
  Button,
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
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const MyVideoSettingPage = ({ history }) => {
  const u_id = localStorage.getItem("u_id");
  const [myList, setMyList] = useState([]);

  // pagination 시작
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10); // 한 페이지당 보여줄 게시물 수

  // const indexOfLast = currentPage * postsPerPage;
  // const indexOfFirst = indexOfLast - postsPerPage;
  // function currentPosts(tmp) {
  //   let currentPosts = 0;
  //   currentPosts = tmp.slice(indexOfFirst, indexOfLast);
  //   return currentPosts;
  // }

  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };








  // pagination 끝

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

  const deleteListLine = (u_id, v_code) => {
    console.log(v_code);
    axios
      .post(`/api/videoDelete`, { u_id, v_code })
      //.post(`https://18.219.234.0:8080/api/videoDelete`, { u_id, v_code})
      .then((response) => {
        console.log(response);
        // videorecord(u_id)
        myVideoList();
        alert("삭제 성공");
      })
      .catch((error) => {
        alert("삭제 실패");
        console.log(error);
      });
  };

  // VideoList 삭제
  const deleteListLine2 = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    // deleteListLine(u_id,e.target.name);
    deleteListLine(u_id, e.target.name);
  };

  //수정 버튼 시 pk 값 가져가기
  const onUpdate = (e) => {
    alert(e.currentTarget.name);
    history.push(`/ListChangePage/${e.currentTarget.name}`);
  };

  return (
    <>
      <Header />
      <TableContainer
        style={{ marginTop: 65, background: "#303030" }}
        component={Paper}
      >
        <Table size="large">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5" style={{ color: "white" }}>
                  코드번호
                </Typography>
              </TableCell>
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

          {myList.map((data, idx) => (
            <TableBody>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h6" style={{ color: "white" }}>
                  {data.v_code}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Link
                  to={`/WatchPage2/${data.v_code}`}
                  style={{ textDecoration: "none" }}
                >
                  <img src={data.v_img} width="350" height="230" />
                </Link>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h6" style={{ color: "white" }}>
                  <Link
                    to={`/WatchPage2/${data.v_code}`}
                    style={{ textDecoration: "none" }}
                  >
                    {data.v_name}
                  </Link>
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h6" style={{ color: "white" }}>
                  {data.v_date}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <Typography variant="h6" style={{ color: "white" }}>
                  {data.v_views}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Button
                  type="button"
                  onClick={onUpdate}
                  variant="contained"
                  name={data.v_code}
                >
                  수정
                </Button>

                {/* <input type="button" onClick={onUpdate} value="수정" name={data.v_code} /> */}
              </TableCell>
              <TableCell align="center">
                <Button
                  type="button"
                  onClick={deleteListLine2}
                  name={data.v_code}
                  variant="contained"
                >
                  삭제
                </Button>
              </TableCell>
            </TableBody>
          ))}

          <TableFooter>
            <TableRow>
              <Pagination
                activePage={page}
                itemsCountPerPage={10}
                // totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
                // activePage: 현재 페이지
                // itemsCountPerPage: 한 페이지당 보여줄 리스트 아이템의 개수
                // totalItemsCount: 총 아이템의 개수
                // pageRangeDisplayed: Paginator 내에서 보여줄 페이지의 범위
                // prevPageText: "이전"을 나타낼 텍스트 (prev, <, ...)
                // nextPageText: "다음"을 나타낼 텍스트 (next, >, ...)
                // onChange: 페이지가 바뀔 때 핸들링해줄 함수
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Footer />
    </>
  );
};

export default MyVideoSettingPage;
