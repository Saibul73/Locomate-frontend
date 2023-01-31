import React from "react";
import "./Post.css";
import Share from "../../img/share.png";
import Heart from "../../img/heart.png";
import NotLike from "../../img/dislike.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "../../Api/PostRequest";
import { Dropdown } from "antd";
import { BiDotsVertical } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { getUser } from "../../Api/UserRequest";
import { deletePost } from "../../Actions/PostAction";
import Comments from "../Comments/Comments";
import { useEffect } from "react";
import {format} from 'timeago.js'

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const postData = useSelector((state) => state.postReducer.posts);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const imageURL =
    process.env.REACT_APP_PHASE === "production"
      ? process.env.REACT_APP_PUBLIC_FOLDER_HOSTED
      : process.env.REACT_APP_PUBLIC_FOLDER;
  const serverPublic = imageURL;
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState("");

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDelete = () => {
    const id = data._id;
    const userId = user._id;
    dispatch(deletePost(id, userId));
  };

  const handleCommentSection = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const ownerId = data.userId;
    const ownerfetch = async () => {
      const { data } = await getUser(ownerId);
      setOwner(data);
    };
    ownerfetch();
  }, []);

  //==========================================================
  // dropdown menu
  const items = [
    {
      key: "1",
      label: (
        <div className="delete" onClick={handleDelete}>
          <RiDeleteBin6Line size={20} color="red" />
          <p style={{ fontSize: "14px" }}>Delete</p>
        </div>
      ),
    },
  ];

  //===========================================================

  return (
    <div className="Post">
      <div className="post-head">
        <div className="post-head-left">
          <div className="post-profilePIc">
            <img
              src={
                owner?.profilePicture
                  ? serverPublic + owner.profilePicture
                  : serverPublic + "profiledemo.webp"
              }
              alt=""
            />
          </div>
          <div className="post-profileName">
            <span>{owner.firstname +" "+ owner.lastname}</span>
            <span>{format(data.createdAt)}</span>
          </div>
        </div>
        {user._id === data.userId && (
          <div className="post-head-right">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "none",
                }}
              >
                <BiDotsVertical size={27} />
              </button>
            </Dropdown>
          </div>
        )}
      </div>

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <FaRegCommentDots size={24} onClick={handleCommentSection} />
        <img src={Share} alt="" />
      </div>

      <span style={{ fontSize: "12px" }}>{likes} likes</span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>

      <div className="comment">
        {open && (
          <div>
            <span style={{ fontWeight: "bold" }}>Comments</span>{" "}
            <hr
              style={{
                border: 0,
                height: "1px",
                backgroundImage:
                  "linear-gradient(to right, rgba(0, 0, 0, 0), white, rgba(0, 0, 0, 0))",
              }}
            />
            <Comments data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
