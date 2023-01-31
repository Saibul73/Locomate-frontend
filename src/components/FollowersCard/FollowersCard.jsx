import React from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Actions/userAction";

export default function FollowersCard() {
  const [persons, setPersons] = useState([]);
  const [duplicatePersons, setDuplicatePersons] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.usersReducer);
  const usersVisible = 5
  const [next,setnext] = useState(usersVisible)

  // console.log(users,"aaaaa");

  // useEffect(() => {
  //   const fetchPersons = async () => {
  //     const { data } = await getAllUser();
  //     setPersons(data);
  //   };
  //   fetchPersons();
  // }, []);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  useEffect(() => {
    setPersons(users);
    setDuplicatePersons(users);
  }, []);


  // filter function
  function filterbySearch(){
    console.log(searchKey,"KEYYY");
    const tempData = duplicatePersons.filter((data)=>data.username.toLowerCase().includes(searchKey.toLowerCase()))
    console.log(tempData,"temmmpppp");
    setPersons(tempData)
  }

  const handleShowMore = ()=>{
    setnext(next + usersVisible)
  }
  return (
    <div className="FollowersCard" style={{ marginTop: "60px" }}>
      <h3>People you may know :</h3>
      <input
      className="sinput"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        onKeyUp={filterbySearch}
      />
      
      {persons.slice(0,next).map((person, id) => {
        if (person._id !== user._id) {

            return <User person={person} key={id} />;
      
        }
      })}

      {next < persons.length && 
      <button onClick={handleShowMore} className="showMore">Show More</button>}
    </div>
  );
}
