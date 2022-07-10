const express = require('express');
const userDetails = require('../models/userModel');
const verifyuser = require('../models/verifyuser');
const Router=express.Router();
const bcryptjs = require('bcryptjs');

const {
    otpsendfunction,
    generateotp,
  } = require("../functionFile/functions");
  
Router.post('/verifyEmail',async(req,res)=>{
    try {
        const {email}=req.body.forgetFormData
        const result =userDetails.findOne({email})
        if(result!=null){
            var useremail = await verifyuser.findOne({ email: email });
            //delete data which is exist with same email
            if (useremail != null) {
                console.log("useremail==" + useremail.email);
                console.log("inside delete of user verify");

                const result = await verifyuser.deleteOne({
                email: useremail.email,
                });
                console.log("result from user verify==" + result);
            }
            useremail = await verifyuser.findOne({ email: email });

            otpsend = await generateotp();
            console.log("fg after generate otp fun" + otpsend);
            const regverifyuser = new verifyuser({
                email: email,
                otp: otpsend,
            });
            const register = await regverifyuser.save();

            // otpsendfunction(email, result.name, otpsend);
            
            res.send({result:true})

        }
        else{
            console.log("Invalid Email")
            res.send({err:"Invalid Email"})
        }
    } catch (error) {
        console.log(`Error from verifyEmail====${error}`)
        res.send({err:"Try After Some Time"})
    }
})
Router.post('/verifyotp',async(req,res)=>{
    try {
        const {email,otp}=req.body.forgetFormData
        const result=await verifyuser.findOne({email:email})
        if(result!=null){
            console.log(`result===${result}`)
            console.log(`result.otp===${result.otp}`)
            console.log(`otp===${otp}`)
            console.log(typeof(result.otp))
            console.log(typeof(otp))
            if(result.otp==otp){
                console.log("success")
                res.send({verifypassword:true},{verifyEmail:false},{email:email})
            }
            else{
                console.log("Invalid OTP")
                res.send({err:"Invalid OTP"})
            }
        }
        else{
            console.log("Invalid Email")
            res.send({err:"Invalid Email"})
        }

    } catch (error) {
        console.log(`error form verifyotp ${error}`)
        res.send({err:"Try After Some Time"})
    }
})
Router.patch('/updatePassword',async(req,res)=>{
    try {
        const {email,password}=req.body.forgetFormData
        const hash_password=await bcryptjs.hash(password,10)
        const result=await userDetails.updateOne(
            {email: email},
            { $set: { password: hash_password}}
        )
        
        console.log(`result from updatePassword ==== ${JSON.stringify(result)}`)
        res.send({result:'password updated'})

    } catch (error) {
        console.log(`error from updatePassword ==== ${error}`)
        res.send({err:"Try After Some Time"})
    }
})
module.exports=Router