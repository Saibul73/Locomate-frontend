import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_PHASE === "production"
      ? process.env.REACT_APP_HOSTED_DOMAIN
      : process.env.REACT_APP_TESTING_DOMAIN,
});

export const createChat = (senderId, receiverId) =>
  API.post("/chat", { senderId, receiverId });
export const userChats = (id) => API.get(`/chat/${id}`);
