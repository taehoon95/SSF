import axios from "axios";

export const videorecord = (u_id) => 

axios.get(`/api/videorecord/`+u_id).then( response => {
    console.log(response.data);
  })
  .catch( error => {
      console.log(error + "record 가져오기 실패");
})