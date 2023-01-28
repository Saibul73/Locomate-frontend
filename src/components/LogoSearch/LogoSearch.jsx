import React, { useEffect } from "react";
import Logo from "../../img/locoLogo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import { getAllUser } from "../../Api/UserRequest";
import { useState } from "react";

export default function LogoSearch() {
  const [users, setUsers] = useState([]);
  const [person, setPerson] = useState("");
  const [searchKey,setSearchKey] = useState('')

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setUsers(data);
    };
    fetchPersons();
  }, []);

  const filterBysearch = () => {
    const user = users.filter((user) => {
      user.username.toLowerCase().includes(searchKey.toLowerCase());
    });
    setPerson(user)
  };

  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" className="logoimage" />
      <div className="Search">
        <input
          type="text"
          placeholder="Search"
          value={setSearchKey}
          onChange={filterBysearch}
        />
        {/* <div className="s-icon">
          <UilSearch />
        </div> */}
      </div>
    </div>
  );
}
