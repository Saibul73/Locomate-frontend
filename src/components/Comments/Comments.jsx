import React ,{useEffect}from "react";
import "./Comments.css";
import InputEmoji from "react-input-emoji";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../../Actions/PostAction";
import { format } from "timeago.js";
import { MdOutlineDeleteForever } from "react-icons/md";
import { commentFetching } from "../../Api/PostRequest";
import { toast } from "react-toastify";
import {message} from "antd"

function Comments({ data }) {
  const [commentString, setCommentString] = useState("");
  const [comments ,setComment]=useState([])
  const { user } = useSelector((state) => state.authReducer.authData);
  const {comment}=useSelector((state) => state.postReducer)
  useEffect(() => {
    const commentFetch=async()=>{
     const datas=await commentFetching(data._id);
     console.log(datas.data.datas)
     setComment(datas.data.datas.comments)
    }
    commentFetch();
  

  }, [comment])
  
  const dispatch = useDispatch();

  const handleCommentChange = (text) => {
    setCommentString(text);
  };
  console.log(commentString);
  const handlesubmit = (e) => {
    e.preventDefault();
    const comment = {
      commentedUser: user.firstname + " " + user.lastname,
      comment: commentString,
      time: Date(),
      user: user._id,
    };
    if(commentString === ''){
      message.error("Write something")
        return 
    }else if(commentString.indexOf(' ') === 0){
      message.error("Can't use white space at the beginning")
      return
    }
    dispatch(addComment(data._id, comment));
    setCommentString("");
  };

  const handleDelete = (comment) => {
    const postId = data._id;
    const commentId = comment._id;
    console.log(commentId);
    dispatch(deleteComment(postId, commentId));
  };
  return (
    <>
      <div className="container">
        <div>
          {comments?.map((result) => {
            return (
              <div className="commdata">
               {user._id === result.user?<span className="comdelete">
                  <MdOutlineDeleteForever
                    size={15}
                    color="red"
                    onClick={() => handleDelete(result)}
                  />
                </span>:''
               } 
                <div style={{ fontSize: "15" }}>{result.commentedUser}</div>
                <div style={{ fontSize: "13px" }}>
                  {result.comment}
                  <span
                    style={{
                      fontSize: "7px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {format(result.time)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="type">
          <InputEmoji
            value={commentString}
            placeholder="Comment here..."
            onChange={handleCommentChange}
          />
          <button className="postStyle" onClick={handlesubmit}>
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default Comments;
