import axios from 'axios';
// 로그인
export const login = ({ u_id, u_pwd }) =>
   axios.post('/api/login', { u_id, u_pwd })
   //axios.post('https://18.219.234.0:8080/api/login', { u_id, u_pwd })
   



//아이디 찾기
export const idfind = ({u_name, u_email}) =>
axios.post('/api/idfind', {u_name,u_email})
//axios.post('https://18.219.234.0:8080/api/idfind', {u_name,u_email})

//비밀번호 찾기
export const pwdfind = ({u_id,u_name,u_email}) =>
axios.post('api/pwdfind',{u_id,u_name,u_email})


//비밀번호 변경
export const pwdupdate = ({ u_id,u_pwd}) => 
 axios.patch('api/pwdupdate',{ u_id,u_pwd} )

 //비밀번호찾기 아이디체크
 export const pwdidcheck = ({u_id}) =>
 axios.post('api/pwdidcheck',{u_id})
 
 
//  .then( (response) =>  {
//     console.log(response.data);
//  })
//  .catch( (error) => {
//     console.log(error);
//  })

