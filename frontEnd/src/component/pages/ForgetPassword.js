import React from "react";

function ForgetPassword(){
    const [forgetFormData,setForgetFormData]=React.useState({
        email:"",
        otp:"",
        verifyEmail:false
    })
    function handleOnChange(event){
        const {name,value}=event.target
        setForgetFormData(preFormData=>({
            ...preFormData,
            [name]:value
        }))
    }
    function handleOnSubmit(event){
        event.preventDefault();
    }
    return(
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
                        /><br/>

                        {forgetFormData.verifyEmail && <input
                            type="number"
                            name="otp"
                            placeholder="Enter OTP"
                            onChange={handleOnChange}
                            value={forgetFormData.otp}
                            required
                        />}<br/>
                        <button type="submit">{forgetFormData.verifyEmail?"Verify OTP":"Verify Email"}</button>
                    </div>
                </form>

            </div>
            
        </>
    )
}
export default ForgetPassword;