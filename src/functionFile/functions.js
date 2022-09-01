require('dotenv').config();
const sgMail = require('@sendgrid/mail')

function otpsendfunction(username,uname,uotp){
    sgMail.setApiKey(process.env.SENDEMAIL_API_KEY);
    console.log(process.env.SENDEMAIL_API_KEY);
    const msg = {
    to: username, // EMAIL SEND TO
    from: 'nikku200109@gmail.com', // EMAIL SEND BY
    subject: 'BLiveS OTP',
    text: 'Hello'+uname+' Your otp is-'+uotp,
    html: 'Hello<strong>,'+uname+'</strong> Your otp is-'+uotp,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        
        console.log("Error otpsendfunction from  =="+error);
    })
}

function generateotp(){
    let num='1234567890';
    var otpsend='';
    for(let i=0;i<4;i++){
        let value=parseInt(num[Math.floor(Math.random()*10)]);
        if(value==0 && otpsend==''){
            value=1;
            console.log("value000==="+value);
        }
        console.log("value==="+value);
        otpsend+=value;
        console.log("otpsend==="+otpsend);
    }
    return otpsend;
}
function counselingFunction(email,name,textmessage,subject){
    sgMail.setApiKey(process.env.SENDEMAIL_API_KEY);
    console.log(process.env.SENDEMAIL_API_KEY);
    const msg = {
    to: email, // EMAIL SEND TO
    from: 'nikku200109@gmail.com', // EMAIL SEND BY
    subject: subject,
    text: `Hello ${name},\n 
    ${textmessage}\n
    ThankYou,\n
    Team BLiveS`,
    html: `Hello ${name}, </br>${textmessage}</br> ThankYou,</br>Team BLiveS`,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error("err from counselingFunction =="+error)
        
    })
}
module.exports={
    otpsendfunction,
    generateotp,
    counselingFunction
}