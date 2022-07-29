const express = require("express");
const Router = express.Router();
const ownerCounselingDetails = require("../models/ownerCounselingModel");
const contactCounselingDetails = require("../models/ownerCounselingModel");
const bcryptjs = require("bcryptjs");
const userDetails = require("../models/userModel");

const { counselingFunction } = require("../functionFile/functions");

Router.post("/owner", async (req, res) => {
  try {
    const { name, email, number, message, roomId, ownerId } =
      req.body.ownerFormData;
    console.log(`ownerFormData==${JSON.stringify(req.body.ownerFormData)}`);
    const newownerCounselingDetails = new ownerCounselingDetails({
      roomId,
      ownerId,
      name,
      email: email.toLowerCase(),
      number,
      message,
    });
    const result = await newownerCounselingDetails.save();

    const ownerData = await userDetails.findOne({ _id: ownerId });

    let subject = `Room Counseling`;
    let textMessage = `Thank Yor ${name} for your interested in availables room\n.
    Ms/Mr: ${ownerData.name} Contact you Shortly for more information.
    `;
    let userResult = await counselingFunction(
      email,
      name,
      textMessage,
      subject
    ); //emai=userEmail; number=usernumber; message=userMessage
    console.log(`userResult=${userResult}`);

    textMessage = `Ms/MR: ${name} interested in you'r room.\n
    This are are Some information of ${name}\n 
    email: ${email}\n
    Mobile Number: ${number}\n
    Message send by ${name}: ${message}\n`;
    //emai=userEmail; number=usernumber; message=userMessage
    subject = `You'r Room Counseling`;
    let ownerResult = await counselingFunction(
      ownerData.email,
      ownerData.name,
      textMessage,
      subject
    );
    console.log(`ownerResult=${ownerResult}`);

    res.send({ result: result });
  } catch (error) {
    console.log("error=" + error);
    res.send({ err: "Try After Some Time" });
  }
});
Router.post("/contact", async (req, res) => {
  try {
    const { name, email, number, subject, message } = req.body.contactFormData;
    const token = req.headers.token;
    let tokenvarify=false;
    console.log(`token===${token}`)
    if(token!==undefined){
      try {
        tokenvarify=await jwt.verify(token,process.env.JWT_TOKEN);
      } catch (error) {
        
      }
    }
    console.log(`contactFormData==${JSON.stringify(req.body.contactFormData)}`);
    const newcontactCounselingDetails = new contactCounselingDetails({
      ownerId:tokenvarify?tokenvarify._id:"",
      name,
      email: email.toLowerCase(),
      number,
      message,
    });
    const result = await newcontactCounselingDetails.save();

   

    
    let textMessage = `Thank Yor ${name} for your interested \n.
    Our Team was Contact you Shortly for more information.
    `;
    let userResult = await counselingFunction(
      email,
      name,
      textMessage,
      "Counselling"
    ); //emai=userEmail; number=usernumber; message=userMessage
    console.log(`userResult=${userResult}`);

    textMessage = `Ms/MR: ${name} interested.\n
    This are are Some information of ${name}\n 
    email: ${email}\n
    Mobile Number: ${number}\n
    Message send by ${name}: ${message}\n
    Sunject send by ${name}: ${subject}`
    ;
    //emai=userEmail; number=usernumber; message=userMessage
   
    userResult = await counselingFunction(
      "0701cs191032@uecu.ac.in",
      "Nagendra",
      textMessage,
      "User Counselling"
    );

    res.send({ result: result });
  } catch (error) {
    console.log("error=" + error);
    res.send({ err: "Try After Some Time" });
  }
});
module.exports = Router;
