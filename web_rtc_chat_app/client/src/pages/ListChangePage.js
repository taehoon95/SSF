import React from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../node_modules/@material-ui/core/index";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const ListChangePage = () => {
  return (
    <>
    <Header />
      <TableContainer style={{ marginTop: 65 }} component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell align="center">영상 업로드</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableCell align="left">
                제목 :
            </TableCell>
            <TableCell align="left">
                내용 :
            </TableCell>
            <TableCell align="left">
                
            </TableCell>
        </TableBody>
      </TableContainer>
      <Footer />
    </>
  );
};

export default ListChangePage;
