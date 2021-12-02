// 2021-11-25
// 윤성준
// 검색기능 페이지 추가

// 2021-11-29 강동하 로딩 추가

import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Pagination from "../../pages/Pagination";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import { HelpOutline } from "../../../node_modules/@material-ui/icons/index";
import axios from "../../../node_modules/axios/index";

const SearchResultContainer = () => {
  const [selectList, setSelectList] = useState([]);
  const { v_name } = useParams();
  const [load, setLoad] = useState(0);

  // 2021-12-01 윤성준 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3); // 한 페이지당 보여줄 게시물 수

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  useEffect(() => {
    setLoad(0);
    myVideoList();
    console.log(v_name);
  }, [v_name]);

  // 검색 결과 가져오기
  const myVideoList = () => {
    axios
      .get(`/api/videoSearch/${v_name}`)
      .then((response) => {
        setSelectList(response.data);
        console.log(load);
        setLoad(1);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  return (
    <Grid
      container
      style={{ marginTop: 80, background: "#303030", postion: "relative" }}
      component={Paper}
    >
      <>
        {/* 2021-11-25 강동하 결과 없음 안뜨는 거 수정 */}
        {/* 2021-11-29 강동하 로딩 추가 */}
        {load === 0 ? (
          // 검색 로딩중일 때
          <Grid container>
            <Grid item>
              <Typography variant="h3" style={{ textAlign: "center" }}>
                검색중 입니다. <CircularProgress />{" "}
              </Typography>
            </Grid>
          </Grid>
        ) : selectList.length !== 0 ? (
          // 검색 결과 창
          currentPosts(selectList).map((data, idx) => (
            <Grid
              container
              component={Link}
              to={`/WatchPage2/${data.v_code}`}
              style={{
                textDecoration: "none",
                marginBottom: 10,
                marginLeft: 30,
              }}
            >
              <Grid item xs={4}>
                <Box>
                  <img src={data.v_img} width="100%" />
                </Box>
              </Grid>

              <Grid item xs={4} style={{ marginLeft: 10 }}>
                <Box style={{ width: "800px" }}>
                  <Typography variant="h5" style={{ color: "white" }}>
                    {data.v_name}
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_date}
                  </Typography>

                  <Typography variant="body1" style={{ color: "gray" }}>
                    조회수 {data.v_views} 회
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_descript}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <>
            {/* 검색 결과가 없을 경우 */}
            <Grid container>
              <Grid item xs={12}>
                <HelpOutline style={{ width: 300, height: 300 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">검색 결과가 없습니다.</Typography>
              </Grid>
            </Grid>
          </>
        )}
      </>
      {/* 페이징 */}
      <div style={{ width:'100%',display:'flex',justifyContent:'center' }}>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={selectList.length}
          paginate={setCurrentPage}
          myList={currentPosts(selectList)}
        ></Pagination>
      </div>
    </Grid>
  );
};

export default SearchResultContainer;
