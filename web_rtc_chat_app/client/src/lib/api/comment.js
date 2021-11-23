import axios from "axios";

export const commentInsert = ({ v_code, m_text, u_id }) =>
axios.post("/api/comment", { v_code, m_text, u_id })

