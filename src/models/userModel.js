const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    block: {
        type: Boolean
    },
    // tokens:[{
    //     token:{
    //         type:String,
    //         require:true
    //     }
    // }]
});

const userDetails = new mongoose.model("userDtail", userSchema);
module.exports = userDetails;