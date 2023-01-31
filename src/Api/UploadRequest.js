import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_PHASE === "production" ? process.env.REACT_APP_HOSTED_DOMAIN : process.env.REACT_APP_TESTING_DOMAIN});

export const uploadImage = (data) => API.post("/upload/", data);

export const uploadPost = (data) => API.post("/post", data);
