import axios from "axios";

// 2021-12-10 윤성준 video 삭제 api
export const deleteVideo = ({ u_id, v_code }) =>
  axios.post("/api/videoDelete", { u_id, v_code } );



