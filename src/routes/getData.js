const express = require("express");
const Router = express.Router();
const userDetails = require("../models/userModel");
const CreateRoomDetails = require("../models/createRoomModel");

const jwt = require("jsonwebtoken");

Router.get("/", async (req, res) => {
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
      phone: user.phone,
    });
  }
});
Router.get("/room", async (req, res) => {
  const token = req.headers.token;
  console.log(`token from getdata room====#########======= ${token}`);
  //chech employe is authanticate or not
  const tokenvarify = jwt.verify(token, process.env.JWT_TOKEN);
  console.log("token varify from getdata room");
  let rooms = await CreateRoomDetails.find({ id: tokenvarify._id });
  console.log(`useer token id varify`);
  console.log(`useer===##########====${rooms}`);
  res.send(rooms);
});

Router.get("/roomDetails", async (req, res) => {
  const roomId = req.query.roomId;
  let roomDetail = await CreateRoomDetails.findOne({ _id: roomId });
  console.log(`useer token id varify from roomDetails`);
  console.log(`useer from roomDetails===##########====${roomDetail}`);
  res.send(roomDetail);
});

Router.get("/addressData", async (req, res) => {
  console.log(`calling from /addressData`);
  const userId = req.query.userId;
  const addressId = req.query.addressIdRadio;
  console.log(`userId===${userId}`);
  console.log(`addressIdRadio===${addressId}`);
  let addressDetails = await userDetails.findOne(
    {
      $match: {
        _id: userId,
        "address._id": addressId,
      },
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
  for (let i = 0; i < addressDetails.address.length; i++) {
    if (addressDetails.address[i]._id == addressId) {
      addressValue = addressDetails.address[i];
      res.send({
        name: addressDetails.name,
        email: addressDetails.email,
        ownerId:addressDetails._id,
        country: addressValue.country,
        state: addressValue.state,
        district: addressValue.district,
        houseNo: addressValue.houseNo,
        colony: addressValue.colony,
        landmark: addressValue.landmark,
        pinCode: addressValue.pinCode,
        _id: addressValue._id,
      });
      break
    }
  }
  console.log(`addressValue =${addressValue}`);
});

module.exports = Router;
