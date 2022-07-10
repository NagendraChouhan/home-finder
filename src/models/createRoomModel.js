const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
console.log("mongose="+mongoose);
const CreateRoom= new mongoose.Schema({
    id:{
        type:String,
        require:true
    },
    roomtype: {
        type:String,
        require:true
    },    
    price : {
        type:Number,
        require:true
    },
    securityCharge : {
        type:Number,
        require:true
    },
    numberOfSameRoom : {
        type:Number,
        require:true
    },
    area: {
        type:Number,
        require:true
    },
    addressIdRadio:{
        type:String,
        require:true
    },
    pg: {
        type:Boolean,
        require:true
    },
    otherThingsAvailable : {
        type:String,
        require:true
    },
    Bed: {
        type:Boolean,
        require:true
    },
    Table: {
        type:Boolean,
        require:true
    },
    Almirah: {
        type:Boolean,
        require:true
    },
    Ventilation: {
        type:Boolean,
        require:true
    },
    wifi:{
        type:Boolean,
        require:true
    },
    packing:{
        type:Boolean,
        require:true
    },
    Boys: {
        type:Boolean,
        require:true
    },
    Girls: {
        type:Boolean,
        require:true
    },
    Famaly: {
        type:Boolean,
        require:true
    },
    images: {
        type:String,
        require:true
    },
    date : {
        type:Date,
        default: Date.now
    },
})


const CreateRoomDetails=new mongoose.model("CreateRoomDetail",CreateRoom);
module.exports=CreateRoomDetails;