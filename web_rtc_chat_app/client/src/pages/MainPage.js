//방입장 메인 페이지 첫화면
//index
//2021-11-15
//헤더,푸터 추가

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { showstreaming } from "../modules/streaming";
import { ContextProvider } from "../SocketContext";

import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import { nanoid } from "nanoid";
import { PlayArrow, PlayCircleOutline } from "../../node_modules/@mui/icons-material/index";

const MainPage = () => {
  const [myList, setMyList] = useState([]);
  const [myTopList, setMyTopList] = useState([]);
  const [sendData, setSendData] = useState([]);
  const history = useHistory();

  const dispatch = useDispatch();

  const { showStreamRes } = useSelector((state) => ({
    showStreamRes: state.streaming.showStreamRes,
  }));

  useEffect(() => {
    dispatch(showstreaming("noSearch", "noCondition"));
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

  // 실시간 영상 view
  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  });

  let slides = [
    {
      key: nanoid(),
      content: (
        <div style={{ position: "relative" }}>
          <img
            src="https://miricanvas.zendesk.com/hc/article_attachments/360049546931/__________._5.png"
            alt="1"
            className="mainSliderImg"
            style={{ verticalAlign: "middle", opacity: 0.7 }}
          />
          <Button component={Link} to={"/watchpage/O-hFhz43urlu4qaHozsRT"}>
            <div style={{ position: "absolute", top: -270, right: -340 }}>
              <PlayArrow
                style={{ width: 160, height: 160, color: "white" }}
              />
            </div>
          </Button>
        </div>
      ),
    },
    {
      key: nanoid(),
      content: (
        <div style={{ position: "relative" }}>
          <img
            src="https://ncache.ilbe.com/files/attach/new/20191128/28622079/9666962285/11216349718/f512995cdc74d10b4b1b41060b12a423_11216349903.png"
            alt="1"
            className="mainSliderImg"
            opacity= "10px"
            style={{ verticalAlign: "middle", opacity: 0.7 }}
          />
          <Button component={Link} to={"/watchpage/O-hFhz43urlu4qaHozsRT"}>
            <div style={{ position: "absolute", top: -270, right: -340 }}>
              <PlayArrow
                style={{ width: 160, height: 160, color: "white" }}
              />
            </div>
          </Button>
        </div>
      ),
    },
    {
      key: nanoid(),
      content: (
        <div style={{ position: "relative" }}>
          <img
            src="https://cdn.imweb.me/thumbnail/20200715/8239662608a5c.png"
            alt="1"
            className="mainSliderImg"
            style={{ verticalAlign: "middle", opacity: 0.7 }}
          />
          <Button component={Link} to={"/watchpage/O-hFhz43urlu4qaHozsRT"}>
            <div style={{ position: "absolute", top: -270, right: -340 }}>
              <PlayArrow
                style={{ width: 160, height: 160, color: "white" }}
              />
            </div>
          </Button>
        </div>
      ),
    },
  ].map((slide, index) => {
    return { ...slide, onClick: () => setState({ goToSlide: index }) };
  });

  const onChangeInput = (e) => {
    setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    });
  };

  let xDown = null;
  let yDown = null;

  const getTouches = (evt) => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  };

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        setState({ goToSlide: state.goToSlide + 1 });
      } else {
        /* right swipe */
        setState({ goToSlide: state.goToSlide - 1 });
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
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
              <Grid item xs={12}>
                {/* <StreamListContainer streamRes={showStreamRes} /> */}

                {/* 메인페이지 3D 슬라이더 테스트 */}
                <div
                  style={{ width: "70%", height: "400px", margin: "0 auto" }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                >
                  <Carousel
                    slides={slides}
                    goToSlide={state.goToSlide}
                    offsetRadius={state.offsetRadius}
                    showNavigation={state.showNavigation}
                    animationConfig={state.config}
                  />
                </div>
              </Grid>
            </Grid>

            {/* Top4 영상 뷰 */}
            <Grid container>
              {/* Top4 영상 */}
              <Grid
                item
                xs={12}
                style={{ marginLeft: 30, marginBottom: -30, marginTop: 30 }}
              >
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

            {/* 전체 랜덤 영상 */}
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
