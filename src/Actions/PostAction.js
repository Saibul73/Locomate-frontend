import * as PostApi from "../Api/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RITREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const deletePost =(id,userId)=> async(dispatch)=>{
  dispatch({type: "DELETE_START"})
  try {
    await PostApi.deletePost(id,userId)
    dispatch({type:"DELETE_SUCCESS",id})
  } catch (error) {
    console.log(error);
    dispatch({type:"DELETE_FAILED"})
  }
}

export const addComment = (id,comment)=> async(dispatch)=>{
  dispatch({type: "COMMENT_START"})
try {
 const {data}= await PostApi.addComment(id,comment)
   console.log(data ,"dat is ")
  dispatch({type: "COMMENT_SUCCESS",data})
  
  console.log("COMMENT_SUCCESS");
} catch (error) {
  console.log(error)
  dispatch({type: "COMMENT_FAIL"})
}
}

export const deleteComment = (postId,commentId)=>async(dispatch)=>{
dispatch({type: "COMMDELETE_START"})
try {

  const {data}=await PostApi.deleteComment(postId,commentId)
  dispatch({type: "COMMDELETE_SUCCESS",data  })
} catch (error) {
  console.log(error);
  dispatch({type:"COMMDELETE_FAIL"})
}
}
