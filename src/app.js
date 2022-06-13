const express=require('express')
const app=express()
const cors=require('cors')
require('./database/connection')
const userDetails=require('./models/userModel')

const port=process.env.PORT || 8000;

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("<h1>From get</h1>");
})
app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body.loginFormData
        console.log("from signup url of backend")
        console.log(`req.body=${firstName}`)        
    } catch (error) {
        
    }
})
app.post('/signup',async(req,res)=>{
    try {
        const {firstName,lastName,email,password}=req.body.signupFormData
        console.log("from signup url of backend")
        console.log(`req.body=${firstName}`)
        const newuserDetails=new userDetails({
            name:firstName+" "+lastName,
            email,
            password
        })
        const result=await newuserDetails.save()
        console.log(result)
        res.send("from signup url of backend")
        
    } catch (error) {
        console.log("error="+error)
    }
})

app.listen(port,()=>{
    console.log(`Listing from port ${port}`);
})

