require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
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

const adminDetails = require('./models/adminModel');

//Routes end here


const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json())

app.use(express.static(path.join(__dirname, '../frontEnd/public')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontEnd/public', 'index.html'))
})

app.use('/logout',logout)
app.use('/login',login)
app.use('/signup',signup)
app.use('/rooms',rooms)
app.use('/getData',getData)
app.use('/getData/roomDetails',getData)
app.use('/getData/room',getData)
app.use('/getData/addressData',getData)
app.use('/tokenvarify',tokenvarify)
app.use('/createRoom',createRoom)
app.use('/',verify)

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

if(process.env.NODE_ENV=="production"){
    app.use(express.static("frontEnd/build"));
}

app.listen(port, () => {
    console.log(`Listing from port ${port}`);
})

