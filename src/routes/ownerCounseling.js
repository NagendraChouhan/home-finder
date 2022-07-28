const express = require("express");
const Router = express.Router();
const ownerCounselingDetails = require("../models/ownerCounselingModel");
const bcryptjs = require("bcryptjs");

const { otpsendfunction, generateotp } = require("../functionFile/functions");

Router.post("/", async (req, res) => {
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
    // const result = await newownerCounselingDetails.save();
    // otpsend = await generateotp();
    // console.log("fg after generate otp fun" + otpsend);
    // const regverifyuser = new verifyuser({
    //   email: email.toLowerCase(),
    //   otp: otpsend,
    // });
    // const register = await regverifyuser.save();

    // // otpsendfunction(email, result.name, otpsend);

    // res.send({ result: result });
  } catch (error) {
    console.log("error=" + error);
    res.send({ err: "Try After Some Time" });
  }
});
module.exports = Router;
