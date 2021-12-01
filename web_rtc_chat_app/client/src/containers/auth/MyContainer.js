import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Legend } from "chart.js";
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

  // const data2 = {
  //   dataHorizontal: {
  //     labels: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
  //     labels: resultname,
  //     datasets: [
  //       {
  //         label: "My First Dataset",
  //         data: [22, 33, 55, 12, 86, 23, 14],
  //         data: resultviews,
  //         fill: false,
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(255, 159, 64, 0.2)",
  //           "rgba(255, 205, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(201, 203, 207, 0.2)",
  //         ],
  //         borderColor: [
  //           "rgb(255, 99, 132)",
  //           "rgb(255, 159, 64)",
  //           "rgb(255, 205, 86)",
  //           "rgb(75, 192, 192)",
  //           "rgb(54, 162, 235)",
  //           "rgb(153, 102, 255)",
  //           "rgb(201, 203, 207)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  // };

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
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  //2021-11-21 강동하 마이페이지 탑5 영상 조회
  const [data2, setData2] = useState([]);

  const [myViews, setMyViews] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    myVideoViews();
  }, []);

  useEffect(() => {
    f1();
    console.log(resultname);
    setData2({



      dataHorizontal: {
        labels: resultname,
        datasets: [
          {
            label: "My First Dataset",
            data: resultviews,
            fill: false,
            backgroundColor: [
              "rgb(255,99,132)",
              "rgb(000,000,255)",
              "rgb(153,102,255)",
              "rgb(255,000,051)",
              "rgb(153,051,255)",
              "rgb(051,204,255)",
              "rgb(153,255,204)",
              "rgb(102,204,255)",
              "rgb(153,153,255)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(000,000,255)",
              "rgb(153,102,255)",
              "rgb(255,000,051)",
              "rgb(153,051,255)",
              "rgb(051,204,255)",
              "rgb(153,255,204)",
              "rgb(102,204,255)",
              "rgb(153,153,255)",
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
    console.log(resultname);
    console.log(resultviews);
  };

  const myVideoViews = () => {
    axios
      //.get(`https://18.219.234.0:8080/api/videoviews/${u_id}`)
      .get(`/api/videoviews/${u_id}`)
      .then((response) => {
        //alert("record 가져오기 성공ㅎㅎ");
        console.log(response.data);
        setMyViews(response.data);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
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
          <div>
            <Grid item>
              <Typography
                variant="h4"
                style={{ color: "white", marginLeft: " 35px" }}
              >
                내 영상 리스트
              </Typography>
            </Grid>
            <br />
            <Slider {...settings}>
              {myList.map((data, idx) => (
                <div key={idx}>
                  <Grid item style={{ marginTop: 10 }}>
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
            </Slider>
          </div>
          {/* <p/><p/><p/><h2>내 영상 조회수 차트</h2> */}
        </div>
        <div className="back" style={{ marginTop: 25 }}>
          <p />
          {data2.labels == undefined && test != 1 ? null : (
            <MDBContainer >
              <Grid item>
                <Typography variant="h4" style={{ color: "white" }}>
                  내 영상 조회수
                </Typography>
                <Bar
                  data={data2.dataHorizontal}
                  options={{ responsive: true, indexAxis: "y" }}
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
.back{
  display: flex;
  justify-content: center;
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
