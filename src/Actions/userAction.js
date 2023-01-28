import * as UserApi from "../Api/UserRequest.js";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
  
    console.log("action completed");
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAILED" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
 
  await UserApi.followUser(id, data);
  dispatch({ type: "FOLLOW_USER",data:id });
};

export const unFollowUser = (id, data) => async (dispatch) => {
  await UserApi.unFollowUser(id, data);
  dispatch({ type: "UNFOLLOW_USER",data:id });
 
};
