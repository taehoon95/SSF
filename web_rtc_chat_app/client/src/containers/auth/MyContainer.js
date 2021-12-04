import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Grid,
  Typography,
} from "../../../node_modules/@material-ui/core/index";

const MyContainer = () => {
  const u_id = localStorage.getItem("u_id");

  const [myList, setMyList] = useState([]);

  useEffect(() => {
    myVideoList();
  }, []);

  const myVideoList = () => {
    axios
      //.get(`https://18.219.234.0:8080/api/videorecord/${u_id}`)
      .get(`/api/videorecord/${u_id}`)
      .then((response) => {
        //alert("record 가져오기 성공ㅎㅎ");
        setMyList(response.data);
      })
      .catch((error) => {
        // alert("record 가져오기 실패");
        // console.log(error);
      });
  };

  //2021-11-21 강동하 마이페이지 탑5 영상 조회
  const [data2, setData2] = useState([]);

  const [myViews, setMyViews] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    myVideoViews();
  }, []);
  
  // 2021-12-01 강동하 차트 색 수정
  useEffect(() => {
    f1();
    // console.log(resultname);
    setData2({
      dataHorizontal: {
        labels: resultname,
        datasets: [
          {
            label: "My Top Video",
            data: resultviews,
            fill: false,
            backgroundColor: [
              "rgb(255,000,000, 0.6)",
              "rgb(255,119,000, 0.6)",
              "rgb(255,230,000, 0.6)",
              "rgb(171,255,000, 0.6)",
              "rgb(009,255,000, 0.6)",
              "rgb(000,255,230, 0.6)",
              "rgb(000,196,255, 0.6)",
              "rgb(000,051,255, 0.6)",
              "rgb(188,000,255, 0.6)",
              "rgb(247,000,255, 0.6)",
            ],
            borderColor: [
              "rgb(255,000,000)",
              "rgb(255,119,000)",
              "rgb(255,230,000)",
              "rgb(171,255,000)",
              "rgb(009,255,000)",
              "rgb(000,255,230)",
              "rgb(000,196,255)",
              "rgb(000,051,255)",
              "rgb(188,000,255)",
              "rgb(247,000,255)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
    setTest(1);
  }, [myViews]);

  let resultname = [];
  let resultviews = [];
  const f1 = () => {
    resultname = myViews.map((x) => x.v_name);
    resultviews = myViews.map((x) => x.v_views);
    // console.log(resultname);
    // console.log(resultviews);
  };

  const myVideoViews = () => {
    axios
      //.get(`https://18.219.234.0:8080/api/videoviews/${u_id}`)
      .get(`/api/videoviews/${u_id}`)
      .then((response) => {
        //alert("record 가져오기 성공ㅎㅎ");
        // console.log(response.data);
        setMyViews(response.data);
      })
      .catch((error) => {
        // alert("record 가져오기 실패");
        // console.log(error);
      });
  };

  // slider 속성
  const settings = {
    dots: false, // 하단에 점 콘텐츠 개수 점 표시
    infinite: true, //콘텐츠 끝까지 갔을 때 처음 콘텐츠로 가져와 반복
    speed: 500, // 콘텐츠 넘길 때 속도
    slidesToShow: 4, // 한 화면에 보이는 콘텐츠 수
    slidesToScroll: 4, // 버튼 누르면 넘어가는 콘텐츠 개수
  };

  return (
    <>
      <Grid container>
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

            <Grid item>
              <Typography variant="h4" style={{ color: "white" }}>
                내 영상 리스트
              </Typography>
            </Grid>
            <br />
            <Slider {...settings}>
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
            </Slider>

          {/* <p/><p/><p/><h2>내 영상 조회수 차트</h2> */}

          {/* 2021-12-01 강동하 차트 색 수정 */}
        </div>
        <div className="container" style={{ marginTop: 25 }}>
          <p />
              <Grid item>
                <Typography variant="h4" style={{ color: "white" }}>
                  내 영상 조회수
                </Typography>
              </Grid>
              <br />
          {data2.labels == undefined && test != 1 ? null : (
            <MDBContainer>
              <Grid item style={{ marginLeft: -50}}>
                <Bar
                  data={data2.dataHorizontal}
                  options={{
                    responsive: true,
                    indexAxis: "y",
                    // 막대 두께
                    maxBarThickness: 40,
                    scales: {
                      // x축과 y축에 대한 설정을 할 수 있습니다.
                      x: {
                        // 여기서 x는 이 축의 id인데요, 이 안에서 axis 속성만 x로 지정해놓으시면 id를 x가 아니라 다른 이름으로 설정해도 무관합니다.
                        grid: {
                          // x축을 기준으로 그려지는 선(세로선)에 대한 설정입니다.
                          display: true, // 선이 아예 안 그려지게 됩니다.
                          color: "#C9AFAF", // 눈금 및 선의 색상을 지정합니다.
                        },
                        title: {
                          // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
                          display: true,
                          color: "#ffffff",
                          font: {
                            size: 17,
                          },
                          text: "조회수",
                        },
                        ticks: {
                          color: "#ffffff",
                          font: {
                            size: 16,
                          },
                        },
                      },
                      y: {
                        // 'y'라는 id를 가진 y축에 대한 설정
                        grid: {
                          // 가로선 설정
                          color: "#C9AFAF",
                        },
                        axis: "y", // 이 축이 y축임을 명시해줍니다.
                        display: true, // 축의 가시성 여부도 설정할 수 있습니다.
                        title: {
                          // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
                          display: true,
                          color: "#ffffff",
                          font: {
                            size: 17,
                          },
                          text: "영상 제목",
                        },
                        ticks: {
                          color: "#ffffff",
                          font: {
                            size: 16,
                          },
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        // 범례 스타일링
                        labels: {
                          color: "#ffffff",
                          font: {
                            // 범례의 폰트 스타일도 지정할 수 있습니다.
                            family: "'Noto Sans KR', 'serif'",
                            lineHeight: 1,
                            size: 17,
                          },
                        },
                      },
                    },
                  }}
                />
              </Grid>
            </MDBContainer>
          )}
        </div>
      </Grid>
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

export default MyContainer;
