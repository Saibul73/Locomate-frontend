import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Actions/AuthAction";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import PasswordModal from "../PasswordModal/PasswordModal";
import { useEffect } from "react";
import * as UserApi from "../../Api/UserRequest.js";

export default function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const user = useSelector((state) => state.authReducer.authData.user);
  const [privacy, setPrivacy] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth");
  };

  const handlePrivacy = () => {
    const prev = privacy;
    setPrivacy(!prev);
  };
  return (
    <div className="InfoCard">
      <div className="InfoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status :</b>
        </span>
        <span> {profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives In :</b>
        </span>
        <span> {profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at :</b>
        </span>
        <span> {profileUser.worksAt}</span>
      </div>
      {user._id === profileUserId ? (
        <div className="infobuttons">
          <button className="privacy-button" onClick={handlePrivacy}>
            Privacy & Security
          </button>
          <button className="button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        ""
      )}
      {privacy ? (
        <div className="changePass">
          <div onClick={() => setPasswordOpen(true)} style={{cursor:"pointer"}}>Change password</div>
          <PasswordModal
            passwordOpen={passwordOpen}
            setPasswordOpen={setPasswordOpen}
            data={user}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
