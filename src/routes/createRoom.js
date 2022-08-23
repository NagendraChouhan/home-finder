const express = require("express");
const Router = express.Router();
const CreateRoomDetails = require("../models/createRoomModel");
const jwt = require("jsonwebtoken");
const storage = require("../firebase/firebase");
const userDetails = require("../models/userModel");
const multer = require("multer");

const { v4 } = require("uuid");
const { uploadBytes, ref } = require("firebase/storage");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const storageimg = multer.memoryStorage();
const upload = multer({ storage: storageimg });

const { uploadFile, deleteFile } = require("../aws/s3");
Router.delete("/deleteImage", async (req, res) => {
  console.log(`res from /deleteImage req.body=${req.body}`);
  console.log(`res from /deleteImage req.body=${JSON.stringify(req.body)}`);

  const roomId = req.query.roomId;
  console.log(`roomId=${roomId}`);
  const deleteImagesKey = req.body.deleteImagesKey;
  // const post = await prisma.posts.findUnique({where: {id}})

  console.log(
    `data findawait=${await CreateRoomDetails.findOne({ _id: roomId })}`
  );

  let result = [];
  let resultUpdate = [];
  for (let i = 0; i < deleteImagesKey.length; i++) {
    resultUpdate[i] = await CreateRoomDetails.updateOne(
      { _id: roomId },
      { $pull: { roomImagesKey: { $in: [deleteImagesKey[i]] } } }
    );
    result[i] = await deleteFile(deleteImagesKey[i]);
  }
  console.log(`result from deleteImage=${JSON.stringify(result)}`);
  console.log(`resultUpdate==${JSON.stringify(resultUpdate)}`);
  console.log(
    `data findawait=${await CreateRoomDetails.findOne({ _id: roomId })}`
  );
  res.send({ result: "Updated" });
});
Router.post("/image", upload.array("imageFile", 31), async (req, res) => {
  try {
    const token = req.headers.token;
    const roomId = req.query.roomId;

    console.log(`res from /images req.body=${JSON.stringify(req.body)}`);
    const file = await req.files;
    console.log(`req.file==${JSON.stringify(req.files.length)}`);
    var result = [];
    let imgKey = [];
    console.log(`uploadFile`);

    for (let i = 0; i < file.length; i++) {
      imgKey[i] = file[i].originalname + v4() + Date.now();
      console.log(`for loop in`);
      result[i] = await await uploadFile(
        file[i].buffer,
        imgKey[i],
        file[i].mimetype
      );
      console.log(`for loop out`);
      console.log(`result==${JSON.stringify(file[i].originalname)}`);
      //   console.log(`result==${JSON.stringify(result[i].Key)}`);
    }
    console.log(`uploadFile1 and roomId=${roomId}`);

    const tokenvarify = await jwt.verify(token, process.env.JWT_TOKEN);
    const updateCreateRoomDetails = await CreateRoomDetails.updateOne(
      { _id: roomId },
      {
        $push: { roomImagesKey: imgKey },
        $set: { roomstatus: true },
      }
    );
    console.log(
      `updateCreateRoomDetails=${JSON.stringify(updateCreateRoomDetails)}`
    );

    res.send({ result: "Updated" });
  } catch (error) {
    console.log(`err from /bcreateRoom/image err==${error}`);
    res.send({ err: "try after some time" });
  }
});
Router.post("/", async (req, res) => {
  try {
    console.log(`from CreateRoom=====${JSON.stringify(req.body.formData)}`);
    const token = req.headers.token;
    const {
      roomtype,
      otherThingsAvailable,
      price,
      securityCharge,
      numberOfSameRoom,
      area,
      country,
      state,
      district,
      houseNo,
      colony,
      landmark,
      pinCode,
      addressIdRadio,
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
      addAddress,
    } = req.body.formData;

    let city = district;
    const tokenvarify = await jwt.verify(token, process.env.JWT_TOKEN);
    let AddressId = addressIdRadio;
    if (addAddress) {
      const addressResult = await userDetails.findOneAndUpdate(
        { _id: tokenvarify._id },
        {
          $push: {
            address: {
              country,
              state,
              district,
              houseNo,
              colony,
              landmark,
              pinCode,
            },
            //inserted data is the object to be inserted
          },
        }
      );
      const user = await userDetails.findOne({ _id: tokenvarify._id });
      AddressId = JSON.stringify(user.address[user.address.length - 1]._id);
      console.log(`city==${city}`);
    } else {
      //finding city of an address

      let addressDetails = await userDetails.findOne({
        _id: tokenvarify._id,
        // $match: {
        //   "address._id": AddressId,
        // },
      });

      let addressValue;
      for (let i = 0; i < addressDetails.address.length; i++) {
        if (addressDetails.address[i]._id == AddressId) {
          addressValue = addressDetails.address[i];
          city = addressValue.district;
          break;
        }
      }
    }
    let bedroomsVlaue = 0;
    let bathroomsVlaue = 1;
    if (roomtype === "1BHK") {
      bedroomsVlaue = 1;
    } else if (roomtype === "2BHK") {
      bedroomsVlaue = 2;
    } else if (roomtype === "2BHK2T") {
      bedroomsVlaue = 2;
      bathroomsVlaue = 2;
    } else if (roomtype === "3BHK2T") {
      bedroomsVlaue = 3;
      bathroomsVlaue = 2;
    } else if (roomtype === "3BHK3T") {
      bedroomsVlaue = 3;
      bathroomsVlaue = 3;
    }
    const newCreateRoomDetails = new CreateRoomDetails({
      id: tokenvarify._id, //user ID
      roomtype,
      bedrooms: bedroomsVlaue,
      bathrooms: bathroomsVlaue,
      otherThingsAvailable,
      price,
      securityCharge,
      numberOfSameRoom,
      area,
      addressIdRadio: AddressId,
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
      district: city,
      roomstatus: false,
    });
    const result = await newCreateRoomDetails.save();
    console.log(`result from createRoom ====######===== ${result}`);

    res.send({ result: result });
  } catch (error) {
    console.log("error from CreateRoom=" + error);
    res.send({ err: "Try After Some Time" });
  }
});
Router.put("/update", async (req, res) => {
  try {
    console.log(`from /bcreateRoom/update`);

    const token = req.headers.token;
    const id = req.query.id;
    const roomstatus = req.query.roomstatus;

    console.log(`token=${token}`);
    console.log(`roomstatus=${roomstatus}`);
    console.log(`id=${id}`);
    const tokenvarify = await jwt.verify(token, process.env.JWT_TOKEN);
    const updateCreateRoomDetails = await CreateRoomDetails.updateOne(
      { _id: id },
      {
        $set: { roomstatus: roomstatus },
      }
    );
    console.log(
      `updateCreateRoomDetails=${JSON.stringify(updateCreateRoomDetails)}`
    );
    res.send({ result: updateCreateRoomDetails });
  } catch (error) {
    console.log("error from CreateRoom=" + error);
    res.send({ err: "Try After Some Time" });
  }
});

