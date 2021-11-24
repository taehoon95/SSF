import axios from 'axios';
// 로그인
export const login = ({ u_id, u_pwd }) =>
   axios.post('/api/login', { u_id, u_pwd })
   



//아이디 찾기
export const idfind = ({u_name, u_email}) =>
   axios.post('api/idfind', {u_name,u_email})

//비밀번호 찾기
export const pwdfind = ({u_id,u_name,u_email}) =>
axios.post('api/pwdfind',{u_id,u_name,u_email})


//비밀번호 변경
export const pwdupdate = ({ u_id,u_pwd}) => 
 axios.patch('api/pwdupdate',{ u_id,u_pwd} )
//  .then( (response) =>  {
//     console.log(response.data);
//  })
//  .catch( (error) => {
//     console.log(error);
//  })
