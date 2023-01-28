import React from "react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { followUser, unFollowUser } from "../../Actions/userAction";
import FollowButton from "../FollowButton/FollowButton";

function User({ person }) {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [following, setFollowing] = useState(
  //   person.followers.includes(user._id)
  // );

  // const handleFollow = () => {
  //   following
  //     ? dispatch(unFollowUser(person._id, user))
  //     : dispatch(followUser(person._id, user));

  //   setFollowing((prev) => !prev);
  // };

  const handleProfile = () => {
    navigate(`/profile/${person._id}`);
  };

  return (
    <div className="Follower">
      <div onClick={handleProfile} style={{cursor:"pointer"}}>
        <img src={  person?.profilePicture
                ? serverPublic + person?.profilePicture
                : serverPublic + "profiledemo.webp"}alt="" className="followerImg" />
        <div className="name">
          <span>{person.name}</span>
          <span>{person.username}</span>
        </div>
      </div>
      {/* <button className="button fc-button" onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button> */}
      <FollowButton person={person}/>
    </div>
  );
}

export default User;
