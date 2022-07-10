const express = require('express');
const Router=express.Router();
const userDetails = require('../models/userModel');
const jwt=require("jsonwebtoken");

Router.get('/',async(req,res)=>{
    try {
        const token=req.headers.token
        console.log(`token====#########======= ${token}`)
         //chech employe is authanticate or not
         const tokenvarify=jwt.verify(token,process.env.JWT_TOKEN);
         console.log("token varify");
         let user = await userDetails.findOne({_id:tokenvarify._id});
         let uservalue="owner"
         if(user==null){
            uservalue="admin"
            user = await adminDetails.findOne({_id:tokenvarify._id}); 

         }
         console.log(`${uservalue} token id varify`);
         console.log(`${uservalue} ===##########====${user}`);
         res.send({result:true,email:user.email,name:user.name,dob:user.dob,phone:user.phone})
        
    } catch (error) {
        console.log(`Error from get profile token verify===${error}`)
        res.send({result:false})
    }

})

module.exports=Router