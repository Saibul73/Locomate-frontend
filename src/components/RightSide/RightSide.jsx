import React from "react";
import "./RightSide.css";
import { UilSetting } from "@iconscout/react-unicons";
import { UilHome}  from "@iconscout/react-unicons"
import { useNavigate } from "react-router-dom";
import {IoMdNotificationsOutline} from 'react-icons/io'
import {BiMessageDetail} from 'react-icons/bi'



export default function RightSide() {
  const navigate = useNavigate();
  return (
    <div className="RightSide">
      <div className="navIcons">
        <UilHome onClick={() => navigate("/home")}/>
        <UilSetting />
        <IoMdNotificationsOutline size={27} />
        <BiMessageDetail size={26} onClick={() => navigate("/chat")} />
      </div>
    </div>
  );
}
