import axios from "axios";

// 20211120 윤성준 비디오 리스트 가져오기 api
export const videorecord = (u_id) => 
axios
  .get(`/api/videorecord/${u_id}`)
  //.get(`https://18.219.234.0:8080/api/videorecord/kang97`)
  .then( response => {
    //alert("record 가져오기 성공ㅎㅎ");
    // console.log(response.data);
  })
  .catch( error => {
      //alert("record 가져오기 실패")
  })

// 20211122 윤성준 리스트 삭제 api
export const deleteListLine = ( u_id, v_code ) => {
  // console.log(v_code);
  axios
  .post(`/api/videoDelete`, { u_id, v_code})
  //.post(`https://18.219.234.0:8080/api/videoDelete`, { u_id, v_code})
  .then((response) => {
    // console.log(response);
    videorecord(u_id)
    // alert("삭제 성공");
  })
  .catch((error) => {
    // alert("삭제 실패");
    // console.log(error);
  });
}
