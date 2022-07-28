const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log("mongose=" + mongoose);

const CreateownerCounseling = new mongoose.Schema({
  ownerId: {
    //owner ID
    type: String,
    require: true,
  },
  roomId: {
    //room ID
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  message: {
    type: String,
  },
});

const ownerCounselingDetails = new mongoose.model("ownerCounseling", CreateownerCounseling);
module.exports = ownerCounselingDetails;
