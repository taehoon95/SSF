import axios from "axios";
import { useState } from "react";

export const videorecord = (u_id) => 

axios.get(`/api/videorecord/`+u_id).then( response => {
    alert("record 가져오기 성공ㅎㅎ");
    console.log(response.data);
  })
  .catch( error => {
      alert("record 가져오기 실패")
      console.log(error);
})