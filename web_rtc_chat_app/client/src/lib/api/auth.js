import axios from 'axios';
// 로그인
export const login = ({ u_id, u_pwd }) =>
   axios.post('/api/login', { u_id, u_pwd })
   //axios.post('https://18.219.234.0:8080/api/login', { u_id, u_pwd })
   



//아이디 찾기
export const idfind = ({u_name, u_email}) =>
   axios.post('/api/idfind', {u_name,u_email})
   //axios.post('https://18.219.234.0:8080/api/idfind', {u_name,u_email})