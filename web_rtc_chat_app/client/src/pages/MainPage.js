//방입장 메인 페이지 첫화면
//index
//2021-11-15
//헤더,푸터 추가

import React from "react";
import { Grid } from "../../node_modules/@material-ui/core/index";
import { Image } from "../../node_modules/@mui/icons-material/index";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const MainPage = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default MainPage;
