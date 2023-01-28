import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../Actions/userAction";

function FollowButton({person}) {
    const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };
  return <div>
      <button className="button fc-button" onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
  </div>;
}

export default FollowButton;
