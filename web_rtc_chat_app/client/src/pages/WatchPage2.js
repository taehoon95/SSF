/* 
20211115 이태훈 
비디오 보는 페이지 테스트중
*/

import React from "react";
import { Grid } from "../../node_modules/@material-ui/core/index";
import { videorecord } from "../lib/api/videoRecord";



const WatchPage2 = () => {
  const cdn = "https://d3lafl73dhs1s7.cloudfront.net/";

  const test = () => {
    videorecord("kang97")
  }
  
  return (
    <>
      <Grid container style={{ marginTop: 65 }}>
        <Grid item>
      <video controls autoPlay loop muted>
        <source
          src="https://ssfupload.s3.ap-northeast-2.amazonaws.com/static/11-2_KR-4963398414_01.webm"
          type="video/mp4"
        />
      </video>
      <button onClick={test}>showList</button>
        </Grid>
      </Grid>
    </>
  );
};

export default WatchPage2;
