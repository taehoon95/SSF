//해더 모듈
//2021-11-15
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Dehaze, Home } from "@mui/icons-material";
import {
  AccessAlarms,
  LiveTv,
  NotificationsNone,
  Person,
  Upload,
  VideoLabel,
} from "@mui/icons-material";
import { Avatar, Divider, Grid, Tooltip } from "@mui/material";
import { VideoSettings } from "../../../node_modules/@mui/icons-material/index";
import Button from "./Button";
import { Link, withRouter, useHistory } from "react-router-dom";
import Responsive from "./Responsive";
import { useDispatch, useSelector } from "react-redux";

import { Search } from "../../../node_modules/@material-ui/icons/index";
import { Input } from "../../../node_modules/@material-ui/core/index";

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
    marginRight: theme.spacing(3),
  },
  title: {
    marginRight: "auto",
  },
  drawer: {
    width: 300,
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
  const history = useHistory();

  const [opens, setOpens] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  //const [inputSearch, setInputSearch] = useState("");

  // 영상 검색
  const onSearchBar = (e) => {
    setInputSearch(e.target.value);
    console.log(e.target.value);
  };

  // 검색 값 전송 버튼
  const searchContent = (e) => {
    alert(inputSearch);
    history.push(`/SearchResultPage/${inputSearch}`);
  };

  const { u_id, tokenlled, token } = useSelector((state) => {
    return {
      u_id: state.auth.u_id,
      token: state.auth.token,
      tokenlled: state.auth.tokenlled,
    };
  });

  const onLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("u_id");
    window.location.href = "/";
  };

  return (
    <>
      <AppBar style={{ background: "#0080FF" }}>
        <Toolbar>
          {/* 사이드바  */}
          {true && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => setOpens(true)}
            >
              <Dehaze />
            </IconButton>
          )}

          {/* 로고 */}
          <Grid container>
            <Grid item>
              {/* <Button
                href="/"
                variant="inherit"
                sx={{
                  textDecoration: "none",
                  color: lightColor,
                }}
                rel="noopener noreferrer"
              >
                <VideoLabel />
                <Typography variant="h6">SSF</Typography>
              </Button> */}
            </Grid>
          </Grid>

          {/* 검색바 */}
          <Grid
            Conatiner
            // alignItems="center"
            // direction="row"
            // justifyContent="center"
          >
            <Grid item xs={10}>
              <Input
                onChange={onSearchBar}
                value={inputSearch}
                type="text"
                style={{ width: 700 }}
              >
                검색
              </Input>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={searchContent}>
                <Search />
              </Button>
            </Grid>
          </Grid>

          {/* 로그인, 로그아웃 버튼 감쌈 */}
          <Grid
            container
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
          >
            <Grid item>
              {tokenlled ? (
                <div>
                  {localStorage.getItem("u_id")} 님 어서오세요
                  <Button onClick={onLogout}>로그아웃</Button>
                </div>
              ) : (
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
                  rel="noopener noreferrer"
                >
                  로그인
                </Link>
              )}
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
              <IconButton color="inherit" sx={{ p: 0.5 }}></IconButton>
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
                style={{ marginLeft: -8 }}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={() => setOpens(false)}
              >
                {/* 로고 아이콘 */}
                <Dehaze />
              </IconButton>
              {/* SSF 로고 */}
              <VideoLabel fontSize="small" style={{ marginLeft: 13 }} />
              <Box pl={0.5} type="paragraph" color="inherit">
                <Typography variant="h6">SSF</Typography>
              </Box>
            </ListItem>

            {/* Home 버튼 */}
            <Link to="/">
              <ListItem button className={classes.ListItem}>
                <Home />
                <Box pl={3} type="paragraph" color="inherit">
                  Home
                </Box>
              </ListItem>
            </Link>

            {/* 마이 페이지 버튼 */}
            <Link to="/MyPage">
              <ListItem button className={classes.ListItem}>
                <Person />
                <Box pl={3} type="paragraph" color="inherit">
                  마이 페이지
                </Box>
              </ListItem>
            </Link>

            {/* 방송 하기 버튼 */}
            <Link to="/LiveSettingPage">
              <ListItem button>
                <LiveTv />
                <Box pl={3} type="paragraph" color="inherit">
                  방송 하기
                </Box>
              </ListItem>
            </Link>

            {/* 방송 업로드 버튼 */}
            <Link to="/UploadPage">
              <ListItem button>
                <Upload />
                <Box pl={3} type="paragraph" color="inherit">
                  방송 업로드
                </Box>
              </ListItem>
            </Link>

            {/* 내 영상 관리 버튼 */}
            <Link to="/MyVideoSettingPage">
              <ListItem button>
                <VideoSettings />
                <Box pl={3} type="paragraph" color="inherit">
                  내 영상 관리
                </Box>
              </ListItem>
            </Link>

            {/* 라인 아이콘 */}
            <Divider variant="middle" />
          </List>
        </Drawer>
      </Container>
    </>
  );
};

export default withRouter(Header);
