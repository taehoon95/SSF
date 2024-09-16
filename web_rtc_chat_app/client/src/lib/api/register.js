import axios from "axios";

export const register = ({ u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell}) => 
axios.post("https://teamstance.shop:8080/api/register", { u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell })
//axios.post("https://18.219.234.0:8080/api/register", { u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell })

export const idcheck = ({ u_id }) => 
axios.post("https://teamstance.shop:8080/api/idcheck", { u_id })
//axios.post("https://18.219.234.0:8080/api/idcheck", { u_id })

  