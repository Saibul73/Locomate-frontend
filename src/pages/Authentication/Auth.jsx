import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/locoLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, reset, signUp } from "../../Actions/AuthAction";
import { useEffect } from "react";

export default function Auth() {
  const dispatch = useDispatch();
  const {loading,message} = useSelector((state) => state.authReducer);
  
  const [isSignUp, setIsSignUP] = useState(true);
  const [validation, setValidation] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    password: "",
    confirmpassword: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(true);
  const handleChange = (e) => {
    dispatch(reset())
    setConfirmPassword(true)
    setValidation(false)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (
        data.firstname === "" ||
        data.lastname === "" ||
        data.username === "" ||
        data.password === ""
      ) {
        setValidation(true);
      }

      data.password === data.confirmPassword
        ? dispatch(signUp(data))
        : setConfirmPassword(false);
    } else {
      console.log("login call");
      dispatch(logIn(data));
    }
  };
  useEffect(()=>{
    dispatch(reset())
  },[])

  const resetForm = () => {
    setConfirmPassword(true);
    setData({
      firstname: "",
      password: "",
      confirmpassword: "",
      username: "",
    });
  };

  return (
    <div className="Auth">
      {/* Left side*/}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>LOCOMATE</h1>
          {/* <h6>Explore the Crowd</h6> */}
        </div>
      </div>
      {/* Right Side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

          <span
            style={{
              display: !validation ? "none" : "block",
              color: "red",
              fontSize: "12px",
            }}
          >
            * Fields missing
          </span>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div className="userNameDiv">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="infoInput"
              onChange={handleChange}
              value={data.username}
            />
          </div>

       

          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="infoInput"
              onChange={handleChange}
              value={data.password}
            />
            
            {isSignUp && (
              <input
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="infoInput"
                onChange={handleChange}
                value={data.confirmPassword}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPassword ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>

          <span
            style={{
              display: !message ? "none" : "block",
              color: "red",
              fontSize: "12px",
            }}
          >
            {message}
          </span>

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUP((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account? Login!"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
