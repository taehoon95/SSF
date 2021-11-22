import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

const MyContainer = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    myVideoList();
  }, []);

  const myVideoList = () => {
    axios
      .get(`/api/videorecord/kang97`)
      .then((response) => {
        alert("record 가져오기 성공ㅎㅎ");
        setMyList(response.data);
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
      <div className="container" style={{ marginTop: 65 }}>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <style>{cssstyle}</style>
        <div>
          <h2>내 영상 리스트</h2>
          <br/>
          <Slider {...settings}>
            {myList.map((data, idx) => (
              <div>
                <video
                  src={data.v_link}
                  controls
                  muted
                  width="320"
                  height="250"
                  />
                  <h4>
                    {data.v_name}
                  </h4>
                  <h5>
                    조회수 : &nbsp;
                    {data.v_views}
                    &nbsp; -  &nbsp;
                    {data.v_date}
                  </h5>
              </div>
            ))}
          </Slider>
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

export default MyContainer;