Router.put("/updateAllData", async (req, res) => {
  try {
    console.log(`from updateAllData=====${JSON.stringify(req.body.formData)}`);
    const token = req.headers.token;
    const id = req.query.id;

    const {
      roomtype,
      otherThingsAvailable,
      price,
      securityCharge,
      numberOfSameRoom,
      area,
      country,
      state,
      district,
      houseNo,
      colony,
      landmark,
      pinCode,
      addressIdRadio,
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
      images,
      addAddress,
    } = req.body.formData;
    console.log(`image1`);
    let city = district;
    const tokenvarify = await jwt.verify(token, process.env.JWT_TOKEN);
    let AddressId = addressIdRadio;
    if (addAddress) {
      const addressResult = await userDetails.findOneAndUpdate(
        { _id: tokenvarify._id },
        {
          $push: {
            address: {
              country,
              state,
              district,
              houseNo,
              colony,
              landmark,
              pinCode,
            },
            //inserted data is the object to be inserted
          },
        }
      );
      const user = await userDetails.findOne({ _id: tokenvarify._id });
      AddressId = JSON.stringify(user.address[user.address.length - 1]._id);
      console.log(`city==${city}`);
    } else {
      //finding city of an address
      let addressDetails = await userDetails.findOne({
        _id: tokenvarify._id,
        // $match: {
        //   "address._id": AddressId,
        // },
      });

      let addressValue;
      for (let i = 0; i < addressDetails.address.length; i++) {
        if (addressDetails.address[i]._id == AddressId) {
          addressValue = addressDetails.address[i];
          city = addressValue.district;
          break;
        }
      }
    }
    let bedroomsVlaue = 0;
    let bathroomsVlaue = 1;
    if (roomtype === "1BHK") {
      bedroomsVlaue = 1;
    } else if (roomtype === "2BHK") {
      bedroomsVlaue = 2;
    } else if (roomtype === "2BHK2T") {
      bedroomsVlaue = 2;
      bathroomsVlaue = 2;
    } else if (roomtype === "3BHK2T") {
      bedroomsVlaue = 3;
      bathroomsVlaue = 2;
    } else if (roomtype === "3BHK3T") {
      bedroomsVlaue = 3;
      bathroomsVlaue = 3;
    }
    const updateCreateRoomDetails = await CreateRoomDetails.updateOne(
      { _id: id },
      {
        $set: {
          roomtype,
          bedrooms: bedroomsVlaue,
          bathrooms: bathroomsVlaue,
          otherThingsAvailable,
          price,
          securityCharge,
          numberOfSameRoom,
          area,
          addressIdRadio: AddressId,
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
          district: city,
          roomstatus: true,
        },
      }
    );
    console.log(
      `update from createRoom  updateAllData ====######===== ${JSON.stringify(
        updateCreateRoomDetails
      )}`
    );

    res.send({ result: "Success" });
  } catch (error) {
    console.log("error from CreateRoom=" + error);
    res.send({ err: "Try After Some Time" });
  }
});
module.exports = Router;
