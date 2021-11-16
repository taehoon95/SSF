//LoginContainer
//2021-11-15
//버튼 핸들러 정의
//2021-11-16
//로그인 UI 완성

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../modules/auth";
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

const LoginContainer = () => {
  const dispatch = useDispatch();

  const { id, password } = useSelector((state) => ({
    id: state.id,
    password: state.password,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(change({ name, value }));
    console.log(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log(122);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ background: "#303030", borderRadius: 5, marginTop: 150 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            style={{ marginTop: 20, color: "white" }}
          >
            로그인
          </Typography>

            <Grid container>
              <Grid item style={{ width:"100%" }}>
                <Typography variant="h6" style={{ color:"white", marginBottom:-15, marginTop:10 }}>아이디</Typography>
                <TextField
                  onChange={onChange}
                  style={{ background: "#FFFFFF", borderRadius: 3 }}
                  placeholder="  ID"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  id="id"
                  autoComplete="id"
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item style={{ marginTop:5, width:"100%" }}>
                <Typography variant="h6" style={{ color:"white" }}>비밀번호</Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="  Password"
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: -5 }}>
              <Grid item xs>
                {/* 비밀번호 찾는 페이지로 이동 할 링크 걸기 */}
                <Button
                  href="#"
                  variant="body2"
                  style={{ marginLeft: -15, color: "white" }}
                >
                  비밀번호 찾기
                </Button>
              </Grid>
              <Grid item>
                <Button
                  href="./RegisterPage"
                  variant="body2"
                  style={{ marginRight: -15, color: "white" }}
                >
                  회원가입
                </Button>
              </Grid>
            </Grid>
            <Button
              onClick={onClick}
              style={{ marginTop: 10, marginBottom: 40 }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
          </Box>
  
      </Container>
    </ThemeProvider>
  );
};

export default LoginContainer;
