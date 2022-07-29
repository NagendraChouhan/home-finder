import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OwnerSection = (props) => {
  const roomId = new URLSearchParams(useLocation().search).get("id");
  useEffect(()=>{
    console.log(`props====${props.ownerId}`)
    setOwnerFormData((preValue)=>({
      ...preValue,
      roomId:roomId,
      ownerId:props.ownerId
    }))
  },[])
  const [ownerFormData, setOwnerFormData] = React.useState({
    roomId:"",
    ownerId:"",
    name:"",
    email:"",
    number:"",
    message:"",
  });
  const handleOnChange=(event)=>{
    const {name,value}=event.target
    setOwnerFormData((preValue)=>({
      ...preValue,
      [name]:value,
      ownerId:props.ownerId
    }))
    // console.log(JSON.stringify(ownerFormData))
  }
  const handleOnSubmit=async(event)=>{
    event.preventDefault()
    console.log(JSON.stringify(ownerFormData))
    if(ownerFormData.name!==""){
      if(ownerFormData.email!==""){
        if(ownerFormData.number!=="" && ownerFormData.number.length>=10){
          if(ownerFormData.message!==""){
            let result = await fetch(`/bcounseling/owner`,
              {
                method: "POST",
                body:JSON.stringify({ownerFormData}),
                headers: {
                  "content-Type": "application/json",
                },
              }
            );
            result = await result.json();
            console.log(
              `result from blockDetails====${JSON.stringify(result)}`
            );
            if(result.result){
              alert("Your Message is send successfully\nFor more information check your Gmail")
            }
            else{
              alert(result.err)
            }
          }
          else{
            console.log("Enter Message")
          }
        }
        else{
          console.log("Enter Valid  Number")
        }
      }
      else{
        console.log("Enter Email")
      }
    }
    else{
      console.log("Enter Name")
    }
  }
  return (
    <section className="owner-section">
      <div className="owner-div-container">
        <h2>{props.name}</h2>
        <h1>{props.email}</h1>
        <form  onSubmit={handleOnSubmit} className="contact-form review-form">
          <div className="contact-form-inputBox">
            <input 
              type="text" 
              placeholder="name" 
              name="name"
              onChange={handleOnChange}
              value={ownerFormData.name}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleOnChange}
              value={ownerFormData.email}
            />
            <input
              type="number"
              placeholder="number"
              name="number"
              onChange={handleOnChange}
              value={ownerFormData.number}
            />
          </div>

          <textarea
            placeholder="I'am Interested in this House"
            name="message"
            id=""
            cols="30"
            rows="10"
            onChange={handleOnChange}
              value={ownerFormData.message}
          ></textarea>
          <br />

          <button type="submit" className="btn">
            send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default OwnerSection;
