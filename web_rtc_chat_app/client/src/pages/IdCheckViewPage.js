//2021-11-23
//아이디 찾기 후 아이디 값 전달
//박진현
import React from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

const IdCheckViewrPage = () => {
  const { u_name, u_id, check, auth } = useSelector((state) => {
    return {
      u_id: state.auth.check.u_id,
      u_name: state.auth.u_name,
      u_email: state.auth.u_email,
    };
  });
  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            background: "#FFFFFF",
            borderRadius: 5,
            marginTop: 150,
            height: 400,
          }}
        >
          {/* <Box

          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: 8,
              display: "flex",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main" }}
              style={{ marginTop: 20 }}
            >
              <LockOutlined />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              style={{ marginTop: 20, color: "black" }}
            >
              아이디찾기
            </Typography>
            <Typography variant="h6" style={{ marginTop: 60 }}>
              {u_name} 님의 아이디는 {u_id} 입니다.
            </Typography>

            {/* 버튼 안먹어 ㅅㅂ */}
            <Box style={{ marginTop: 70 }}>
              <Button
                component={Link}
                to={"/LoginPage"}
                variant="contained"
                style={{ background: "gray", width: 190 }}
              >
                <Typography variant="h6">로그인</Typography>
              </Button>
              <Button
                component={Link}
                to={"/PwdCheckPage"}
                variant="contained"
                style={{ background: "gray", marginLeft: 10, width: 190 }}
              >
                <Typography variant="h6">비밀번호 찾기</Typography>
              </Button>
            </Box>

              <Button
                component={Link}
                to={"/"}
                variant="contained"
                style={{ background: "gray", width: 390, marginTop: 10 }}
              >
                <Typography variant="h6">홈으로 이동</Typography>
              </Button>

          </Box>
          {/* </Box> */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default IdCheckViewrPage;
