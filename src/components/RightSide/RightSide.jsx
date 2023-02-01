import React from "react";
import "./RightSide.css";
import { UilSetting } from "@iconscout/react-unicons";
import { UilHome}  from "@iconscout/react-unicons"
import { useNavigate } from "react-router-dom";
import {IoMdNotificationsOutline} from 'react-icons/io'
import {BiMessageDetail} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import{BsSearch} from 'react-icons/bs'
import { useSelector } from "react-redux";



export default function RightSide({location}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.authData.user);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <UilHome onClick={() => navigate("/home")}/>
       {location === "profilePage"? <UilSetting />:""} 
       {location === "profilePage"?"":<CgProfile size={25} onClick={()=> navigate(`/profile/${user._id}`)}/>}
        <BsSearch size={25}/>
        <IoMdNotificationsOutline size={27} />
        <BiMessageDetail size={26} onClick={() => navigate("/chat")} />
      </div>
    </div>
  );
}
