//방입장 메인 페이지 첫화면
//index
//2021-11-15
//헤더,푸터 추가

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import StreamListContainer from "../containers/streaming/StreamListContainer";
import { ContextProvider } from "../SocketContext";

const MainPage = () => {
  const [myList, setMyList] = useState([]);
  const [myTopList, setMyTopList] = useState([]);
  const [sendData, setSendData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    myVideoList();
  }, []);

  useEffect(() => {
    myTopVideoList();
  }, []);

  // 20211123 윤성준 전체 영상 List api
  const myVideoList = () => {
    axios
      .get(`/api/videoView`)
      //.get(`https://18.219.234.0:8080/api/videoView`)
      .then((response) => {
        //alert("record 가져오기 성공ㅎㅎ");
        setMyList(response.data);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  // 20211123 윤성준 Top 4 영상 api
  const myTopVideoList = () => {
    axios
      .get(`/api/videoTop5`)
      //.get(`https://18.219.234.0:8080/api/videoTop5`)
      .then((response) => {
        //alert("record 가져오기 성공ㅎㅎ");
        setMyTopList(response.data);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <ContextProvider>
        <div className="container" style={{ marginTop: 65 }}>
          <Link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            to="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <Link
            rel="stylesheet"
            type="text/css"
            to="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <style>{cssstyle}</style>
          <div>
            <br />
            <Grid container xs={12}>
              {/* 실시간 방송 영상 뷰 */}
              <Grid item>
                <StreamListContainer />
              </Grid>
              {/* Top4 영상 뷰 */}
              <Grid item xs={12} style={{ marginLeft: 30, marginBottom: -30 }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  Top 4 영상
                </Typography>
              </Grid>
              {myTopList.map((data, idx) => (
                <div key={idx}>
                  <Grid item style={{ marginLeft: 30, marginTop: 10 }}>
                    <Link
                      to={`/WatchPage2/${data.v_code}`}
                      style={{ textDecoration: "none" }}
                    >
                      <video
                        src={data.v_link}
                        controls
                        muted
                        width="320"
                        height="250"
                      />
                      <h3 style={{ color: "white", marginTop: 3 }}>
                        {data.v_name}
                      </h3>
                      <h4 style={{ color: "gray", marginTop: 2 }}>
                        조회수 : &nbsp;
                        {data.v_views}
                        &nbsp; - &nbsp;
                        {data.v_date}
                      </h4>
                    </Link>
                  </Grid>
                </div>
              ))}
            </Grid>
            <br />
            <br />
            <Grid container xs={12}>
              <Grid item xs={12} style={{ marginLeft: 30, marginBottom: -30 }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  전체 영상
                </Typography>
              </Grid>
              {myList.map((data, idx) => (
                <div key={idx}>
                  <Grid item style={{ marginLeft: 30, marginTop: 10 }}>
                    <Link
                      to={`/WatchPage2/${data.v_code}`}
                      style={{ textDecoration: "none" }}
                    >
                      <video
                        src={data.v_link}
                        controls
                        muted
                        width="320"
                        height="250"
                      />
                      <h3 style={{ color: "white", marginTop: 3 }}>
                        {data.v_name}
                      </h3>
                      <h4 style={{ color: "gray", marginTop: 2 }}>
                        조회수 : &nbsp;
                        {data.v_views}
                        &nbsp; - &nbsp;
                        {data.v_date}
                      </h4>
                    </Link>
                  </Grid>
                </div>
              ))}
            </Grid>
          </div>
        </div>
      </ContextProvider>
      <Footer />
    </>
  );
};

const cssstyle = `
.container {
  margin: 0 auto;
  padding: 0px 40px 40px 40px;
  width: 1400px;
}
.button {
    font-size: .9rem;
    display: inline-block;
    width: auto;
    padding: 1em;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 1rem 1rem 0;
		font-family: verdana;
    background: #5f9ea0;
    color: #fff;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
`;

export default MainPage;
