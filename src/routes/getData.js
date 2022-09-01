const express = require("express");
const Router = express.Router();
const userDetails = require("../models/userModel");
const CreateRoomDetails = require("../models/createRoomModel");
const adminDetails=require('../models/adminModel')


const { getFileStream } = require("../aws/s3");

const jwt = require("jsonwebtoken");

Router.get("/", async (req, res) => {
  try {
    const token = req.headers.token;
    const addAddress = req.query.addAddress; // find all address of user
    console.log(`type of addAddress id== ${typeof addAddress}`);
    console.log(`token getdata====#########======= ${token}`);
    //chech employe is authanticate or not
    const tokenvarify = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("token varify from getdata address");
    let user = await userDetails.findOne({ _id: tokenvarify._id });
    if (addAddress === "true") {
      res.send(user.address);
    } else {
      let uservalue = "owner";
      if (user == null) {
        uservalue = "admin";
        user = await adminDetails.findOne({ _id: tokenvarify._id });
      }
      console.log(`${uservalue} token id varify from getdata`);
      console.log(`${uservalue} ===##########====${user}`);
      res.send({
        email: user.email.toLowerCase(),
        name: user.name,
        dob: user.dob,
        phone: user.mobile,
      });
    }
  } catch (error) {
    console.log(`err from getdata is =${error}`);
    res.send({ err: "Try After Some Time" });
  }
});
Router.get("/room", async (req, res) => {
  try {
    const token = req.headers.token;
    console.log(`token from getdata room====#########======= ${token}`);
    //chech employe is authanticate or not
    const tokenvarify = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("token varify from getdata room"+tokenvarify);
    let rooms = await CreateRoomDetails.find({ id: tokenvarify._id });
    console.log(`useer token id varify`);
    console.log(`useer===##########====${rooms}`);
    res.send({rooms});
  } catch (error) {
    console.log(`err from getData/room =${error}`);
    res.send({ err: "Try After Same Time" });
  }
});

Router.get("/roomDetails", async (req, res) => {
  try {
    const roomId = req.query.roomId;
    const imageKey = req.query.imageKey;

    console.log(`from roomDetails imageKey=${imageKey}`);
    if (imageKey === undefined) {
      let roomDetail = await CreateRoomDetails.findOne({ _id: roomId });
      console.log(`useer token id varify from roomDetails`);
      console.log(`useer from roomDetails===##########====${roomDetail}`);

      // console.log(req.params)
      // const key = req.params.key
      const readStream = [];
      for (let i = 0; i < roomDetail.roomImagesKey.length; i++) {
        readStream[i] = await getFileStream(roomDetail.roomImagesKey[i]);
      }
      console.log(`readStream=${JSON.stringify(readStream)}`);

      // readStream.pipe(res)

      res.send({ roomDetail: roomDetail, images: readStream });
    } else {
      let imagesUrl = await getFileStream(imageKey);
      res.send({ imagesUrl });
    }
  } catch (error) {
    console.log(`err from getData/roomDetails =${error}`);
    res.send({ err: "Try After Same Time" });
  }
});

Router.get("/addressData", async (req, res) => {
  try {
    console.log(`calling from getData/addressData`);
    const userId = req.query.userId;
    const addressId = req.query.addressIdRadio;
    console.log(`userId===${userId}`);
    console.log(`addressIdRadio===${addressId}`);
    let addressDetails = await userDetails.findOne(
      {
        _id: userId,
        // $match: {
        //   _id: userId,
        //   "address._id": addressId,
        // },
      }
      // $or: [
      //     {
      //       _id: userId,
      //       $address: {
      //         _id: { $regex: "62c6d14ca41463d2d722593a" },
      //       },
      //     },
      //   ],
    );
    console.log(`addressDetails==== ${addressDetails}`);
    console.log(`addressDetails==== ${addressDetails.name}`);
    console.log(`addressDetails==== ${addressDetails.email}`);
    let addressValue;
    let flag=true;
    for (let i = 0; i < addressDetails.address.length; i++) {
    console.log(`addressDetails for i==== ${i}`);
    console.log(`addressDetails.address[i] if i==== ${addressDetails.address[i]._id}`);

      if (addressDetails.address[i]._id == addressId) {
        console.log(`addressDetails if i==== ${i}`);
        console.log(`addressDetails if i==== ${addressDetails}`);
        console.log(`addressValue if i==== ${addressValue}`);
        flag=false
        addressValue = addressDetails.address[i];
        res.send({
          name: addressDetails.name,
          email: addressDetails.email,
          ownerId: addressDetails._id,
          country: addressValue.country,
          state: addressValue.state,
          district: addressValue.district,
          houseNo: addressValue.houseNo,
          colony: addressValue.colony,
          landmark: addressValue.landmark,
          pinCode: addressValue.pinCode,
          _id: addressValue._id,
        });
      }
    }
    console.log(`addressValue =${addressValue}`);
    console.log(`addressDetails if i==== ${addressDetails}`);

    if(flag){
      res.send({ result: 'Succses' });    
    }
  } catch (error) {
    console.log(`err from getData/addressData =${error}`);
    res.send({ err: "Try After Same Time" });
  }
});

Router.get('/admin',async (req,res)=>{
  try {
    const token = req.headers.token;
    console.log(`token from getdata admin====#########======= ${token}`);
    //chech employe is authanticate or not
    const tokenvarify = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("token varify from getdata room"+tokenvarify);
    let rooms = await CreateRoomDetails.find({});
    let users = await userDetails.find({});
    console.log(`useer token id varify`);
    console.log(`useer===##########====${rooms}`);
    res.send({rooms,users,userdata:true});
  } catch (error) {
    console.log(`err from getData/admin =${error}`);
    res.send({ err: "Try After Same Time" });
  }

})

module.exports = Router;
