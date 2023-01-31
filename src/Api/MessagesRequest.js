import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_PHASE === "production" ? process.env.REACT_APP_HOSTED_DOMAIN : process.env.REACT_APP_TESTING_DOMAIN});

export const getMessages = (id)=>API.get(`/message/${id}`)
export const addMessage = (data)=> API.post('message/',data)
