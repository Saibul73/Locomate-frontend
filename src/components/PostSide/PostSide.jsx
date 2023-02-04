import React from "react";
import "./PostSide.css";
import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function PostSide({ location }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const id = params.id;
  return (
    <div className="PostSide">
      {location !=="profilePage" || user._id === id ? (
        <div className={location === "profilePage" ? "" : "share_component"}>
          <PostShare />
        </div>
      ) : (
        ""
      )}
      <div className={location === "profilePage" ? "" : "post_component"}>
        <Posts />
      </div>
    </div>
  );
}
