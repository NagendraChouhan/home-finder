const express = require("express");
const Router = express.Router();
const createRoomReviewDetails = require("../models/reviewRoomModel");

Router.post("/", async (req, res) => {
  try {
    const { roomId, name, email, message, Service, Price, Quality, Location } =req.body.totalRating;
    
    const newcreateRoomReview = new createRoomReviewDetails({
      emailRoomId:email.toLowerCase()+roomId,
      roomId,
      name,
      email:email.toLowerCase(),
      message,
      service:Service,
      price:Price,
      quality:Quality,
      location:Location,
    });
    const result=await newcreateRoomReview.save()
    console.log(`res from roomReview ${JSON.stringify(req.body.totalRating)}`);
    res.send({result:result})
  } catch (error) {
    console.log(`Error from roomReview===${error}`);
    console.log(`Error from roomReview===${error.code}`);
    let result="Try After Some Time"
    if (error.code === 11000 ) {
        result="You have already reviewed"
    }
    res.send({ result: result });
  }
});
Router.get("/breviewData", async (req, res) => {
  const roomId=req.query.roomId
  console.log(`get dat a from breviewData roomId==${roomId}`);

  let reviewData = await createRoomReviewDetails.find({roomId:roomId});
  
  console.log(`get dat a from breviewData==${reviewData}`);
  res.send(reviewData);
});

module.exports = Router;
