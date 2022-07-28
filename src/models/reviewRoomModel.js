const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log("mongose=" + mongoose);
const createRoomReview = new mongoose.Schema({
  emailRoomId:{//checking for unqiue reviews
    type:String,
    require: true,
    unique:true
  },
  roomId: {
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
  message: {
    type: String,
  },
  service: {
    type: Number,
    require: true,
  },
  quality: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  location: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const createRoomReviewDetails = new mongoose.model(
  "roomReview",
  createRoomReview
);
module.exports = createRoomReviewDetails;
