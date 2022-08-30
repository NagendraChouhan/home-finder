require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
// var bodyParser = require('body-parser')
require('./database/connection');
const bcryptjs = require('bcryptjs');
const userDetails = require('./models/userModel');
const verifyuser = require('./models/verifyuser');




//Routes start here

const login=require('./routes/login')
const signup=require('./routes/signup');
const logout=require('./routes/logout');
const getData=require('./routes/getData');
const tokenvarify=require('./routes/tokenvarify');
const verify=require('./routes/verify');
const createRoom=require('./routes/createRoom');
const rooms=require('./routes/rooms');
const roomReview=require('./routes/roomReview');
const counseling=require('./routes/counseling');
const adminDetails = require('./models/adminModel');

//Routes end here


const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json())


app.use('/blogout',logout)
app.use('/blogin',login)
app.use('/bsignup',signup)
app.use('/brooms',rooms)
app.use('/brooms/filter',rooms)
app.use('/bgetData',getData)
app.use('/bgetData/roomDetails',getData)
app.use('/bgetData/room',getData)
app.use('/bgetData/admin',getData)
app.use('/bgetData/addressData',getData)
app.use('/btokenvarify',tokenvarify)
app.use('/bcreateRoom',createRoom)
app.use('/bcreateRoom/image',createRoom)
app.use('/bcreateRoom/deleteImage',createRoom)
app.use('/bcreateRoom/update',createRoom)
app.use('/broomReview',roomReview)
app.use('/broomReview/breviewData',roomReview)
app.use('/bcounseling',counseling)

app.use('/',verify)

   
    if(process.env.NODE_ENV=="production"){
        app.use(express.static("frontEnd/build"));
    }
    console.log("app.get('*')")
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../frontEnd/build', 'index.html'),function(err){
        console.log("app.get in function('*')")
    
        if(err){
        console.log("app.get in function if('*')")
    
            res.status(500).send(err)
        }
      })
    })
    console.log("app.get1('*')")
    
    app.listen(port, () => {
        console.log(`Listing from port ${port}`);
})

