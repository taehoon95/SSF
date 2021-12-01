// 2021-11-25
// 윤성준
// 검색기능 페이지 추가

// 2021-11-29 강동하 로딩 추가

import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
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
} from "../../../node_modules/@material-ui/core/index";
import { HelpOutline } from "../../../node_modules/@material-ui/icons/index";
import axios from "../../../node_modules/axios/index";
const SearchResultContainer = () => {
  const [selectList, setSelectList] = useState("");
  const { v_name } = useParams();
  const [load, setLoad] = useState(0);
  useEffect(() => {
    setLoad(0);
    myVideoList();
    console.log(v_name);
  }, [v_name]);

  //console.log("----------------");
  //console.log(selectList);
  //console.log("----------------");
  //console.log(setSelectList);
  //console.log("----------------");

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
    <TableContainer style={{ marginTop: 65 }} component={Paper}>
      <Table size="small">
        <>
        {/* 2021-11-25 강동하 결과 없음 안뜨는 거 수정 */}
        {/* 2021-11-29 강동하 로딩 추가 */}
        {load === 0 ? 
        <Grid item xs={12}>
          <Typography variant="h3" style={{textAlign: 'center'}}>검색중 입니다. <CircularProgress /> </Typography>
        </Grid>
        :
          (selectList.length !== 0) ? (
            selectList.map((data, idx) => (
              <Link to={`/WatchPage2/${data.v_code}`}>
                <TableBody>
                  <TableCell>{data.v_code}</TableCell>
                  <TableCell>
                    <video src={data.v_link} width="220" height="150" />
                  </TableCell>
                  <TableCell>{data.v_name}</TableCell>
                  <TableCell>{data.v_date}</TableCell>
                  <TableCell>{data.v_views}</TableCell>
                </TableBody>
              </Link>
            ))
          ) : (
            <>
              <Grid item xs={12}>
                <HelpOutline style={{ width: 300, height: 300 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">검색 결과가 없습니다.</Typography>
              </Grid>
            </>
          )
        }
        </>
        <TableFooter>
          <TableRow>
            <TablePagination
            // count={users.length}
            // page={page}
            // rowsPerPage={rowsPerPage}
            // onChangePage={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default SearchResultContainer;
