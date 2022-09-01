const express = require("express");
const Router = express.Router();
const userDetails = require("../models/userModel");

const jwt = require("jsonwebtoken");

Router.put("/", async (req, res) => {
  try {
    console.log(`from bprofileupdate profileData=${JSON.stringify(req.body.profileData)}`)
    const token = req.headers.token;
    const { phoneNo, dob } = req.body.profileData;
    
    //chech employe is authanticate or not
    const tokenvarify = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("token varify from profile update");
    let user = await userDetails.updateOne(
      { _id: tokenvarify._id },
      {
        $set: {
          mobile: phoneNo,
          dob: dob,
        },
      }
    );
    res.send({ result: "success" });
  } catch (error) {
    console.log(`err from profile update is =${error}`);
    res.send({ err: "Try After Some Time" });
  }
});

module.exports = Router;

