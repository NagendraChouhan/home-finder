import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

import AlertBlock from "../AlertBlock";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  });

  const [loginFormData, setLOginFormData] = React.useState({
    email: "",
    password: "",
  });

  const [consoleErr, setConsoleErr] = React.useState();
  const showErrFunc = () => {
    setConsoleErr(null);
  };

  function handleOnchange(event) {
    const { name, value } = event.target;
    setLOginFormData((preFromData) => ({
      ...preFromData,
      [name]: value,
    }));
    console.log(event.target.value);
  }

  async function handleFormData(event) {
    event.preventDefault();
    if (loginFormData.email !== "") {
      if (loginFormData.password !== "") {
        console.log("form is ready to sumbmit");
        let result = await fetch("/blogin", {
          method: "POST",
          body: JSON.stringify({ loginFormData }),
          headers: {
            "content-Type": "application/json",
          },
        });
        result = await result.json();
        console.log(result.result);
        console.log(result.err);
        if (result.result) {
          console.log(result);
          console.log(result.token);
          const cookies = new Cookies();
          cookies.set("token", result.token);

          navigate("/");
        } else {
          setConsoleErr(result.err);
        }
      } else {
        setConsoleErr("Please Enter Password");
        console.log("Type Password");
      }
    } else {
      setConsoleErr("Please Enter Email");

      console.log("Type Email");
    }
  }
  return (
    <>
      {consoleErr && (
        <AlertBlock consoleErr={consoleErr} showErrFunc={showErrFunc} />
      )}
      <div className="login-div">
        <h3>Login Page</h3>
        <form onSubmit={handleFormData}>
          <div className="login-container">
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
              onChange={handleOnchange}
              value={loginFormData.email}
            />
            <br />

            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleOnchange}
              value={loginFormData.password}
            />
            <br />
            <button type="submit">Log In</button>
            <br />
            <Link to="/signup">
              <button type="button" className="signupbtn">
                Sign Up
              </button>
            </Link>
            <span className="forget-psw">
              Forgot <Link to="/forgetPassword">password?</Link>
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default Login;
