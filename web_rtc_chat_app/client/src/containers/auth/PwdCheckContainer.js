//2021-11-23
//아이디찾기
//박진현

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { change,idcheck } from "../../modules/auth";
import { withRouter } from "react-router";

const IdCheckContainer = ({history}) => {
  const [error,setError] = useState(null);
    const dispatch= useDispatch();
    const { u_name, u_id, u_email, auth, authError } = useSelector((state)=>{            
      
      return{        
      u_name : state.auth.u_name,
      u_id : state.auth.u_id,
      u_email : state.auth.u_email,   
      auth : state.auth.auth,
      authError : state.auth.authError,
              
    }});
    const onChange = (e) =>{
      console.log('이건 체인지');
      
      const {name,value} = e.target;
      console.log(value);
      
      dispatch(
        change({ 
        name, 
        value 
        })
      );
    }
    const onsubmit = e =>{
      e.preventDefault();
      console.log('아이디찾기');
      dispatch(idcheck({
        u_name,
        u_email})
      )
    }
    useEffect(() => {
      if (authError) {
        setError('아이디 찾기 실패');
        return;
      }
      if (auth) {
        console.log('아이디 찾기 성공');
        history.push('/IdCheckViewrPage');
      }
    }, [auth, authError, dispatch]);


    const theme = createTheme();

    return (
        <div>
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
            비밀번호찾기
          </Typography>
          

            
            <Grid container>
              <Grid item style={{ marginTop:5, width:"100%" }}>
                <Typography variant="h6" style={{ color:"white" }}>이름</Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="  이름"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_name"
                  name="u_name"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{ marginTop:5, width:"100%" }}>
                <Typography variant="h6" style={{ color:"white" }}>아이디</Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="아이디"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_id"
                  name="u_id"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={9} style={{ marginTop:5, width:"100%" }}>
                <Typography variant="h6" style={{ color:"white" }}>이메일</Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="  이메일"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_email"
                  name="u_email"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={3}>
              <Button
              style={{ marginTop: 10, marginBottom: 40 }}              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onsubmit}
            >
              이메일인증
            </Button>    
            </Grid>   
            <Grid item xs={9} style={{ marginTop:5, width:"100%" }}>
                <Typography variant="h6" style={{ color:"white" }}>이메일 인증 코드</Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="  이메일"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_email"
                  name="u_email"
                  autoComplete="current-password"
                />
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
              비밀번호찾기
            </Button>
          {/* </Box> */}
      </form> 
    </ThemeProvider>

        </div>
    );
};

export default withRouter(IdCheckContainer);