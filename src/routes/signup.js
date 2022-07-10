const express = require('express');
const Router=express.Router();
const userDetails = require('../models/userModel');
const bcryptjs = require('bcryptjs');



Router.post('/',async(req,res)=>{
    try {
        const { firstName, lastName, email, password } = req.body.signupFormData;
        console.log("from signup url of backend");
        console.log(`req.body=${email}`);
        if(await userDetails.findOne({email:email.toLowerCase()})){
            console.log("Email is Already Registered");
            res.send({err:"Email is Already Registered"});
        }
        else{
            hash_password=await bcryptjs.hash(password,10)
            const newuserDetails = new userDetails({
                name: firstName + " " + lastName,
                email:email.toLowerCase(),
                password:hash_password
            });

            const result = await newuserDetails.save();
            console.log(result);
            res.send({result:result});

        }
        
    } catch (error) {
        console.log("error=" + error);
        res.send({err:"Try After Some Time"});
    }
})
module.exports=Router