import axios from 'axios';
// 로그인
export const login = ({ u_id, u_pwd }) =>
   axios.post('/api/login', { u_id, u_pwd })
//.then( response => {
//     alert("여기는 axios");
//     console.log(response.data);
//   })
//   .catch( error => {
//       alert("여기는 실패 axios")
//       console.log(error);
// });


// 로그인 상태 확인
export const check = () => axios.get('/api/check');

// 로그아웃
export const logout = () => axios.post('/api/logout');
