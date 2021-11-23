import axios from "axios";

export const videorecord = (u_id) => 

// 비디오 리스트 가져오기 api
axios.get(`/api/videorecord/`+u_id).then( response => {
    console.log(response.data);
  })
  .catch( error => {

      console.log(error + "record 가져오기 실패");
})
      alert("record 가져오기 실패")
      console.log(error);
})

// 20211122 리스트 삭제 api
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


