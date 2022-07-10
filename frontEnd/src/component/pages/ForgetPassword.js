import React from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [forgetFormData, setForgetFormData] = React.useState({
        email: "",
        otp: "",
        verifyEmail: false,
        password:"",
        conformPassword:"",
        isValidPassWord:false,
        verifypassword:false
    })
    function handleOnChange(event) {
        const { name, value } = event.target
        setForgetFormData(preFormData => ({
            ...preFormData,
            [name]: value
        }))
    }
    
    const readonlyfun = () => {
        console.log("readonlyfun")
        
    }
    const [error,setError]=React.useState()
    async function handleOnSubmit(event) {
        event.preventDefault();
        if(forgetFormData.email!=null || forgetFormData.otp!=null){
            console.log("forgetpassword form is ready to sumbmit")
            console.log(`forgetFormData.verifyEmail ${forgetFormData.verifyEmail}`)
            console.log(`forgetFormData.isValidPassWord ${forgetFormData.isValidPassWord}`)
            if(!forgetFormData.isValidPassWord){
                var result=await fetch(forgetFormData.verifyEmail?'/bverifyotp':'/bverifyEmail',{
                    method:"POST",
                    body:JSON.stringify({forgetFormData}),
                    headers:{
                        'content-Type':'application/json'
                    }
                })
                result=await result.json()
                console.log(`result from forgetpassword ${result.result}`)
                if(result.result){
                    setForgetFormData(preFormData=>({
                        ...preFormData,
                        verifyEmail:result.result
                    }))
                }
                if(result.verifypassword){
                    console.log(`result.email=== ${result.email}`)
                    setForgetFormData(preFormData=>({
                        ...preFormData,
                        verifypassword:result.verifypassword,
                        verifyEmail:result.verifyEmail,
                        email:result.email
                    }))
                }
                if(result.err){
                    setError(result.err)
                }
            }
            else{
                if (forgetFormData.password === forgetFormData.conformPassword) {
                    if (forgetFormData.isValidPassWord) {
                      let result = await fetch("/bupdatePassword", {
                        method: "patch",
                        body: JSON.stringify({ forgetFormData }),
                        headers: {
                          "content-Type": "application/json",
                        },
                      });
                      result = await result.json();
                      console.log(result.result);
                      if (result.result) {
                        console.log("done");
                        navigate("/");
                      } else {
                        console.log(result.err);
                        setError(result.err);
                      }
                    } else {
                      setError("Password is not Stong");
                      console.log(error + "==Password is not Stong");
                    }
                } 
                else{
                    setError("Password are not Same");
                    console.log(error + "==Password are not Same");
                }    
            }
            
        }
        else{
            setError("Please Enter Email")
        }
    }
    return (
        <>
            <div className="forget-div">
                <h1>Forget Password</h1>
                <form onSubmit={handleOnSubmit}>
                    <div className="forget-container">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleOnChange}
                            value={forgetFormData.email}
                            required
                            id="email_input"
                        /><br />

                        {forgetFormData.verifyEmail && <input
                            type="number"
                            name="otp"
                            placeholder="Enter OTP"
                            onChange={handleOnChange}
                            value={forgetFormData.otp}
                            required
                            />
                        }
                        <br />
                        {forgetFormData.verifypassword && <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            required
                            onChange={handleOnChange}
                            value={forgetFormData.password}
                            />
                        }
                        <br />
                        {forgetFormData.verifypassword && <input
                            type="password"
                            name="conformPassword"
                            placeholder="Conform Password"
                            required
                            onChange={handleOnChange}
                            value={forgetFormData.conformPassword}
                            />
                        }
                        <br />
                        {forgetFormData.verifypassword && <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
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
                        }
                        {error && <span>{error}</span>}<br/>
                        <button type="submit">{forgetFormData.verifyEmail ? "Verify OTP" : "Verify Email"}</button>
                    </div>
                </form>

            </div>

        </>
    )
}
export default ForgetPassword;