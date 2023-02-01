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
      <div className="leftProfile">

      <ProfileLeft />
      </div>

      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        <PostSide location="profilePage" />
      </div>
      <div className="profilerightside">
        <div >
          <RightSide location="profilePage" />
        </div>
        <div className="test">
          <FollowersCard />
        </div>
      </div>
    </div>
  );
};
