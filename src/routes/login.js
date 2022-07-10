const express = require('express');
const Router=express.Router();
const userDetails = require('../models/userModel');
const adminDetails = require('../models/adminModel');
const bcryptjs = require('bcryptjs');



Router.post('/',async(req,res)=>{
    try {
        const {email,password}=req.body.loginFormData
        console.log("from log url of backend")
        console.log(`req.body email=${email}`)
        const adminresult=await adminDetails.findOne({email:email.toLowerCase()});
        
        console.log("admin result==="+adminresult)
        if(adminresult!=null){
            
            if(await bcryptjs.compare(password,adminresult.password)){
                const token= await adminresult.generateToten();
                        res.cookie("token",token,{
                            expires:new Date(Date.now()+6000000000),
                            httpOnly:true,
                            // secure:true
                        });
                res.send({result:adminresult})
            }
            else{
                console.log("admin password are not match")
                res.send({err:"Invalid User"})
            }
        }
        else{
            console.log("admin email not found")

            const ownerresult=await userDetails.findOne({email:email.toLowerCase()});
            console.log("owner result==="+ownerresult)
            if(ownerresult!=null){
                
                if(await bcryptjs.compare(password,ownerresult.password)){
                    const token= await ownerresult.generateToten();
                        // res.cookie("token",token,{
                        //     expires:new Date(Date.now()+6000000000),
                        //     httpOnly:true,
                        //     // secure:true
                        // });
                    // console.log(`cookie("token")====${req.cookies.token}`)

                    res.send({result:ownerresult,token:token})
                }
                else{
                    console.log("owner password are not match")
                    res.send({err:"Invalid User"})
                }
            }
            else{
                console.log("owner email not found")
                res.send({err:"Invalid User"})
            }
        }
    } catch (error) {
        console.log("error from login===="+error)
        res.send({err:"Try After Some Time"})
    }
})
module.exports=Router