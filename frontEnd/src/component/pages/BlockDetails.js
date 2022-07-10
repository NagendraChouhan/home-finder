import React, { useEffect } from "react";
import './BlockDetails.css';
import logo from "../../logo.svg";
import { useLocation } from 'react-router-dom';
var BlockDetails_img_div = document.getElementsByClassName(
  "BlockDetails-img-div"
);

const BlockDetails = () => {
    useEffect(()=>{
      getData()
    },[])
    const roomId = new URLSearchParams(useLocation().search).get("id");
    //roomIs is an createRoomModel _id
    const [roomData,setRoomData]=React.useState()
    const getData=async()=>{
      
     
        console.log(`roomId===${roomId}`)
        console.log(`useEffect`)
        let data=await fetch(`/getData/roomDetails?roomId=${roomId}`,{
          method:'GET',
          headers:{
              'content-Type':'application/json',
              
          }
        })
        data=await data.json()
        
        setRoomData(data)
        console.log(`data===== ${JSON.stringify(data)}`)
        const userId=data.id
        const addressIdRadio=data.addressIdRadio
        console.log(`userId====${userId}`)
        console.log(`addressIdRadio====${addressIdRadio}`)
        let address =await fetch(`/getData/addressData?userId=${userId}&addressIdRadio=${addressIdRadio}`,{
          method:'GET',
          headers:{
              'content-Type':'application/json',
          }
        })
        
        address=await address.json()
        console.log(`address from blockDetails====${JSON.stringify(address)}`)

    }

    const mouseover_fun = (e) => {
      var i = 0;
      while (i < BlockDetails_img_div.length) {
        if (BlockDetails_img_div[i] !== e.target) {
          BlockDetails_img_div[i].style.width = "5%";
          BlockDetails_img_div[i].style.boxShadow = "none";
          BlockDetails_img_div[i].style.opacity = "0.5";
        }
        i++;
      }
      e.target.style.transition = "1.5s ease-in-out";
      e.target.style.boxShadow = "2px 2px 15px 2px gray";
      e.target.style.opacity = "1";
      e.target.style.width = "50%";
    };
    
    return (
        <div className="BlockDetails-main-div">
      <div className="BlockDetails-img-main-div">
        <div
          className="BlockDetails-img-div"
          style={{
            backgroundImage: "url(" + logo + ")",
          }}
          onMouseOver={mouseover_fun}
        ></div>
        <div
          className="BlockDetails-img-div"
          style={{
            backgroundImage: "url(" + logo + ")",
          }}
          onMouseOver={mouseover_fun}
        ></div>
        <div
          className="BlockDetails-img-div"
          style={{
            backgroundImage: "url(" + logo + ")",
            transition: "1.5s ease-in-out",
            boxShadow: "2px 2px 15px 2px gray",
            width: "50%",
            opacity: "1",
          }}
          onMouseOver={mouseover_fun}
        ></div>
        <div
          className="BlockDetails-img-div"
          style={{
            backgroundImage: "url(" + logo + ")",
          }}
          onMouseOver={mouseover_fun}
        ></div>
        <div
          className="BlockDetails-img-div"
          style={{
            backgroundImage: "url(" + logo + ")",
          }}
          onMouseOver={mouseover_fun}
        ></div>
      </div>
      <div className="BlockDetails-detail-main-div">
        <div className="BlockDetails-detail-div">
          <h1>Details</h1>
          <h1>Name Of Owner</h1>
          <p>Place Name</p>
          <p>Area Of Property</p>
          <p>Price Of Property</p>
          <p>Avalablity Near Property</p>
          <button className="BlockDetails-button BlockDetails-buttonATC">
            Add To Cart
          </button>
          <button className="BlockDetails-button BlockDetails-buttonBN">
            Buy Now
          </button>
        </div>
        <div className="BlockDetails-rotate-img-div">
          <img src={logo}></img>
          <button className="BlockDetails-button BlockDetails-button-Image">
            Image
          </button>
          <button className="BlockDetails-button BlockDetails-button-Vedio">
            Vedio
          </button>
          <button className="BlockDetails-button BlockDetails-button-3-DImage">
            3-D Image
          </button>
        </div>
      </div>

      <div className="BlockDetails-RelatedInfoBlock-div">
        <div>
        =
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
