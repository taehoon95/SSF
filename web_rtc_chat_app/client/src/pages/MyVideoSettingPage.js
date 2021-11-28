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
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import { deleteListLine } from "../lib/api/videoRecord";

const MyVideoSettingPage = () => {
  const u_id = localStorage.getItem("u_id");
  const [myList, setMyList] = useState([]);

  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    myVideoList();
  }, [myList]);

  // VideoList 가져오기
  const myVideoList = () => {
    axios
      .get(`/api/videorecord/${u_id}`)
      //.get(`https://18.219.234.0:8080/api/videorecord/${u_id}`)
      .then((response) => {
        setMyList(response.data);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  // VideoList 삭제
  const deleteListLine2 = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    deleteListLine(e.target.name);
  };

  return (
    <>
      <TableContainer style={{ marginTop: 65 }} component={Paper}>
        <Table size="large">
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">번호</TableCell> */}
              <TableCell align="center">썸네일</TableCell>
              <TableCell align="center">영상 제목</TableCell>
              <TableCell align="center">등록 날짜</TableCell>
              <TableCell align="center">조회수</TableCell>
              <TableCell align="center">수정</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>

          {myList.map((data, idx) => (
            <TableBody>
              {/* <TableCell>{data.v_code}</TableCell> */}
              <TableCell>
                <img src={data.v_img} width="350" height="230" />
              </TableCell>
              <TableCell>{data.v_name}</TableCell>
              <TableCell>{data.v_date}</TableCell>
              <TableCell>{data.v_views}</TableCell>
              <TableCell align="center">
                <Link to="./ListChangePage">수정</Link>
              </TableCell>
              <TableCell align="center">
                <input
                  type="button"
                  onClick={deleteListLine2}
                  value="삭제"
                  name={data.v_code}
                />
              </TableCell>
            </TableBody>
          ))}

          <TableFooter>
            <TableRow>
              <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyVideoSettingPage;
