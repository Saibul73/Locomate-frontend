import React from "react";
import "./Profile.css";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import FollowersCard from "../../components/FollowersCard/FollowersCard";

export const Profile = () => {
  return (
    <div className="profile">
      <ProfileLeft />

      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>
      <div>
      <RightSide />
      <FollowersCard />
      </div>
      
    </div>
  );
};
