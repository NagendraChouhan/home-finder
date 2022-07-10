const express = require('express');
const Router=express.Router();
const CreateRoomDetails = require('../models/createRoomModel');

Router.get('/',async(req,res)=>{
    try {
        const result=await CreateRoomDetails.find()
        console.log(`result from room ${result}`)
        res.send(result)
    } catch (error) {
        console.log(`error from room ${error}`)
        res.send({err:"Try After Some Time"})
    }
})

module.exports=Router