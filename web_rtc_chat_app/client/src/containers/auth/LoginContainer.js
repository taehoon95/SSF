//LoginContainer
//2021-11-15
//버튼 핸들러 정의
//2021-11-16
//로그인 UI 완성
//2021-11-18
//로그인 기능구현

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, login } from "../../modules/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Container from "@mui/material/Container";
import { LockOutlined } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { check } from "../../modules/users";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const LoginContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { u_id, u_pwd, auth, authError } = useSelector((state) => {
    return {
      u_id: state.auth.u_id,
      u_pwd: state.auth.u_pwd,
      auth: state.auth.auth,
      authError: state.auth.authError,
    };
  });

  // input text 체인지
  const onChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      change({
        name,
        value,
      })
    );
  };

  // 사가 핸들러
  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        u_id,
        u_pwd,
      })
    );
  };

  useEffect(() => {
    if (authError) {
      setError("로그인 실패");
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (auth) {
      console.log(auth);
      history.push("/");
      try {
        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("u_id", auth.u_id);
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [history, auth]);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          background: "#FFFFFF",
          borderRadius: 5,
          marginTop: 150, 
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

        {/* 자물쇠 버튼 아이콘 */}
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

          {/* 로그인 글자  */}
          <Typography
            component="h1"
            variant="h4"
            style={{ marginTop: 20, color: "black" }}
          >
            로그인
          </Typography>
        </Box>

        <form
          onSubmit={onsubmit}
          // component="main"
          // maxWidth="xs"
          // style={{ background: "#303030", borderRadius: 5, marginTop: 150 }}
        >
          <Grid container>
            <Grid item style={{ width: "100%" }}>
              {/* 아이디 글자 */}
              <Typography
                variant="h6"
                style={{ color: "black", marginBottom: -15, marginTop: 10 }}
              >
                아이디
              </Typography>

              {/* 아이디 입력 칸 */}
              <TextField
                onChange={onChange}
                style={{ background: "#FFFFFF", borderRadius: 3 }}
                placeholder="  ID"
                margin="normal"
                required
                fullWidth
                autoFocus
                name="u_id"
                id="u_id"
                autoComplete="id"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              {/* 비밀번호 글자 */}
              <Typography variant="h6" style={{ color: "black" }}>
                비밀번호
              </Typography>

              {/* 비밀번호 입력 칸 */}
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
                id="u_pwd"
                name="u_pwd"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: -5 }}>
            <Grid item xs>
              {/*아이디 찾기*/}
              <Button
                href="#"
                variant="body2"
                style={{ marginLeft: -15, color: "black" }}
              >
                아이디
              </Button>
              {/* 비밀번호 찾는 페이지로 이동 할 링크 걸기 */}
              <Button
                href="#"
                variant="body2"
                style={{ marginLeft: -15, color: "black" }}
              >
                비밀번호 찾기
              </Button>
            </Grid>
            <Grid item>
              <Button
                href="./RegisterPage"
                variant="body2"
                style={{ marginRight: -15, color: "black" }}
              >
                회원가입
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <Grid item>
              <Typography variant="22">
                <span>{error}</span>
              </Typography>
            </Grid>
          </Grid>

          <Button
            style={{ marginTop: 10, marginBottom: 40 }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onsubmit}
          >
            로그인
          </Button>
        </form>

        {/* </Box> */}
      </Container>
    </ThemeProvider>
  );
};

export default withRouter(LoginContainer);
