const mongoose = require("mongoose");
console.log("mongose=" + mongoose);
const CreateRoom = new mongoose.Schema({
  
  userId: {
    //user ID
    type: mongoose.Schema.ObjectId,
    ref: "userDetail",
    required: true,
  },
  roomtype: {
    type: String,
    require: true,
  },
  bedrooms: {
    type: Number,
    require: true,
  },
  bathrooms: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  securityCharge: {
    type: Number,
    require: true,
  },
  numberOfSameRoom: {
    type: Number,
    require: true,
  },
  area: {
    type: Number,
    require: true,
  },
  addressIdRadio: {
    type: String,
    require: true,
  },
  pg: {
    type: Boolean,
    require: true,
  },
  otherThingsAvailable: {
    type: String,
    require: true,
  },
  Bed: {
    type: Number,
    require: true,
  },
  Table: {
    type: Number,
    require: true,
  },
  Almirah: {
    type: Number,
    require: true,
  },
  Ventilation: {
    type: Boolean,
    require: true,
  },
  wifi: {
    type: Boolean,
    require: true,
  },
  packing: {
    type: Boolean,
    require: true,
  },
  Boys: {
    type: Boolean,
    require: true,
  },
  Girls: {
    type: Boolean,
    require: true,
  },
  Famaly: {
    type: Boolean,
    require: true,
  },
  images: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  roomstatus: {
    type: Boolean,
    required: true,
  },
  adminroomstatus: {
    type: Boolean,
    required: true,
  },
  roomImagesKey: [
    {
      type: String,
    },
  ],
  roomImagesUrl: [
    {
      type: String,
    },
  ],
  
});

const CreateRoomDetails = new mongoose.model("CreateRoomDetail", CreateRoom);
module.exports = CreateRoomDetails;
