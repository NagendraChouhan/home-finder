const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log("mongose=" + mongoose);

const createContactCounseling = new mongoose.Schema({
  ownerId: {
    //owner ID
    type: String,
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
  subject:{
    type:String,
    require:true
  },
  message: {
    type: String,
  },
  date:{
    type:Date,
    default:Date.now()
  }
});

const contactCounselingDetails = new mongoose.model("contactCounseling", createContactCounseling);
module.exports = contactCounselingDetails;
