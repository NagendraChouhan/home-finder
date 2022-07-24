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
        const { roomtype, otherThingsAvailable, price, securityCharge, numberOfSameRoom,area,country,state,district,houseNo,colony,landmark,pinCode,addressIdRadio, pg, Bed, Table, Almirah, wifi, packing, Ventilation, Boys, Girls, Famaly, images,addAddress } = req.body.formData
        console.log(`image1`);
        // for(let i=0;i<images.length;i++){
        //     const imageRef= ref(storage,`img/${images[i]+v4()}`)
        //     console.log(`image2  imageRef==${imageRef}`);
            
        //     console.log(`image3  images[${i}]==${images[i]}`);
        //     const uploadImage=await uploadBytes(imageRef,images[i])
    
        //     console.log(`uploadImage====++++++======== ${uploadImage}`)
        // }
        let city=district
        const tokenvarify=await jwt.verify(token,process.env.JWT_TOKEN);
        let AddressId=addressIdRadio
        if(addAddress){
            const addressResult=await userDetails.findOneAndUpdate(
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
                               } 
                               //inserted data is the object to be inserted 
                    }
                }
            );
            const user=await userDetails.findOne({ _id: tokenvarify._id,})
            AddressId=JSON.stringify(user.address[user.address.length-1]._id)
            console.log(`city==${city}`)
        }
        else{
            let addressDetails = await userDetails.findOne(
                {
                  $match: {
                    _id:  tokenvarify._id,
                    "address._id": AddressId,
                  },
                }
              );
             
              let addressValue;
              for (let i = 0; i < addressDetails.address.length; i++) {
                if (addressDetails.address[i]._id == AddressId) {
                  addressValue = addressDetails.address[i];
                  city= addressValue.district
                  break;
                }
            }
        }
        let bedroomsVlaue=0
        let bathroomsVlaue=1
        if(roomtype==='1BHK'){
            bedroomsVlaue=1
        }
        else if(roomtype==='2BHK'){
            bedroomsVlaue=2
        }
        else if(roomtype==='2BHK2T'){
            bedroomsVlaue=2
            bathroomsVlaue=2
        }
        else if(roomtype==='3BHK2T'){
            bedroomsVlaue=3
            bathroomsVlaue=2
        }
        else if(roomtype==='3BHK3T'){
            bedroomsVlaue=3
            bathroomsVlaue=3
        }
        const newCreateRoomDetails= new CreateRoomDetails({
            id:tokenvarify._id,
            roomtype,
            bedrooms:bedroomsVlaue,
            bathrooms:bathroomsVlaue,
            otherThingsAvailable,
            price,
            securityCharge,
            numberOfSameRoom,
            area,
            addressIdRadio:AddressId,            
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
            district:city,
            roomstatus:true,
        })
        const result= await newCreateRoomDetails.save()
        console.log(`result from createRoom ====######===== ${result}`)
       
       res.send({result:result})   
    } catch (error) {
        console.log("error from CreateRoom=" + error);
        res.send({err:"Try After Some Time"});
    }
})
Router.put('/update',async(req,res)=>{
    try {
        console.log(`from /bcreateRoom/update`)
        
        const token=req.headers.token
        const id=req.query.id
        const roomstatus=req.query.roomstatus
        
        console.log(`token=${token}`)
        console.log(`roomstatus=${roomstatus}`)
        console.log(`id=${id}`)
        const tokenvarify=await jwt.verify(token,process.env.JWT_TOKEN);
        const updateCreateRoomDetails=await CreateRoomDetails.updateOne(
            {_id:id},
            {
                $set:{roomstatus:roomstatus}
            }
        )
        console.log(`updateCreateRoomDetails=${JSON.stringify(updateCreateRoomDetails)}`)
        res.send({result:updateCreateRoomDetails})
    } 
    catch (error) { 
        console.log("error from CreateRoom=" + error);
        res.send({err:"Try After Some Time"});
    }
})
module.exports=Router