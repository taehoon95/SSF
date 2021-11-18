//2021-11-16
//회원가입 UI ing~

// 아이디, 비밀번호, 이름, 생년월일, 성별, 이메일 , 휴대전화

//2021-11-18 강동하 회원가입 구현
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { change, register_Action } from "../../modules/register";
import { ThemeProvider } from 'styled-components';
import { createTheme } from "@mui/material/styles";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '../../../node_modules/@material-ui/core/index';
import { LockOutlined } from '../../../node_modules/@material-ui/icons/index';
import axios from '../../../node_modules/axios/index';

const RegisterContainer = () => {
  const dispatch = useDispatch();

  const { u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell } = useSelector(( state ) => 
  {
  return{
    u_id : state.register.u_id,
    u_pwd : state.register.u_pwd,
    u_name : state.register.u_name,
    u_birth : state.register.u_birth,
    u_gender : state.register.u_gender,
    u_email : state.register.u_email,
    u_tell : state.register.u_tell,
  }
  });
  
  const { auth, authError } = useSelector( ( state ) => ({
    auth : state.auth,
    authError : state.authError,
  }));

  const onChange = (e) => {
    const { id, value } = e.target;
    dispatch(change({ id, value }));
  };
  
  // 20211118 강동하 회원가입 post
  const onClick = (e) => {
    e.preventDefault();
    alert("회원가입 시도");
    dispatch(register_Action({ u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell }))
    };
    
    useEffect(() => {
      if (authError){
          alert(authError + " 에러발생");
          console.log('오류');
          console.log(authError);
          return;
      }
      if (auth){
          alert('회원가입이 되었습니다.');
          console.log('회원가입 성공');
          console.log(auth);
      }
  }, [auth, authError]);

    const theme = createTheme();
    
    return (
      <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          background: "#303030",
          borderRadius: 5,
          marginTop: 150,
          marginBottom: 100,
        }}
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
            회원가입
          </Typography>

          {/* 여기서부터 텍스트 입력창 */}
          <Grid container>
            <Grid item style={{ width: "100%" }}>
              <Typography
                variant="h6"
                style={{ color: "white", marginBottom: -15, marginTop: 10 }}
              >
                아이디
              </Typography>
              {/* 아이디 입력 텍스트 */}
              <TextField
                onChange={onChange}
                style={{ background: "#FFFFFF", borderRadius: 3 }}
                placeholder="  ID"
                margin="normal"
                required
                fullWidth
                autoFocus
                id="u_id"
                autoComplete="id"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "white" }}>
                비밀번호
              </Typography>
              {/* 비밀번호 입력 텍스트 */}
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
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "white" }}>
                이름
              </Typography>
              {/* 이름 입력 텍스트 */}
              <TextField
                onChange={onChange}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                margin="normal"
                required
                fullWidth
                type="text"
                id="u_name"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "white" }}>
                생년월일
              </Typography>
              {/* 생년월일 입력 텍스트 */}
              <TextField
                onChange={onChange}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                margin="normal"
                required
                fullWidth
                type="text"
                id="u_birth"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "white" }}>
                성별
              </Typography>
              {/* 성별 입력 텍스트 */}
              <TextField
                onChange={onChange}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                margin="normal"
                required
                fullWidth
                type="text"
                id="u_gender"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "white" }}>
                이메일
              </Typography>
              {/* 이메일 입력 텍스트 */}
              <TextField
                onChange={onChange}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                margin="normal"
                required
                fullWidth
                type="text"
                id="u_email"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "white" }}>
                휴대전화
              </Typography>
              {/* 휴대전화 입력 텍스트 */}
              <TextField
                onChange={onChange}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                margin="normal"
                required
                fullWidth
                type="text"
                id="u_tell"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: 20, marginBottom: 30 }} spacing={1}>
            {/* 취소 버튼 */}
            <Grid item xs={12} sm={6} >
              <Button
                variant="contained"
                href="/"
                fullWidth
              >
                취소
              </Button>
            </Grid>
            {/* 회원가입 버튼 */}
            <Grid item xs={6}>
              <Button
                onClick={onClick}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                회원가입
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterContainer;
