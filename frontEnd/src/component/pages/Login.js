import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Cookies } from 'react-cookie';
import tokenvarify from '../../function/function'




const Login = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const cookies=new Cookies()
        const token=cookies.get('token')
        if(token){
            navigate('/')
        }
    })

    const [loginFormData, setLOginFormData] = React.useState({
        email: "",
        password: ""
    })

    function handleOnchange(event) {
        const { name, value } = event.target
        setLOginFormData(preFromData => ({
            ...preFromData,
            [name]: value
        }))
        console.log(event.target.value);
    }
    const [error,setError]=useState()

    async function handleFormData(event) {
        event.preventDefault()
        if (loginFormData.email !== "") {
            if (loginFormData.password !== "") {
                console.log("form is ready to sumbmit")
                let result= await fetch('/login',{
                    method:"POST",
                    body:JSON.stringify({loginFormData}),
                    headers:{
                        'content-Type':'application/json'
                    }
                })
                result=await result.json()
                console.log(result.result)
                console.log(result.err)
                if(result.result){
                    console.log(result)
                    console.log(result.token)
                    const cookies=new Cookies()
                    cookies.set('token',result.token)

                    navigate('/')
                }
                else{
                    setError(result.err)
                }
            }
            else {
                setError("Type Password")
                console.log("Type Password")
            }
        }
        else {
            setError("Type Email")
            console.log("Type Email")
        }
    }
    return (
        <>
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
                        /><br />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={handleOnchange}
                            value={loginFormData.password} 
                        /><br/>
                        {error && <span className="error-span">{error}</span>}
                        <button type="submit" >Log In</button><br/>
                        <Link to="/signup"><button type="button" className="signupbtn" >Sign Up</button></Link>
                        <span className="forget-psw">Forgot <Link to='/forgetPassword'>password?</Link></span>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;