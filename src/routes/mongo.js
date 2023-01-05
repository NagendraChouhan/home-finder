const express = require("express");
const Router = express.Router();
const CreateRoomDetails = require("../models/createRoomModel");

Router.post("/", async (req, res) => {
  try {
    // let result = await CreateRoomDetails.find({});
    // const rup = await CreateRoomDetails.updateMany(
    //   {},
    //   { $rename: { userId: "id" } }
    // );
    let result=await CreateRoomDetails.update({}, {$unset: {id:1}});
    // for (let i = 0; i < result.length; i++) {
    //   console.log("result=" + JSON.stringify(result[i].userId));
    //   console.log("result=" + JSON.stringify(result[i].id));
    //   const _id=result[i]._id;
    //   const id=result[i].id;
    //   let resultnew=await CreateRoomDetails.updateOne({_id:_id},{
    //     $set:{
    //         userId:id
    //     }
    //   })
    //   console.log(`result${i}=` + JSON.stringify(resultnew));
    // }
    console.log("result="+result)
    res.send({ result: result });
    //   db.stringToObject.update(
    //     {},
    //     {
    //       $set: {
    //         userId: ObjectId(doc.userId),
    //       },
    //     }
    //   );
    // });
    // const rup = await CreateRoomDetails.updateMany(
    //   {},
    //   { $rename: { id: "userId" } }
    // );
  } catch (error) {
    console.log("error from mongo====" + error);
    res.send({ err: "Try After Some Time" });
  }
});
module.exports = Router;
