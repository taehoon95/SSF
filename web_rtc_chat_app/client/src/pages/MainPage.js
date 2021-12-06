//방입장 메인 페이지 첫화면
//index
//2021-11-15
//헤더,푸터 추가

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import Header from "../components/common/Header";
import { showstreaming } from "../modules/streaming";
import { ContextProvider } from "../SocketContext";

import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import { nanoid } from "nanoid";
import {
  PlayArrow,
} from "../../node_modules/@mui/icons-material/index";

const MainPage = () => {
  const [myList, setMyList] = useState([]);
  const [myTopList, setMyTopList] = useState([]);
  const [liveVideoShow, setLiveVideoShow] = useState([]);

  // 2021-12-05 강동하 홈 버튼 리렌더링
  const [time, setTime] = useState(1);

  // 2021-12-05 강동하 로딩 끝난 후 스트리밍 없을 때 이미지 출력을 위한 LiveLoad
  const [liveLoad, setLiveLoad] = useState(false);

  const dispatch = useDispatch();

  // 2021-12-05 강동하 홈 버튼 리렌더링
  const location = useLocation();
  //console.log(location.state);

  useEffect(()=>{
    setTime(location.state);
    console.log(time);
  }, [location])

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
        //alert("record 가져오기 실패");
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

  // 2021-12-03 윤성준 실시간 영상 랜덤 5
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

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  });

  let slides = [
    liveVideoShow.map((data, idx) => (
    {
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
            <img src={data.l_img} alt="1" width="600" height="750" />
            </div>
          </div>

          <div style={{ position: "absolute" }}>
            <Button component={Link} to={`/watchpage/${data.l_code}`}>
              <PlayArrow style={{ color: "white", width: 180, height: 180 }} />
            </Button>
          </div>
        </div>
      ),
    }
    ))
  ][0].map((slide, index) => {
    return { ...slide, onClick: () => setState({ goToSlide: index }) };
  });


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
  //////// 실시간 영상 3D 이미지 끝

  return (
    <>
      <Header />
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
              {/* 실시간 방송 영상 이미지 */}
              <Grid item xs={12}>
                {liveLoad && liveVideoShow.length === 0 ?
                // {/* 2021-12-05 강동하 실시간 스트리밍 없을 때 이미지 */}
                (<div style={{width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center'}}>
                    <img
                      src="https://ssfupload.s3.ap-northeast-2.amazonaws.com/streaming/NoStreaming.png"
                      alt="대체 이미지"
                      style={{ height: '80%' }}
                      />
                </div>)
                :
                // {/* 메인페이지 3D 슬라이더 테스트 */}
                (<div
                  style={{ width: "80%", height: "400px", margin: "0 auto" }}
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
                </div>)
                }
              </Grid>
            </Grid>
            {/* Top4 영상 뷰 */}
            <Grid container>
              {/* Top4 영상 */}
              <Grid item xs={12} style={{ marginLeft: 30, marginTop: 30 }}>
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
                  </Grid>
                </div>
              ))}
            </Grid>
            <br />
            <br />

            {/* 전체 랜덤 영상 */}
            <Grid container xs={12}>
              <Grid item xs={12} style={{ marginLeft: 30 }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  추천 영상
                </Typography>
              </Grid>
              {myList.map((data, idx) => (
                <div key={idx}>
                  <Grid item style={{ marginLeft: 30, marginTop: 10 }}>
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
                  </Grid>
                </div>
              ))}
            </Grid>
          </div>
        </div>
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
