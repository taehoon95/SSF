import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import Header from "../components/common/Header";
import { showstreaming } from "../modules/streaming";
import { ContextProvider } from "../SocketContext";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import { nanoid } from "nanoid";
import { PlayArrow } from "../../node_modules/@mui/icons-material/index";
import { useMediaQuery } from "react-responsive";
import { Box } from "../../node_modules/@material-ui/core/index";

// 실시간 방송 데스크탑 버전 태그 만들기
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  //console.log(isDesktop);
  return isDesktop ? children : null;
};

// 실시간 방송 모바일 버전 태그 만들기
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  //console.log(isMobile);
  return isMobile ? children : null;
};

const MainPage2 = () => {
  // Top4 영상 조회
  const [myTopList, setMyTopList] = useState([]);
  // 전체 영상 랜덤으로 16개 조회
  const [myList, setMyList] = useState([]);
  // 실시간 영상 랜덤으로 5개 조회
  const [liveVideoShow, setLiveVideoShow] = useState([]);
  // 2021-12-05 강동하 홈 버튼 리렌더링
  const [time, setTime] = useState(1);
  // 2021-12-05 강동하 로딩 끝난 후 스트리밍 없을 때 이미지 출력을 위한 LiveLoad
  const [liveLoad, setLiveLoad] = useState(false);
  // 2021-12-05 강동하 홈 버튼 리렌더링
  const location = useLocation();
  const dispatch = useDispatch();
  // 실시간 영상 3D????
  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  });

  useEffect(() => {
    setTime(location.state);
    console.log(time);
  }, [location]);

  useEffect(() => {
    dispatch(showstreaming("noSearch", "noCondition"));
    myVideoList();
  }, [location]);

  useEffect(() => {
    myTopVideoList();
  }, [location]);

  // 실시간 영상 랜덤 조회
  useEffect(() => {
    myLiveVideoList();
  }, [location]);

  // 2021-11-23 윤성준 전체 영상 List api
  const myVideoList = () => {
    axios
      .get(`/api/videoView`)
      //.get(`https://18.219.234.0:8080/api/videoView`)
      .then((response) => {
        //alert("record 가져오기 성공ㅎㅎ");
        setMyList(response.data);
      })
      .catch((error) => {
        //alert("record 가져오기 실패");
        console.log(error);
      });
  };

  // 2021-11-23 윤성준 Top 4 영상 api
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

  // 2021-12-03 윤성준 실시간 영상 api
  const myLiveVideoList = () => {
    axios
      .get(`/api/liveVideo`)
      .then((response) => {
        //alert("record 가져오기 성공ㅎㅎ");
        setLiveVideoShow(response.data);
        // 2021-12-05 강동하 로딩 끝난 후 스트리밍 없을 때 이미지 출력을 위한 LiveLoad
        setLiveLoad(true);
      })
      .catch((error) => {
        //alert("실시간 영상 가져오기 실패");
        console.log(error);
      });
  };

  // 실시간 방송 3D
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

  // 실시간 방송 데스크탑 버전
  let slides = [
    liveVideoShow.map((data, idx) => ({
      key: nanoid(),
      content: (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ verticalAlign: "middle", opacity: 1 }}>
            <div key={idx}>
              <img src={data.l_img} alt="1" width="600" height="400" />
            </div>
          </div>

          <div style={{ position: "absolute" }}>
            <Button component={Link} to={`/watchpage/${data.l_code}`}>
              <PlayArrow style={{ color: "white", width: 180, height: 180 }} />
            </Button>
          </div>
        </div>
      ),
    })),
  ][0].map((slide, index) => {
    return { ...slide, onClick: () => setState({ goToSlide: index }) };
  });

  // 실시간 방송 모바일 버전
  let slides2 = [
    liveVideoShow.map((data, idx) => ({
      key: nanoid(),
      content: (
        <>
          <div style={{ verticalAlign: "middle", opacity: 1 }}>
            <div key={idx}>
              <img src={data.l_img} alt="1" width="320" height="250" />
            </div>
          </div>

          <div style={{ position: "absolute" }}>
            <Button component={Link} to={`/watchpage/${data.l_code}`}>
              <PlayArrow style={{ color: "white", width: 90, height: 90 }} />
            </Button>
          </div>
        </>
      ),
    })),
  ][0].map((slide, index) => {
    return { ...slide, onClick: () => setState({ goToSlide: index }) };
  });

  return (
    <>
      <Header />
      <Grid container>
        {/* 실시간 방송  */}
        <Grid item>
            
        </Grid>

        {/* Top 4 영상 */}
        <Grid item>
          <Typography variant="h5" style={{ color: "white" }}>
            Top 4 영상
          </Typography>
          {myTopList.map((data, idx) => (
            <div key={idx}>
              <Box style={{ marginLeft: 30, marginTop: 10 }}>
                <Link
                  to={`/WatchPage2/${data.v_code}`}
                  style={{ textDecoration: "none" }}
                >
                  <img src={data.v_img} width="320" height="200" />
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
              </Box>
            </div>
          ))}
        </Grid>

        {/* 전체 영상 */}
        <Grid item>
          <Typography variant="h5" style={{ color: "white" }}>
            추천 영상
          </Typography>
          {myList.map((data, idx) => (
            <div key={idx}>
              <Box style={{ marginLeft: 30, marginTop: 10 }}>
                <Link
                  to={`/WatchPage2/${data.v_code}`}
                  style={{ textDecoration: "none" }}
                >
                  <img src={data.v_img} width="320" height="200" />
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
              </Box>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage2;
