const express = require('express');
const Router=express.Router();
const CreateRoomDetails = require('../models/createRoomModel');
const jwt=require("jsonwebtoken");
const storage = require('../firebase/firebase');
const userDetails = require('../models/userModel');

const {v4}=require("uuid");
const { uploadBytes,ref } = require('firebase/storage');




Router.post('/',async(req,res)=>{
    try {
        console.log(`from CreateRoom=====${JSON.stringify(req.body.formData)}`);
        const token=req.headers.token
        const { roomtype, otherThingsAvailable, price, securityCharge, numberOfSameRoom,area,country,state,district,houseNo,colony,landmark,pinCode,addressIdRadio, pg, Bed, Table, Almirah, wifi, packing, Ventilation, Boys, Girls, Famaly, images } = req.body.formData
        console.log(`image1`);
        // for(let i=0;i<images.length;i++){
        //     const imageRef= ref(storage,`img/${images[i]+v4()}`)
        //     console.log(`image2  imageRef==${imageRef}`);
            
        //     console.log(`image3  images[${i}]==${images[i]}`);
        //     const uploadImage=await uploadBytes(imageRef,images[i])
    
        //     console.log(`uploadImage====++++++======== ${uploadImage}`)
        // }
        const tokenvarify=await jwt.verify(token,process.env.JWT_TOKEN);;
        const newCreateRoomDetails= new CreateRoomDetails({
            id:tokenvarify._id,
            roomtype,
            otherThingsAvailable,
            price,
            securityCharge,
            numberOfSameRoom,
            area,
            addressIdRadio,            
            pg,
            Bed,
            Table,
            Almirah,
            wifi, 
            packing,
            Ventilation,
            Boys,
            Girls,
            Famaly,
        })
        const result= await newCreateRoomDetails.save()
        console.log(`result from createRoom ====######===== ${result}`)
        const addressResult=await userDetails.updateOne(
            { _id: tokenvarify._id, },
            {
                $push : {
                    address :  {
                                country,
                                state,
                                district,
                                houseNo,
                                colony,
                                landmark,
                                pinCode
                           } //inserted data is the object to be inserted 
                }
            }
        );
        res.send({result:result})

        
    } catch (error) {
        console.log("error from CreateRoom=" + error);
        res.send({err:"Try After Some Time"});
    }
})
module.exports=Router