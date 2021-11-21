//LoginContainer
//2021-11-15
//버튼 핸들러 정의
//2021-11-16
//로그인 UI 완성
//2021-11-18
//로그인 기능구현

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, login, loginSaga, login_failure, login_success } from "../../modules/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";


const LoginContainer = () => {
  const [error,setError] = useState(null);
  const dispatch = useDispatch();
  const {  u_id, u_pwd } = useSelector((state) => {      
      
    return{        
    u_id: state.auth.u_id,
    u_pwd: state.auth.u_pwd,
    
    
    
  }});
  const { auth, authError } = useSelector( ( state ) => ({
    auth : state.auth,
    authError : state.authError,
  }));
  
  // input text 체인지 
  const onChange = (e) => {
    const { name, value } = e.target;
     
    dispatch(
      change({ 
      name, 
      value 
      })
    );    
  };





  // 사가 핸들러
  const onsubmit = e => {
    console.log('로그인 버튼 누름');
    
    e.preventDefault();
    dispatch(login({
      u_id,
      u_pwd})
    );    
  };
  
  useEffect(() =>{
    if(authError){
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if(auth){
      console.log('로그인 성공');
    }
  },[auth,authError])

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={onsubmit}
        component="main"
        maxWidth="xs"
        style={{ background: "#303030", borderRadius: 5, marginTop: 150 }}
      >
        <CssBaseline />
        
        {/* <Box

          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
          
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
                  name="u_id"
                  id="u_id"
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
                  id="u_pwd"
                  name="u_pwd"
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
          {/* </Box> */}
      </form> 
    </ThemeProvider>

  );
};

export default LoginContainer;
