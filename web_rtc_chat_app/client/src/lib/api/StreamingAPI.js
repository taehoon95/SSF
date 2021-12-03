import axios from "axios";

// 2021 1125 이태훈 스트리밍 리스트
export const showStreaming = ({ streaming, condition }) =>
  axios.get(`/api/showStreaming/${streaming}/${condition}`);

// 2021 1125 이태훈 스트리밍 방만들기
export const insertStreaming = ({ streamInfo }) =>
  axios.post("/api/insertStreaming", streamInfo);

// 2021 1125 이태훈 스트리밍 방 이름 ,description 변경
export const updateStreaming = ({ u_id, l_code, l_title, l_description }) =>
  axios.patch("/api/updateStreaming", { u_id, l_code, l_title, l_description });

// 2021 1125 이태훈 방송종료 후 스트리밍 방 삭제
// delete는 data로 값을 감싸자
export const deleteStreaming = ( { u_id, l_code } ) =>
  axios.delete("/api/deleteStreaming", {data:{ u_id, l_code }});

// 2021 1125 이태훈 l_num으로 스트리밍 방 상세 검색
export const showStreamingByLnum = ({ l_code }) =>
  axios.get(`/api/showStreamingByLnum/${l_code}`);
