// 내 영상 관리 페이지 (기능 : 영상 제목, 내용 변경, 영상 삭제 )

// 2021-11-18
// 윤성준
// 내 영상 관리 페이지 추가

import { useState } from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "../../node_modules/@material-ui/core/index";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import faker from 'faker';

// faker는 더미 데이터 만드는 라이브러리임
faker.seed(123);

// 53페이지 만큼 배열 생성
const users = Array(53)
  .fill()
  .map(() => ({
    id: faker.random.uuid(),
    name: faker.name.lastName() + faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),

  }));

const MyVideoSettingPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  return (
    <>
      <Header />
      <TableContainer justify="center" align="center" style={{ marginTop: 65 }} component={Paper}>
        <Table  size="large">
          <TableHead >
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">썸네일</TableCell>
              <TableCell align="center">영상 제목</TableCell>
              <TableCell align="center">영상 길이</TableCell>
              <TableCell align="center">등록 날짜</TableCell>
              <TableCell align="center">조회수</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {users
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(({ id, name, email, phone }, i) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {page * rowsPerPage + i + 1}
                </TableCell>
              <TableCell align="center"><img src="http://artmug.kr/image/goods_img1/4731.jpg?ver=1563370523" width="150" height="100"/></TableCell>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center">{email}</TableCell>
              <TableCell align="center">{phone}</TableCell>
              <TableCell align="center">조회수</TableCell>
              <TableCell align="center">삭제</TableCell>
              </TableRow>
            ))}
        </TableBody>

          <TableFooter>
            <TableRow>
            <TablePagination
              count={users.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
              <TablePagination />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Footer />
    </>
  );
};

export default MyVideoSettingPage;
