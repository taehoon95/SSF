import axios from "axios";
import { useState } from "react";



// 20211120 윤성준 비디오 리스트 가져오기 api
export const videorecord = (u_id) => 
axios
  .get(`/api/videorecord/`+u_id)
  .then( response => {
    //alert("record 가져오기 성공ㅎㅎ");
    console.log(response.data);
  })
  .catch( error => {
      //alert("record 가져오기 실패")
      console.log(error);
})

// 20211122 윤성준 리스트 삭제 api
export const deleteListLine = ( v_code ) => {
  console.log(v_code);
  axios
  .post(`/api/videoDelete`, { u_id:'kang97', v_code})
  .then((response) => {
    console.log(response);
    
    alert("삭제 성공");
  })
  .catch((error) => {
    alert("삭제 실패");
    console.log(error);
  });
}

// 20211122 리스트 수정 api
// export const deleteListLine = ( v_code ) => {
//   console.log(v_code);
//   axios
//   .post(`/api/videoDelete`, { u_id:'kang97', v_code})
//   .then((response) => {
//     console.log(response);
    
//     alert("리스트 수정 성공");
//   })
//   .catch((error) => {
//     alert("리스트 삭제 실패");
//     console.log(error);
//   });
// }

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
