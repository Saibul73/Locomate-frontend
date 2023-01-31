import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_PHASE === "production"
      ? process.env.REACT_APP_HOSTED_DOMAIN
      : process.env.REACT_APP_TESTING_DOMAIN,
});

export const logIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
export const updatePassword = (id, formData) =>
  API.post(`/auth/update/${id}`, formData);
