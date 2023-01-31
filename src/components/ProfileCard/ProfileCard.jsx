import React, { useEffect } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../../Api/UserRequest";
import coverPicture from "../../img/Cover.png";
import FollowButton from "../FollowButton/FollowButton";
import { createChat } from "../../Api/ChatRequest";

export default function ProfileCard({ location }) {
  const user = useSelector((state) => state.authReducer.authData.user);
  const navigate = useNavigate();
  const posts = useSelector((state) => state.postReducer.posts);
  const imageURL =
    process.env.REACT_APP_PHASE === "production"
      ? process.env.REACT_APP_PUBLIC_FOLDER_HOSTED
      : process.env.REACT_APP_PUBLIC_FOLDER;
  const serverPublic = imageURL;
  const params = useParams();
  const [person, setPerson] = useState([]);

  let id = params.id;
  if (location !== "profilePage") {
    id = user._id;
  }
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getUser(id);
      setPerson(data);
    };
    fetchPersons();
  }, [user.following]);

  const handleMesssage = async () => {
    await createChat(user._id, id);
    navigate("/chat");
  };
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <div className="ProfileCover">
          <img
            src={
              person?.coverPicture
                ? serverPublic + person?.coverPicture
                : coverPicture
            }
            alt=""
          />
        </div>
        <div className="proPic">
          <img
            src={
              person?.profilePicture
                ? serverPublic + person?.profilePicture
                : serverPublic + "profiledemo.webp"
            }
            alt=""
          />
        </div>
      </div>
      <div className="ProfileName">
        <span>
          {person?.firstname} {person?.lastname}
        </span>
        <span>
          {person?.worksAt ? person?.worksAt : "Write about yourself..."}
        </span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{person?.following?.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{person?.followers?.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === person?._id)?.length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {id !== user._id ? (
        <div className="userButton">
          {/* <FollowButton person={person}/> */}
          <button className="button fc-button" onClick={handleMesssage}>
            Message
          </button>
        </div>
      ) : (
        ""
      )}

      {location === "profilePage" ? (
        ""
      ) : (
        <span
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
        >
          My Profile
        </span>
      )}
    </div>
  );
}
