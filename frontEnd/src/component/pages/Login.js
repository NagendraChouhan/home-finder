import React from "react";
import { Link } from "react-router-dom";

function Login(){
    const [loginFormData,setLOginFormData]=React.useState({
        email:"",
        password:""
    })

    function handleOnchange(event){
        const {name,value}=event.target
        setLOginFormData(preFromData=>({
            ...preFromData,
            [name]:value
        }))
        console.log(event.target.value);
    }
    let error
    function handleFormData(event){
        event.preventDefault()
        if(loginFormData.email!==null){
            if(loginFormData.password!==null){
                console.log("form is ready to sumbmit")
            }
            else{
                console.log("Type Password")
            }
        }
        else{
            console.log("Type Email")
        }
    }
    return(
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
                        /><br/>

                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            required 
                            onChange={handleOnchange}
                            value={loginFormData.password} 
                        /><br/>
                        
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