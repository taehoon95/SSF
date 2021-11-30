// 2021-11-25
// 윤성준
// 검색기능 페이지 추가

import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
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
} from "../../../node_modules/@material-ui/core/index";
import { HelpOutline } from "../../../node_modules/@material-ui/icons/index";
import axios from "../../../node_modules/axios/index";

const SearchResultContainer = () => {
  const [selectList, setSelectList] = useState("");
  const { v_name } = useParams();

  useEffect(() => {
    myVideoList();
    console.log(v_name);
  }, [v_name]);

  console.log("----------------");
  console.log(selectList);
  console.log("----------------");
  console.log(setSelectList);
  console.log("----------------");

  // 검색 결과 가져오기
  const myVideoList = () => {
    axios
      .get(`/api/videoSearch/${v_name}`)
      .then((response) => {
        setSelectList(response.data);
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
          {selectList.length !== 0 ? (
            selectList.map((data, idx) => (
              <TableBody>
                <TableCell align="center">{data.v_code}</TableCell>
                <TableCell align="center">
                  <Link to={`/WatchPage2/${data.v_code}`}>
                    <video src={data.v_link} width="300" height="220" />
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" style={{ color: "white" }}>
                    <Link to={`/WatchPage2/${data.v_code}`}>{data.v_name}</Link>
                  </Typography>
                </TableCell>
                <TableCell align="center">{data.v_date}</TableCell>
                <TableCell align="center">{data.v_views}</TableCell>
              </TableBody>
            ))
          ) : (
            <>
              <Grid
                container
                alignItems="center"
                align="center"
                justifyContent="center"
                style={{ height: 690, marginLeft: 250 }}
              >
                <Grid item xs={12} style={{ marginTop: 120 }}>
                  <HelpOutline style={{ width: 300, height: 300 }} />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 200 }}>
                  <Typography variant="h3">검색 결과가 없습니다.</Typography>
                </Grid>
              </Grid>
            </>
          )}
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
