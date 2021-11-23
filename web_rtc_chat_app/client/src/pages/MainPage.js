//방입장 메인 페이지 첫화면
//index
//2021-11-15
//헤더,푸터 추가

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "../../node_modules/@material-ui/core/index";

const MainPage = () => {
 
  return (
    <>

      {/* 메인 페이지 동영상 */}
      <Grid container style={{ marginTop: 65, background: "#FFFFFF"}} justify = "center">
        <Grid item xs={6}>
            <img src="http://ojsfile.ohmynews.com/STD_IMG_FILE/2014/0323/IE001692752_STD.jpg" width="100%" height="100%" />
        </Grid>
        <Grid item xs={6}>
            <img src="http://ojsfile.ohmynews.com/STD_IMG_FILE/2014/0323/IE001692752_STD.jpg" width="100%" height="100%" />
        </Grid>
        <Grid item xs={12}>
            <img src="http://ojsfile.ohmynews.com/STD_IMG_FILE/2014/0323/IE001692752_STD.jpg" width="100%" height="100%" />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
