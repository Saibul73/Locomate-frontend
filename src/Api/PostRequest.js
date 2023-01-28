import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });

export const deletePost = (id, userId) => {
  return API.delete(`/post/${id}/${userId}`);
};

export const addComment = (id, comment) => {
  return API.put(`/post/comment/${id}`, { comment });
};

export const deleteComment = (postId,commentId) =>{
  console.log("api request");
  return API.delete(`/post/comment/${commentId}/${postId}`)
}

export const commentFetching=(postId)=>API.get(`/post/comment/${postId}`);