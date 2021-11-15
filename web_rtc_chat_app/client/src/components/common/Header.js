//해더 모듈
//2021-11-13

import React from "react";
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import { Avatar, Link, Tooltip } from "@mui/material";
import {NotificationsNone, OndemandVideo} from "@mui/icons-material";

const lightColor = "rgba(255, 255, 255, 0.7)";

const Header = (props) => {
  return (
    <>
      <AppBar
        style={{ background: "#515151" }}
        position="absolute"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            {/* 로고 */}
            <Grid item>
              <Link
                href="/"
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
                <OndemandVideo />
                SSP
              </Link>
            </Grid>

            <Grid item xs />

            {/* 회원가입 버튼 */}
            <Grid item>
              <Link
                href="./RegisterPage"
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
            
                회원가입
              </Link>
            </Grid>

            {/* 로그인 버튼 */}
            <Grid item>
              <Link
                href="./LoginPage"
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
            </Grid>

            {/* 알림버튼 */}
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsNone />
                </IconButton>
              </Tooltip>
            </Grid>

            {/* 개인 이미지 버튼 */}
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;