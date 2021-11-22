import axios from "axios";
import { useState } from "react";

export const videorecord = (u_id) => 

axios.get(`/api/videorecord/`+u_id).then( response => {
    //alert("record 가져오기 성공ㅎㅎ");
    console.log(response.data);
  })
  .catch( error => {
      alert("record 가져오기 실패")
      console.log(error);
})

// // 2021-11-21 강동하 마이페이지 탑5 영상 조회
// export const videoviews = (u_id) => 

// axios.get(`/api/videoviews/`+u_id).then( response => {
//     alert("views 가져오기 성공ㅎㅎ");
//     console.log(response.data);
//   })
//   .catch( error => {
//       alert("views 가져오기 실패")
//       console.log(error);
// })