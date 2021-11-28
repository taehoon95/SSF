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
  Button,
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
import { Divider, Grid, Tooltip } from "@mui/material";
import { VideoSettings } from "../../../node_modules/@mui/icons-material/index";

// 2021-11-25 강동하 버튼 pathname 에러 임시 수정
import { Link, withRouter, useHistory } from "react-router-dom";

import Responsive from "./Responsive";
import { useSelector } from "react-redux";

import { Search } from "../../../node_modules/@material-ui/icons/index";
import {
  Input,
  TextField,
} from "../../../node_modules/@material-ui/core/index";

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    width: 270,
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
  const history = useHistory();
  // SideBar On/Off 상태 설정
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
    // 2021-11-25 강동하 버튼 눌렀을 때 초기화 안되서 검색 두 번 못하는거 수정
    setInputSearch("");
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

  // 2021-11-25 강동하 홈 버튼 에러 수정
  const home = () => {
    history.push("/");
  };

  return (
    <>
      <AppBar classes={Wrapper} style={{ background: "#303030" }}>
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
          {/* 2021-11-25 강동하 로고 버튼 에러 수정 */}
          <Grid container>
            <Grid item>
              <Button
                onClick={home}
                variant="inherit"
                sx={{
                  textDecoration: "none",
                  color: lightColor,
                }}
                rel="noopener noreferrer"
              >
                <VideoLabel />
                <Typography variant="h6">SSF</Typography>
              </Button>
            </Grid>
          </Grid>


          {/* 검색바 */}
          <Box
            component="span"
            display="flex"
            m={1}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              alignItems="center"
              onChange={onSearchBar}
              value={inputSearch}
              type="text"
              style={{ width: 500 }}
              placeholder="검색"
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              alignItems="center"
              onClick={searchContent}
            >
              <Search />
            </Button>
          </Box>

          {/* 로그인, 로그아웃 버튼 감쌈 */}
          <Grid
            container
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
          >
            <Grid item>
              {tokenlled ? (
                <Typography variant="body1">
                  {/* 로그아웃 버튼 */}
                  {localStorage.getItem("u_id")} 님 어서오세요 &nbsp;
                  <Button
                    variant="inherit"
                    onClick={onLogout}
                    style={{ color: "white" }}
                  >
                    <Typography variant="body1">로그아웃</Typography>
                  </Button>
                </Typography>
              ) : (
                // 로그인 버튼
                <Button
                  component={Link}
                  to={"/LoginPage"}
                  variant="inherit"
                  style={{ color: "white" }}
                >
                  <Typography variant="body1">로그인</Typography>
                </Button>
                // 아래 Link 태그는 수정 전 로그인 버튼
                // <Link
                //   to="/LoginPage"
                //   sx={{
                //     textDecoration: "none",
                //     color: lightColor,
                //     "&:hover": {
                //       color: "common.white",
                //     },
                //   }}
                //   rel="noopener noreferrer"
                // >
                //   로그인
                // </Link>
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
            {/* <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}></IconButton>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>

      {/* SideBar 안의 내용들 */}
      <Container className={classes.root}>
        <Drawer open={opens} onClose={() => setOpens(false)}>
          <List className={classes.drawer} style={{ background: "#303030" }}>
            {/* SideBar안의 메뉴 버튼 */}
            <ListItem className={classes.ListItem}>
              <IconButton
                style={{ marginLeft: -8, color: "white" }}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={() => setOpens(false)}
              >
                {/* 로고 아이콘 */}
                <Dehaze />
              </IconButton>
              {/* SSF 로고 */}
              <Grid container>
                <Grid item>
                  <Button
                    onClick={home}
                    variant="inherit"
                    sx={{
                      textDecoration: "none",
                      color: lightColor,
                    }}
                    rel="noopener noreferrer"
                  >
                    <VideoLabel />
                    <Typography variant="h6">SSF</Typography>
                  </Button>
                </Grid>
              </Grid>
            </ListItem>

            <Divider variant="middle" style={{ background: "gray" }} />

            {/* Home 버튼 */}
            <ListItem
              component={Link}
              to={"/"}
              className={classes.ListItem}
              style={{ marginTop: 10 }}
            >
              <Home style={{ color: "white" }} />
              <Box pl={3} type="paragraph" color="white">
                Home
              </Box>
            </ListItem>

            {/* 마이 페이지 버튼 */}
            <ListItem
              component={Link}
              to={"/MyPage"}
              className={classes.ListItem}
            >
              <Person style={{ color: "white" }} />
              <Box pl={3} type="paragraph" color="white">
                마이 페이지
              </Box>
            </ListItem>

            {/* 방송 하기 버튼 */}
            <ListItem component={Link} to={"/LiveSettingPage"}>
              <LiveTv style={{ color: "white" }} />
              <Box pl={3} type="paragraph" color="white">
                방송 하기
              </Box>
            </ListItem>

            {/* 방송 업로드 버튼 */}
            <ListItem component={Link} to={"/UploadPage"}>
              <Upload style={{ color: "white" }} />
              <Box pl={3} type="paragraph" color="white">
                방송 업로드
              </Box>
            </ListItem>

            {/* 내 영상 관리 버튼 */}
            <ListItem component={Link} to={"/MyVideoSettingPage"}>
              <VideoSettings style={{ color: "white" }} />
              <Box pl={3} type="paragraph" color="white">
                내 영상 관리
              </Box>
            </ListItem>

            {/* 라인 아이콘 */}
            <Divider
              variant="middle"
              style={{ marginTop: 10, background: "gray" }}
            />
          </List>

          <List style={{ height: 1000, background: "#303030" }}></List>
        </Drawer>
      </Container>
    </>
  );
};

export default withRouter(Header);
