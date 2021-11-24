//2021-11-23
//아이디 찾기 후 아이디 값 전달
//박진현
import React from "react";
import {  useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

const IdCheckViewrPage = () => {

    
    const { u_name,u_id,check,auth } = useSelector((state)=>{            
      
      return{        
      u_id :state.auth.check.u_id,
      u_name : state.auth.u_name,
      u_email : state.auth.u_email,   
    
              
    }});
    const theme = createTheme();

    return (
        <div>
                      <ThemeProvider theme={theme}>
      <Grid Container
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
            아이디찾기
          </Typography>
          

          {u_name}님의 아이디는 {u_id} 입니다.
           
          {/* </Box> */}
      </Grid> 
    </ThemeProvider>
       </div>
    );
};

export default IdCheckViewrPage;