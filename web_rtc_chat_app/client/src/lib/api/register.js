import axios from "axios";

// export const register = ({ id, password, name, birth, gender, email, tell }) => axios.post("/api/register", { id, password, name, birth, gender, email, tell })

export const register = ({ u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell}) => 
axios.post("/api/register", { u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell })
//   .then( response => {
//     alert("회원가입 성공");
//     console.log(response.data);
//   })
//   .catch( error => {
//       alert("회원가입 실패")
//       console.log(error);
// })

export const idcheck = ({ u_id}) => 
axios.post("api/idcheck", { u_id})
  // .then( response => {
  //   console.log(response.data);
  //   alert("사용가능한 ID 입니다.")
  // })
  // .catch( error => {
  //   console.log(error);
  //   alert("이미 사용중인 ID  입니다.")
  // })
  