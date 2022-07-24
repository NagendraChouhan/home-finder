import Footer from "../Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { validate } from "react-email-validator";
import {Cookies } from 'react-cookie';
import React from "react";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const cookies=new Cookies()
        const token=cookies.get('token')
        if(token){
            navigate('/')
        }
    window.scrollTo(0, 0)

  })

  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
    isValidPassWord: false,
  });

  function handleOnChange(event) {
    const { name, value } = event.target;

    setSignupFormData((preFormData) => ({
      ...preFormData,
      [name]: value,
    }));
  }

  const [error, setError] = useState();
  async function handleOnSubmit(event) {
    event.preventDefault();
    if (
      signupFormData.email.length > 0 &&
      signupFormData.firstName.length > 0 &&
      signupFormData.lastName.length > 0 &&
      signupFormData.password.length > 0 &&
      signupFormData.conformPassword.length > 0
    ) {
      if (validate(signupFormData.email)) {
        if (signupFormData.password === signupFormData.conformPassword) {
          if (signupFormData.isValidPassWord) {
            let result = await fetch("/bsignup", {
              method: "post",
              body: JSON.stringify({ signupFormData }),
              headers: {
                "content-Type": "application/json",
              },
            });
            result = await result.json();
            console.log(result);
            if (result.result) {
              console.log("done");
              navigate("/login");
            } else {
              console.log(result.err);
              setError(result.err);
            }
          } else {
            setError("Password is not Stong");
            console.log(error + "==Password is not Stong");
          }
        } else {
          setError("Password are not Same");
          console.log(error + "==Password are not Same");
        }
      } else {
        setError("Email is not Valid");
        console.log(error + "==Email is not Valid");
      }
    } else {
      setError("All field are Required");
      console.log(error + "==All field are Required");
    }
  }

  return (
    <>
      <div className="signup-div">
        <h1>Signup</h1>

        <form onSubmit={handleOnSubmit}>
          <div className="Signup-container">
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              required
              onChange={handleOnChange}
              value={signupFormData.firstName}
            />
            <br />
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              required
              onChange={handleOnChange}
              value={signupFormData.lastName}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              onChange={handleOnChange}
              value={signupFormData.email}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              onChange={handleOnChange}
              value={signupFormData.password}
            />
            <br />
            <input
              type="password"
              name="conformPassword"
              placeholder="Conform Password"
              required
              onChange={handleOnChange}
              value={signupFormData.conformPassword}
            />
            <br />
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={signupFormData.password}
              valueAgain={signupFormData.conformPassword}
              messages={{
                minLength: "Password has more than 8 characters.",
                specialChar:
                  "Password has special characters like [@,#,$,& etc].",
                number: "Password has a number.",
                capital: "Password has a capital letter.",
                match: "Passwords match.",
              }}
              name="isValidPassWord"
              onChange={(isValid) =>
                setSignupFormData((preFormData) => ({
                  ...preFormData,
                  isValidPassWord: isValid ? true : false,
                }))
              }
            />
            <br />
            {error && <span className="error-span">{error}</span>}
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};
export default Signup;
