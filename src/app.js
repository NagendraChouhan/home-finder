const express = require('express');
const app = express();
const cors = require('cors');
const bcryptjs = require('bcryptjs');
require('./database/connection');
const userDetails = require('./models/userModel');

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1>From get</h1>");
})
app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body.loginFormData
        console.log("from log url of backend")
        console.log(`req.body email=${email}`)
        const result=await userDetails.findOne({email:email.toLowerCase()});
        console.log("result==="+result)
        if(result!=null){
            
            if(await bcryptjs.compare(password,result.password)){
                res.send({result:result})
            }
            else{
                console.log("password are not match")
                res.send({err:"Invalid User"})
            }
        }
        else{
            console.log("email not found")
            res.send({err:"Invalid User"})
        }
    } catch (error) {
        res.send({err:error})
    }
})
app.post('/signup',async(req,res)=>{
    try {
        const { firstName, lastName, email, password } = req.body.signupFormData;
        console.log("from signup url of backend");
        console.log(`req.body=${email}`);
        if(await userDetails.findOne({email:email.toLowerCase()})){
            console.log("Email is Already Registered");
            res.send({err:"Email is Already Registered"});
        }
        else{
            hash_password=await bcryptjs.hash(password,10)
            const newuserDetails = new userDetails({
                name: firstName + " " + lastName,
                email:email.toLowerCase(),
                password:hash_password
            });

            const result = await newuserDetails.save();
            console.log(result);
            res.send({result:result});

        }
        
    } catch (error) {
        console.log("error=" + error);
        res.send({err:"Try After Some Time"});
    }
})

app.listen(port, () => {
    console.log(`Listing from port ${port}`);
})

