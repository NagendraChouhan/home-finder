const express = require("express");
const Router = express.Router();
const CreateRoomDetails = require("../models/createRoomModel");

Router.get("/", async (req, res) => {
  try {
    const result = await CreateRoomDetails.find();
    console.log(`result from room ${result}`);
    res.send(result);
  } catch (error) {
    console.log(`error from room ${error}`);
    res.send({ err: "Try After Some Time" });
  }
});
Router.post("/filter", async (req, res) => {
  try {
    const {
      roomtype,
      price,
      pg,
      Bed,
      Table,
      Almirah,
      wifi,
      packing,
      Ventilation,
      Boys,
      Girls,
      Famaly,
      sortBy,
    } = req.body;
    console.log(`pg===${typeof(Boys)}`);
    if(Boys){

    }
    const result = await CreateRoomDetails.find({
      roomtype: { $regex: roomtype },
      price: { $lt: parseInt(price) },
      // Boys: { $eq: Boys },
      // pg: { $eq: pg },
      // Famaly: { $eq: Famaly },
      // Girls: { $eq: Girls },
      // Bed: { $eq: Bed } ,
      // Table: { $eq: Table },
      // Almirah: { $eq: Almirah },
      // wifi: { $eq: wifi },
      // packing: { $eq: packing },
      // Ventilation: { $eq: Ventilation},
    }).sort({ price: parseInt(sortBy) });
    console.log(`pg===${(Boys)}`);

    res.send(result);

    // $or: [
    //     { roomtype: { $regex: roomtype } ,
    //     price: { $lt: parseInt(price) } ,
    //     $sort : { price : 1 } }
    //   ],
    //   $or: [{ pg: { $eq: pg } }],
    //   $or: [
    //     { Bed: { $eq: Bed } },
    //     { Table: { $eq: Table } },
    //     { Almirah: { $eq: Almirah } },
    //     { wifi: { $eq: wifi } },
    //     { packing: { $eq: packing } },
    //     { Ventilation: { $eq: Ventilation } },
    //   ],
    //   $or: [
    //     { Boys: { $eq: Boys } },
    //     { Girls: { $eq: Girls } },
    //     { Famaly: { $eq: Famaly } },
    //   ],

    // result.sort(price)
    console.log(`result from room ${result}`);
  } catch (error) {
    console.log(`error from room ${error}`);
    res.send({ err: "Try After Some Time" });
  }
});
module.exports = Router;
