const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");

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
    address:[{
        country:String,
        state:String,
        district:String,
        tehsil:String,
        houseNo:String,
        colony:String,
        landmark:String,
        pinCode:Number,
    }],
    block: {
        type: Boolean
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
});

userSchema.methods.generateToten= async function(){
    try {
        console.log("generateToten");
        const token=await jwt.sign({_id:this._id.toString()},process.env.JWT_TOKEN);
        console.log("token==="+token);

        this.tokens=this.tokens.concat({token:token});
        console.log("token==="+token);
        
        await this.save();
        return token;
    } catch (error) {
        console.log("err from token is"+error);
    }
}
const userDetails = new mongoose.model("userDetail", userSchema);
module.exports = userDetails;