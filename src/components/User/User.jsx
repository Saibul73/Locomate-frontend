import React from "react";

import { useNavigate } from "react-router-dom";
import FollowButton from "../FollowButton/FollowButton";

function User({ person }) {
  const navigate = useNavigate();
  const imageURL =
    process.env.REACT_APP_PHASE === "production"
      ? process.env.REACT_APP_PUBLIC_FOLDER_HOSTED
      : process.env.REACT_APP_PUBLIC_FOLDER;
  const serverPublic = imageURL;

  const handleProfile = () => {
    navigate(`/profile/${person._id}`);
  };

  return (
    <div className="Follower">
      <div onClick={handleProfile} style={{ cursor: "pointer" }}>
        <img
          src={
            person?.profilePicture
              ? serverPublic + person?.profilePicture
              : serverPublic + "profiledemo.webp"
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>{person.name}</span>
          <span>{person.username}</span>
        </div>
      </div>

      <FollowButton person={person} />
    </div>
  );
}

export default User;
