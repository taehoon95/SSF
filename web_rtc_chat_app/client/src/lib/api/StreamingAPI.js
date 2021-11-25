import axios from "axios";

export const showStreaming = ({streaming, condition}) => 
    axios.get(`/api/showStreaming/${streaming}/${condition}`)
       
export const insertStreaming = ({streamInfo}) => 
    axios.post('/api/insertStreaming', streamInfo)

export const updateStreaming = ({u_id, l_code, l_title, l_description}) =>
    axios.patch('/api/updateStreaming', {u_id, l_code, l_title, l_description})

export const deleteStreaming = ({l_code, u_id}) =>
    axios.delete('api/deleteStreaming', {l_code, u_id})    

export const showStreamingByLnum = (l_code) => 
    axios.get(`/api/showStreamingByLnum/${l_code}`)
