const express = require('express');
const Router=express.Router();
const userDetails = require('../models/userModel');
const adminDetails=require('../models/adminModel')

const jwt=require("jsonwebtoken");

Router.delete('/',async(req,res)=>{
    try {
        const token=req.body.token
        
        console.log(`token from delete===== ${token}`)
        const tokenvarify = jwt.verify(token, process.env.JWT_TOKEN);
        const id=tokenvarify._id
        let result=await userDetails.updateOne(
            {
                _id:id
            },
            {
              $set:{tokens:[]}
            }
        )

        console.log(`result from delete of userDetails===== ${result}`)

        if(result==undefined){
            result=await adminDetails.updateOne(
                {
                    _id:id
                },
                {
                  $set:{tokens:[]}
                }
            )

            console.log(`result from delete of adminDetails===== ${result}`)

        } 
        // db.products.remove( { qty: { $gt: 20 } }, true )
        console.log(`id from delete===== ${id}`)
        console.log(`result from delete===== ${result}`)
        res.send({result:"success"})

    } catch (error) {
        console.log(`error from logout ${error}`)
    }
})

module.exports=Router
