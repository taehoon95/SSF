import axios from "axios";

export const register = ({ u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell}) => 
axios.post("/api/register", { u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell })

export const idcheck = ({ u_id }) => 
axios.post("api/idcheck", { u_id })

  