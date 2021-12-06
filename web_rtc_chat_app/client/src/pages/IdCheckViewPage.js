//2021-11-23
//아이디 찾기 후 아이디 값 전달
//박진현
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";



const IdCheckViewPage = () => {
  const [myList,setMyList] = useState([]);
  const { u_name, u_id, check, auth } = useSelector((state) => {
    return {
      u_id: state.auth.check.u_id,
      u_name: state.auth.u_name,
      u_email: state.auth.u_email,
      check: state.auth.check
    };
  });

  useEffect(()=>{
    
      setMyList(check);


  },[])
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
              style={{ marginTop: 20, color: "black",fontFamily:'Noto Sans KR' }}
            >
              아이디찾기
            </Typography>
            {myList.map((data,idx)=>(                          
            <Typography variant="h6" >
              <span style={{color:"red" , fontFamily:'Noto Sans KR'}}>{data.u_name}</span> 님의 아이디는 <span style={{color:"red",fontFamily:'Noto Sans KR'}}>{data.u_id}</span> 입니다.
            </Typography>
            ))}
            {/* 버튼 안먹어 ㅅㅂ */}
            <Box style={{ marginTop: 70 }}>
              <Button
                component={Link}
                to={"/LoginPage"}
                variant="contained"
                

                style={{ width: 190 }}
              >
                <Typography variant="h6" style={{fontFamily:'Noto Sans KR'}}>로그인</Typography>
              </Button>
              <Button
                component={Link}
                to={"/PwdCheckPage"}
                variant="contained"

                style={{  marginLeft: 10, width: 190 }}
              >
                <Typography variant="h6" style={{fontFamily:'Noto Sans KR'}}>비밀번호 찾기</Typography>
              </Button>
            </Box>

              <Button
                component={Link}
                to={"/"}
                variant="contained"
                style={{  width: 390, marginTop: 10 }}
              >
                <Typography variant="h6" style={{fontFamily:'Noto Sans KR'}}>홈으로 이동</Typography>
              </Button>

          </Box>
          {/* </Box> */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default IdCheckViewPage;
