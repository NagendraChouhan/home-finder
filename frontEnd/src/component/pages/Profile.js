import React,{useEffect } from 'react'
import Footer from "../Footer";
import {Cookies } from 'react-cookie';

 const Profile = () => {
    const [profileData,setprofileData]=React.useState({
        name:"",
        phone_no:"",
        email:"",
        dob:""

    })
    function handleOnChange(event){
        const [name,value]=event.target;
        setprofileData((prevalue)=>({
            ...prevalue,
            [name]:value,
        }))
    }
    useEffect(()=>{
        value()
        window.scrollTo(0, 0)

    },[])
    async function value(){

        console.log(`useEffect`)
        const cookies=new Cookies()
        const token=cookies.get('token')
        let data=await fetch('/bgetData',{
            method:'GET',
            headers:{
                'content-Type':'application/json',
                token:token
            }
        })
        data=await data.json()
        setprofileData((prevalue)=>({
            ...prevalue,
            name:data.name,
            phone:data.phone,
            email:data.email,
            dob:data.dob
        }))
    }
    return (
    <>
        <div className='profile-main-div'>
            <h1 className="heading"><span>{profileData.name}</span></h1>
            <div style={{}}>
                <div className="profile">
                    {/* <h1 style={{fontSize: "x-large", lineHeight:2.2}}>My Details</h1> */}
                    <form method="post" action="/">                
                    <h3>Personal Information</h3>
                        <div className="profile-container">
                            <label className='label'>Name :Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter Name" 
                                name="name" 
                                required  
                                onChange={handleOnChange}
                                value={profileData.name}                       
                                /><br/>
                            <label className='label'>Mobile Number</label>
                            <input 
                                type="number" 
                                placeholder="Enter Mobile Number" 
                                name="phoneNo" 
                                required 
                                onChange={handleOnChange}
                                value={profileData.phone_no}
                            /><br/>
                            <label className='label'>DOB</label>
                            <input 
                                type="date" 
                                name="dob"
                            />
                            <span style={{color:"red"}} className="pass_class"></span><br/>
                            <button type="submit" >Save</button><br/>
                        </div>
                    </form>

                    <form method="post" action="/forgotPassword">                
                    <h3>E-mail Address Information</h3>    
                        <div className="profile-container">
                            <label className='label'>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                readOnly
                                value={profileData.email}
                            /><br/>
                        </div>
                        <h3>Password update</h3>
                        <div className="profile-container" >
                            <button type="submit" >Change Password</button><br/>
                        </div>
                    </form>
                </div>

                <div id="Address" style={{display: "none"}}>
                    "addresspartial"
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Profile;