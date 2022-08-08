import React from "react";
import Footer from "../Footer";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";

import AlertBlock from "../AlertBlock";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetFormData, setForgetFormData] = React.useState({
    email: "",
    otp: "",
    verifyEmail: false,
    password: "",
    conformPassword: "",
    isValidPassWord: false,
    verifypassword: false,
  });

  const [consoleErr, setConsoleErr] = React.useState();
  const showErrFunc = () => {
    setConsoleErr(null);
  };
  function handleOnChange(event) {
    const { name, value } = event.target;
    setForgetFormData((preFormData) => ({
      ...preFormData,
      [name]: value,
    }));
  }
  window.scrollTo(0, 0);

  // const readonlyfun = () => {
  //     console.log("readonlyfun")
  // }
  async function handleOnSubmit(event) {
    event.preventDefault();
    if (forgetFormData.email != null || forgetFormData.otp != null) {
      console.log("forgetpassword form is ready to sumbmit");
      console.log(`forgetFormData.email ${forgetFormData.email}`);
      console.log(`forgetFormData.verifyEmail ${forgetFormData.verifyEmail}`);
      console.log(
        `forgetFormData.isValidPassWord ${forgetFormData.isValidPassWord}`
      );
      if (!forgetFormData.isValidPassWord) {
        var result = await fetch(
          forgetFormData.verifyEmail ? "/bverifyotp" : "/bverifyEmail",
          {
            method: "POST",
            body: JSON.stringify({ forgetFormData }),
            headers: {
              "content-Type": "application/json",
            },
          }
        );
        result = await result.json();
        console.log(`result from forgetpassword ${result.result}`);
        if (result.result) {
          setForgetFormData((preFormData) => ({
            ...preFormData,
            verifyEmail: result.result,
          }));
        }
        if (result.verifypassword) {
          console.log(`result.email=== ${result.email}`);
          setForgetFormData((preFormData) => ({
            ...preFormData,
            verifypassword: result.verifypassword,
            verifyEmail: result.verifyEmail,
            
          }));
        }
        if (result.err) {
          setConsoleErr(result.err);
        }
      } else {
        if (forgetFormData.password === forgetFormData.conformPassword) {
          if (forgetFormData.isValidPassWord) {
            let result = await fetch("/bupdatePassword", {
              method: "put",
              body: JSON.stringify({ forgetFormData }),
              headers: {
                "content-Type": "application/json",
              },
            });
            result = await result.json();
            console.log(result.result);
            if (result.result) {
              console.log("done");
              alert("You'r Password is Updated")
              navigate("/login");
            } else {
              console.log(result.err);
              setConsoleErr(result.err);
            }
          } else {
            console.log("==Password is not Stong");
            setConsoleErr("Please Enter Stong Password");
          }
        } else {
          console.log("==Password are not Same");
          setConsoleErr("Please Enter Same Password");
        }
      }
    } else {
      console.log("Please Enter Email");
      setConsoleErr("Please Enter Email");
    }
  }

  let passsvalidCSS = {
    display: "grid",
    justifyContent: "center",
    margin: "auto",
  };
  
  return (
    <>
      {consoleErr && (
        <AlertBlock consoleErr={consoleErr} showErrFunc={showErrFunc} />
      )}
      <div className="forget-div">
        <h1 className="heading">
          <>Forget </><span>Password</span>
        </h1>
        <form onSubmit={handleOnSubmit}>
          <div className="forget-container">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleOnChange}
              value={forgetFormData.email}
              required
            />

            {forgetFormData.verifyEmail && (
              <input
                type="number"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleOnChange}
                value={forgetFormData.otp}
                required
              />
            )}
            {forgetFormData.verifypassword && (
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                onChange={handleOnChange}
                value={forgetFormData.password}
              />
            )}
            {forgetFormData.verifypassword && (
              <input
                type="password"
                name="conformPassword"
                placeholder="Conform Password"
                required
                onChange={handleOnChange}
                value={forgetFormData.conformPassword}
              />
            )}
            {forgetFormData.verifypassword && (
              <PasswordChecklist 
              style={passsvalidCSS}
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={forgetFormData.password}
                valueAgain={forgetFormData.conformPassword}
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
                  setForgetFormData((preFormData) => ({
                    ...preFormData,
                    isValidPassWord: isValid ? true : false,
                  }))
                }
              />
            )}
            <button type="submit">
              {forgetFormData.verifyEmail ? "Verify OTP" : forgetFormData.verifypassword?"New Password" :"Verify Email"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default ForgetPassword;
