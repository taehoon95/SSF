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
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
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
  }, []);

  // VideoList 가져오기
  const myVideoList = () => {
    axios
      .get(`/api/videorecord/${u_id}`)
      //.get(`https://18.219.234.0:8080/api/videorecord/${u_id}`)
      .then((response) => {
        setMyList(response.data);
        console.log(11111)
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  const deleteListLine = ( u_id, v_code ) => {
    console.log(v_code);
    axios
    .post(`/api/videoDelete`, { u_id, v_code})
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
  }

  // VideoList 삭제
  const deleteListLine2 = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    // deleteListLine(u_id,e.target.name);
    deleteListLine(u_id,e.target.name);
  };

  //수정 버튼 시 pk 값 가져가기
  const onUpdate = e =>{
     alert(e.target.name)
     history.push(`/ListChangePage/${e.target.name}`)
  }

  return (
    <>
    <Header />
      <TableContainer style={{ marginTop: 65 }} component={Paper}>
        <Table size="large">
          <TableHead>
            <TableRow>
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
              <TableCell>
                <img src={data.v_img} width="350" height="230" />
              </TableCell>
              <TableCell>{data.v_name}</TableCell>
              <TableCell>{data.v_date}</TableCell>
              <TableCell>{data.v_views}</TableCell>
              <TableCell align="center">

//                 <Button 
//                   component={Link}
//                   to={"/ListChangePage"}
//                   variant="outlined"
//                 >
//                   수정
//                   </Button>

              <input type="button" onClick={onUpdate} value="수정" name={data.v_code} />

              </TableCell>
              <TableCell align="center">
                <Button
                  type="button"
                  onClick={deleteListLine2}
                  name={data.v_code}
                  variant="outlined"
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
      <Footer />
    </>
  );
};

export default MyVideoSettingPage;
