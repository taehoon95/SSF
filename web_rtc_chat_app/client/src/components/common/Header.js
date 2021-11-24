//해더 모듈
//2021-11-15
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { AppBar, Box, Container, Drawer, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material';
import { Dehaze, Home } from '@mui/icons-material';
import { AccessAlarms, LiveTv, NotificationsNone, Person, Upload, VideoLabel } from '@mui/icons-material';
import { Avatar,  Divider, Grid, Tooltip } from '@mui/material';
import { VideoSettings } from '../../../node_modules/@mui/icons-material/index';
import Button from './Button';
import { Route, Link } from 'react-router-dom';
import Responsive from './Responsive';
import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';


const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

// SideBar CSS
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 'auto',
  },
  drawer: {
    width: 250,
    marginTop: 100,
  },
  iconAlign: {
    marginLeft: 160,
  },
  content: {
    padding: theme.spacing(9),
  },
}));





const lightColor = "rgba(255, 255, 255, 0.7)";


const Header = () => {
  const classes = useStyles(); 

  // SideBar On/Off 상태 설정  
  const [opens, setOpens] = useState(false);

  const { u_id, tokenlled, token } = useSelector((state) =>
    {
    return{
        u_id: state.auth.u_id,
        token:state.auth.token,
        tokenlled:state.auth.tokenlled
    }})
    
    const onLogout = () =>{
     localStorage.removeItem('auth');  
     localStorage.removeItem('u_id');
     window.location.href="/";
  }
 
  return (
    <>
   
      <AppBar style={{ background: '#303030' }} >
        <Toolbar>         
            {/* true, false로 나중에 로그인 하면 보이고, 안하면 보이게 할 수 있음 */}
            {true && <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setOpens(true)}
          >
            <Dehaze />
          </IconButton> }

            {/* 로고 */}
            <Grid item >
              <Button
                href="/"
                variant="inherit"
                sx={{
                  textDecoration: "none",
                  color: lightColor,
                }}
                rel="noopener noreferrer"
              >
                <VideoLabel />
                <Typography>
                  SSF
                </Typography>
              </Button>
            </Grid>                
          <Grid container  alignItems="center" direction="row" justifyContent="flex-end" >           
            {/* 로그인 버튼 */}
            {/* {
              (()=>{
                    console.log(tokenlled);
                    console.log(token);
                    
              })()
            } */}
            <Grid item>
              {tokenlled ?(
                <div>
                {localStorage.getItem('u_id')} 님 어서오세요
                <Button onClick={onLogout}>로그아웃</Button>
                </div>
              ):(
                <Link 
                 to="/LoginPage"
                variant="inherit"
                sx={{
                  textDecoration: "none",
                  color: lightColor,
                  "&:hover": {
                    color: "common.white",
                  },
                }}
                rel="noopener noreferrer">
                  로그인
                </Link>
              )}
              {/* {
              (()=>{
                    console.log(tokenlled);
                    console.log(token);
                    
              })()
            } */}
            </Grid>

            {/* 알림버튼 */}
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsNone />
                </IconButton>
              </Tooltip>
            </Grid>

            {/*개인 이미지 버튼*/}
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>


      {/* SideBar 안의 내용들 */}
      <Container className={classes.root}>
        <Drawer open={opens} onClose={() => setOpens(false)}>
          <List className={classes.drawer}>

            {/* SideBar안의 메뉴 버튼 */}
            <ListItem className={classes.ListItem}>
              <IconButton
                style={{marginLeft:-8}}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={() => setOpens(false)}
              >
                {/* 로고 아이콘 */}
                <Dehaze />
              </IconButton>
              {/* SSF 로고 */}
              <VideoLabel fontSize="small"  style={{marginLeft:13}}/>
              <Box pl={0.5} type="paragraph" color="inherit">
                <Typography variant="h6">SSF</Typography>
              </Box>
            </ListItem>

            {/* Home 버튼 */}
            <ListItem button component="a" href="/" className={classes.ListItem} >
              <Home />
              <Box pl={3} type="paragraph" color="inherit">
                Home
              </Box>
            </ListItem>

            {/* 내가 시청한 기록 버튼 */}
            <ListItem button component="a" href="./ListPage">
              <AccessAlarms />
              <Box pl={3} type="paragraph" color="inherit">
                내가 시청한 기록
              </Box>
            </ListItem>

            {/* 마이 페이지 버튼 */}
            <ListItem button component="a" href="./MyPage" className={classes.ListItem}>
              <Person />
              <Box pl={3} type="paragraph" color="inherit">
                마이 페이지
              </Box>
            </ListItem>

            {/* 방송 하기 버튼 */}
            <ListItem button component="a" href="./LiveSettingPage">
              <LiveTv />
              <Box pl={3} type="paragraph" color="inherit">
                방송 하기
              </Box>
            </ListItem>

            {/* 방송 업로드 버튼 */}
            <ListItem button component="a" href="./UploadPage">
              <Upload />
              <Box pl={3} type="paragraph" color="inherit">
                방송 업로드
              </Box>
            </ListItem>

            {/* 내 영상 관리 버튼 */}
            <ListItem button component="a" href="./MyVideoSettingPage">
              <VideoSettings />
              <Box pl={3} type="paragraph" color="inherit">
                내 영상 관리
              </Box>
            </ListItem>

            {/* 라인 아이콘 */}
            <Divider variant="middle" />
          </List>
        </Drawer>
      </Container>
    </>
  );
};

export default withRouter(Header);
