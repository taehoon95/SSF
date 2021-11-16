import axios from "axios";

export const showTest = () => axios.get("/api/showTest");

export const upload = (formData) => axios.post("http://localhost:8080/api/upload",formData);