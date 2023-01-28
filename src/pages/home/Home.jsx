import React from "react";
import FollowersCard from "../../components/FollowersCard/FollowersCard";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileside/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <div className="home_profile">
        <ProfileSide />
      </div>
      <div className="home_postside">
        <PostSide />
      </div>
      <div className="test">
        <RightSide />
        <FollowersCard />
      </div>
    </div>
  );
}

export default Home;
