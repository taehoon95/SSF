import axios from "axios";

// 2021-11-25 이태훈 스트리밍 리스트(조건: l_description, l_title, u_id)
export const showStreaming = ({ streaming, condition }) =>
  axios.get(`https://teamstance.shop:8080/api/showStreaming/${streaming}/${condition}`);

// 2021-11-25 이태훈 스트리밍 방만들기
export const insertStreaming = ({ streamInfo }) =>
  axios.post("https://teamstance.shop:8080/api/insertStreaming", streamInfo);

// 2021-11-25 이태훈 스트리밍 방 이름 ,description 변경
export const updateStreaming = ({ u_id, l_code, l_title, l_description }) =>
  axios.patch("https://teamstance.shop:8080/api/updateStreaming", { u_id, l_code, l_title, l_description });

// 2021-11-25 이태훈 방송종료 후 스트리밍 방 삭제
// delete는 data로 값을 감싸자
export const deleteStreaming = ( { u_id, l_code } ) =>
  axios.delete("https://teamstance.shop:8080/api/deleteStreaming", {data:{ u_id, l_code }});

// 2021-11-25 이태훈 l_num으로 스트리밍 방 상세 검색
export const showStreamingByLnum = ({ l_code }) =>
  axios.get(`https://teamstance.shop:8080/api/showStreamingByLnum/${l_code}`);

// 2021-12-02 이태훈 검색 시 스트리밍 리스트
export const showSearchStreaming = ({search}) =>
  axios.get(`https://teamstance.shop:8080/api/showSearchStreaming/${search}`)

// 2021-12-02 이태훈 비디오 무한 스크롤
export const showInfiniteVideoSearch = (search, pageNum) => 
  axios.get(`https://teamstance.shop:8080/api/videoInfiniteSearch/${search}/${pageNum}`)

// 2021-12-03 이태훈 스트리밍 무한 스크롤
export const showInfiniteStreamingSearch = (search, pageNum) => 
  axios.get(`https://teamstance.shop:8080/api/streamingInfiniteSearch/${search}/${pageNum}`)

