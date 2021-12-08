//2021-11-24
//비밀번호 변경 페이지
//박진현

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { change, pwdupdatecheck } from "../../modules/auth";
import { withRouter } from "react-router";
import Button from "@mui/material/Button";
 

const PwdCheckViewContainer = ({ history }) => {
  const [error, setError] = useState("");
  const [resultpwd, setResultPwd] = useState(0); // 비밀번호 결과
  const [resultpwdcheck, setResultPwdCheck] = useState(0); // 비밀번호 확인 결과
  const [pwdcheck, setPwdCheck] = useState("비밀번호를 입력 해주세요.");
  const [pwdcheckcheck, setPwdCheckCheck] =
    useState("비밀번호를 재입력 해주세요.");
  const [pwdchecktext,setPwdcheckText]  = useState("");
  const [pwdcheckchecktext,setPwdcheckcheckTest] = useState("");
  const [pwdcheckError,setPwdCheckError] = useState("");

  const dispatch = useDispatch();

  const {
    u_name,
    u_id,
    u_pwd,
    pwd,
    u_email,
    u_pwdcheck,
    pwdupdateError,
    pwdupdate,
  } = useSelector((state) => {
    return {
      u_id: state.auth.u_id,
      u_name: state.auth.u_name,
      u_email: state.auth.u_email,
      u_pwd: state.auth.u_pwd,
      pwdupdate: state.auth.pwdupdate,
      pwdupdateError: state.auth.pwdupdateError,
    };
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(change({ name, value }));

  };

  const onsubmit = (e) => {
    e.preventDefault();

    if(pwdcheckchecktext == ""){
      console.log('return');
      return;
    }

   if(pwdchecktext == pwdcheckchecktext){         
      setPwdCheckError("");
        dispatch(
          pwdupdatecheck({
            u_id,
            u_pwd,
            })
          );
        }
     else if(pwdcheck != pwdcheckchecktext)  {       
       setPwdCheckError("비밀번호가 맞지 않습니다.");
     }
  };

  useEffect(() => {
    if (u_id === "") {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (pwdupdateError) {
      setError("비밀번호 변경 실패");
      return;
    }
    if (pwdupdate == 1) {
      history.push("/PwdCheckViewPage");
      alert("비밀번호 변경에 성공하였습니다.");
      window.location.href = "/";
    }
  }, [pwdupdate, pwdupdateError]);



  // pwd 유효성 검증
  // 알파벳, 특수문자, 숫자 포함 8 ~ 16 글자
  const onKeyUpPWD = (e) => {
    let pwdPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (pwdPattern.test(u_pwd) === true) {
      setPwdCheck("사용가능한 비밀번호입니다.");
      setResultPwd(1);
    } else {
      setPwdCheck("비밀번호는 알파벳, 숫자, 특수문자를 포함해야 합니다.");
      setResultPwd(0);
    }
    setPwdcheckText(e.target.value);
  };

  // pwd 확인 유효성 검증
  const onKeyUpPWDCheck = (e) => {
    if (u_pwd === u_pwdcheck) {
      setPwdCheckCheck(null);
      setResultPwdCheck(1);
    } else {
      setPwdCheckCheck("비밀번호가 맞지 않습니다.123123");
      setResultPwdCheck(0);
    }
    setPwdcheckcheckTest(e.target.value);
  };
  const theme = createTheme();

  return (
    <div>
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
              style={{ marginTop: 20, color: "black",fontFamily:'Noto Sans KR' }}
            >
              비밀번호 변경
            </Typography>
          </Box>

          <Grid container>
            <Grid item style={{ width: "100%" }}>
              <Typography
                variant="h6"
                style={{ color: "black", marginBottom: -15, marginTop: 10,fontFamily:'Noto Sans KR' }}
              >
                비밀번호
              </Typography>
              <TextField
                onChange={onChange}
                onKeyUp={onKeyUpPWD}
                style={{ background: "#FFFFFF", borderRadius: 3 }}
                placeholder="비밀번호"
                margin="normal"
                type="password"
                required
                fullWidth
                autoFocus
                name="u_pwd"
                id="u_pwd"
                autoComplete="비밀번호"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item style={{ width: "100%" }}>
              <Typography
                variant="h6"
                style={{ color: "black", marginBottom: -15, marginTop: 10,fontFamily:'Noto Sans KR' }}
              >
                비밀번호 확인
              </Typography>
              <TextField
                onChange={onChange}
                onKeyUp={onKeyUpPWDCheck}
                style={{ background: "#FFFFFF", borderRadius: 3 }}
                placeholder="비밀번호확인"
                margin="normal"
                type="password"
                required
                fullWidth
                autoFocus
                name="u_pwdcheck"
                id="u_pwdcheck"
                autoComplete="비밀번호 확인"
              />
            </Grid>
          </Grid>
            <span style={{color:"red"}}>{pwdcheckError}</span>
          <Button
            style={{ marginTop: 10, marginBottom: 40,fontFamily:'Noto Sans KR' }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onsubmit}
          >
            비밀번호 변경
          </Button>

          {/* </Box> */}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default withRouter(PwdCheckViewContainer);
