import React from "react";
import "./PostSide.css";
import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";

export default function PostSide({location}) {
  return (
    <div className="PostSide">
      <div className={location === "profilePage"?'':"share_component"}><PostShare /></div>
      <div className={location === "profilePage"?'':"post_component"}><Posts /></div>
    </div>
  );
}
