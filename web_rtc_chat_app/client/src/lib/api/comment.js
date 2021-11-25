// 2021-11-22 강동하 댓글 관련 api
import axios from "axios";

export const commentInsert = ({ v_code, m_text, u_id }) =>
axios.post("/api/comment", { v_code, m_text, u_id })
//axios.post("https://18.219.234.0:8080/api/comment", { v_code, m_text, u_id })

export const commentUpdate = ({ m_num, m_text }) =>
axios.patch("/api/commentupdate",  { m_num, m_text })
//axios.patch("https://18.219.234.0:8080/api/commentupdate",  { m_num, m_text })

export const commentDelete = ({ m_num }) =>
axios.delete("/api/commentdelete",  { data : { m_num }})
//axios.delete("https://18.219.234.0:8080/api/commentdelete",  { data : { m_num }})

