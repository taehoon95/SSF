import axios from "axios";




// 20211120 윤성준 비디오 리스트 가져오기 api
export const videorecord = () => 
axios
  .get(`/api/videorecord/kang97`)
  .then( response => {
    //alert("record 가져오기 성공ㅎㅎ");
    console.log(response.data);
  })
  .catch( error => {
      //alert("record 가져오기 실패")
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


