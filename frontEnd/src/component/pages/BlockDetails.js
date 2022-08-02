import React, { useEffect } from "react";
import logo from "../../logo.svg";
import { useLocation } from "react-router-dom";
import DetailBox from "../DetailBox";
import AlertBlock from "../AlertBlock";
import Footer from "../Footer";
import CategoryBox from "../CategoryBox";
import StarRating from "../StarRating";
import Gallery from "../Gallery";
import OwnerSection from "../OwnerSection";
import img from "../../john-schnobrich-FlPc9_VocJ4-unsplash.jpg";
import aboutImg from "../../olga-serjantu-tqkDGqPW8Vo-unsplash.jpg";
import aboutImg1 from "../../christin-hume-Hcfwew744z4-unsplash.jpg";
import aboutImg2 from "../../christin-hume-hBuwVLcYTnA-unsplash.jpg";
import aboutImg3 from "../../kobu-agency-7okkFhxrxNw-unsplash.jpg";

var BlockDetails_img_div = document.getElementsByClassName(
  "BlockDetails-img-div"
);

const BlockDetails = () => {
  useEffect(() => {
    getData();
    getReviewData();
    window.scrollTo(0, 0);
  }, []);
  const roomId = new URLSearchParams(useLocation().search).get("id");
  //roomIs is an createRoomModel _id
  const [roomData, setRoomData] = React.useState({});
  const [userDetails, setuserDetails] = React.useState({});
  const [rating, setRating] = React.useState([]);
  const [totalRating, setTotalRating] = React.useState({
    roomId: roomId,
    name: "",
    email: "",
    message: "",
    Service: 0,
    Price: 0,
    Quality: 0,
    Location: 0,
  });
  const [consoleErr, setConsoleErr] = React.useState();
  const showErrFunc = () => {
    setConsoleErr(null);
  };

  const getData = async () => {
    console.log(`roomId===${roomId}`);
    console.log(`useEffect`);
    let data = await fetch(`/bgetData/roomDetails?roomId=${roomId}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    data = await data.json();

    setRoomData(data);
    // console.log(`data===== ${JSON.stringify(data)}`);
    // console.log(`data===== ${JSON.stringify(data)}`);
    const userId = data.id;
    const addressIdRadio = data.addressIdRadio;
    // console.log(`userId====${userId}`);
    // console.log(`addressIdRadio====${addressIdRadio}`);
    let userDetails = await fetch(
      `/bgetData/addressData?userId=${userId}&addressIdRadio=${addressIdRadio}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    userDetails = await userDetails.json();
    setuserDetails(userDetails);
    console.log(
      `userDetails from blockDetails====${JSON.stringify(userDetails)}`
    );
  };
  const getReviewData = async () => {
    let reviewData = await fetch(`/broomReview/breviewData?roomId=${roomId}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    reviewData = await reviewData.json();
    console.log(
      `Review Data from blockDetails====${JSON.stringify(reviewData)}`
    );

    setRating(reviewData);
  };

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
  const totalRatingfun = (item, data) => {
    console.log(`item===${item}`);
    console.log(`data===${data}`);
    item = item.substring(0, item.length - 1);
    console.log(`item===${item}`);

    setTotalRating((preValue) => ({
      ...preValue,
      [item]: data,
    }));
    console.log(`JSON.stringify(totalRating===${JSON.stringify(totalRating)}`);
  };

  const handleOnSubmitReview = async (event) => {
    event.preventDefault();
    console.log(`JSON.stringify(totalRating===${JSON.stringify(totalRating)}`);
    if (totalRating.name !== "") {
      if (totalRating.email !== "") {
        if (totalRating.Service > 0) {
          if (totalRating.Price > 0) {
            if (totalRating.Quality > 0) {
              if (totalRating.Location > 0) {
                let result = await fetch("/broomReview", {
                  method: "POST",
                  body: JSON.stringify({ totalRating }),
                  headers: {
                    "content-Type": "application/json",
                  },
                });
                result = await result.json();
                console.log(
                  `result from /broomReview ${JSON.stringify(result)}`
                );
                setConsoleErr(JSON.stringify(result.result));
              } else {
                console.log(`Review for Location`);
                setConsoleErr("Please Review for Location");
              }
            } else {
              console.log(`Review for quality`);
              setConsoleErr("Please Review for Quality");
            }
          } else {
            console.log(`Review for price`);
            setConsoleErr("Please Review for Price");
          }
        } else {
          console.log(`Review for Service`);
          setConsoleErr("Please Review for service");
        }
      } else {
        console.log(`Enter email`);
        setConsoleErr("Please Enter Email");
      }
    } else {
      console.log(`Enter name`);
      setConsoleErr("Please Enter Name");
    }
  };
  const handleOnChangeReview = (event) => {
    const { name, value } = event.target;
    setTotalRating((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };
  let service = 0;
  let quality = 0;
  let price = 0;
  let location = 0;
  return (
    <>
      {consoleErr && (
        <AlertBlock consoleErr={consoleErr} showErrFunc={showErrFunc} />
      )}
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
          <div
            className="BlockDetails-img-div-alter"
            style={{
              backgroundImage: "url(" + logo + ")",
            }}
            onMouseOver={mouseover_fun}
          ></div>
        </div>

        <section className="BlockDetails-section">
          <div className="BlockDetails-container">
            <div className="BlockDetails-detail-container">
              <div className="BlockDetails-detail">
                <div className="BlockDetails-detail-div">
                  <h1>
                    <span
                      style={{ verticalAlign: "top" }}
                      className="material-symbols-outlined"
                    >
                      other_houses
                    </span>
                    <span> {roomData.roomtype}</span>
                  </h1>
                  <span>
                    <span
                      style={{ verticalAlign: "sub" }}
                      className="material-symbols-outlined"
                    >
                      location_on
                    </span>
                    <span>{userDetails.houseNo} </span>
                    <span>{userDetails.colony}, </span>
                    <span>{userDetails.district} </span>
                  </span>
                  <h2>
                    <span
                      style={{ verticalAlign: "sub" }}
                      className="material-symbols-outlined"
                    >
                      currency_rupee
                    </span>
                    <span>{roomData.price}</span>
                  </h2>
                  <span>
                    <span
                      style={{ verticalAlign: "sub" }}
                      className="material-symbols-outlined"
                    >
                      villa
                    </span>
                    <span> {roomData.area} sqrt</span>
                  </span>
                </div>
              </div>
              <section className="box-section">
                <div className="box-div-container">
                  <DetailBox
                    iconClass="material-symbols-outlined"
                    iconText="villa"
                    item="area"
                    value={`${roomData.area} sqrt`}
                  />
                  <DetailBox
                    iconClass="material-symbols-outlined"
                    iconText="meeting_room"
                    item="Bedrooms"
                    value={roomData.bedrooms}
                  />
                  <DetailBox
                    iconClass="material-symbols-outlined"
                    iconText="bathtub"
                    item="Bathrooms"
                    value={roomData.bathrooms}
                  />
                  <DetailBox
                    iconClass="material-symbols-outlined"
                    iconText="king_bed"
                    item="Beds"
                    value={roomData.Bed}
                  />
                </div>
              </section>
            </div>
            <section className="owner-section-top">
              <OwnerSection
                name={userDetails.name}
                email={userDetails.email}
                ownerId={userDetails.ownerId}
              />
            </section>
          </div>

          <section className="BlockDetails-facility-section">
            <div className="facility-container">
              <div className="BlockDetails-facility-div">
                <h2>Details</h2>
                <div className="category top-category">
                  <div className="sub-category">
                    <CategoryBox
                      item="Property Type:"
                      value={roomData.roomtype}
                    />
                    <CategoryBox item="price:" value={`₹${roomData.price}`} />
                    <CategoryBox
                      item="Security Charge:"
                      value={
                        roomData.securityCharge == null
                          ? "Null"
                          : `₹${roomData.securityCharge}`
                      }
                    />

                    <CategoryBox item="Area:" value={`${roomData.area} sqrt`} />
                    <CategoryBox item="Bed:" value={roomData.Bed} />
                    <CategoryBox item="Table:" value={roomData.Table} />
                  </div>
                  <div className="sub-category">
                    <CategoryBox item="Almirah:" value={roomData.Almirah} />
                    <CategoryBox
                      item="PG:"
                      cssValue={roomData.pg}
                      value={roomData.pg === true ? "Yes" : "No"}
                    />
                    <CategoryBox
                      item="Wifi:"
                      cssValue={roomData.wifi}
                      value={roomData.wifi === true ? "Yes" : "No"}
                    />
                    <CategoryBox
                      item="Packing:"
                      cssValue={roomData.packing}
                      value={roomData.packing === true ? "Yes" : "No"}
                    />
                    <CategoryBox
                      item="Ventilation:"
                      cssValue={roomData.Ventilation}
                      value={roomData.Ventilation == true ? "Yes" : "No"}
                    />
                  </div>
                </div>
                <h2>Available For</h2>
                <div className="category">
                  <CategoryBox
                    item="Boys:"
                    cssValue={roomData.Boys}
                    value={
                      roomData.Boys === true
                        ? "Yes, It is available for Boys"
                        : "No"
                    }
                  />
                  <CategoryBox
                    item="Girls:"
                    cssValue={roomData.Girls}
                    value={
                      roomData.Girls === true
                        ? "Yes, It is available for Girls"
                        : "No"
                    }
                  />
                  <CategoryBox
                    item="Famaly:"
                    cssValue={roomData.Famaly}
                    value={
                      roomData.Famaly === true
                        ? "Yes, It is available for Famaly"
                        : "No"
                    }
                  />
                </div>
                <section>
                  <h2>Location</h2>
                  <div className="category">
                    <span>{userDetails.country}</span>
                    <span>{userDetails.houseNo}</span>
                    <span>{userDetails.colony},</span>
                    <span>{userDetails.district}</span>
                    <span>Near {userDetails.landmark}</span>
                    <span>{userDetails.pinCode}</span>
                    <span>{userDetails.state}</span>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </section>
        <section className="gallery-section">
          <div className="gallery-container">
            <h2>Gallery</h2>
            <div className="div_main">
              <div className="div_image">
                <Gallery logo={img} />
                <Gallery logo={aboutImg} />
                <Gallery logo={aboutImg1} />
                <Gallery logo={aboutImg2} />
                <Gallery logo={aboutImg3} />
                <Gallery logo={logo} />
              </div>
            </div>
            <div id="dialog" className="dialog">
              <span id="close">&times;</span>
              <p>Image</p>
              <div id="dialog_div" className="modal-content"></div>
            </div>
          </div>
        </section>
        <section className="owner-section-down">
          <h2>Counselling</h2>
          <OwnerSection
            name={userDetails.name}
            email={userDetails.email}
            ownerId={userDetails.ownerId}
          />
        </section>
        <section className="section-review">
          <h2>Review</h2>
          <div className="review-container">
            <div>
              <form className="review-form" onSubmit={handleOnSubmitReview}>
                <div className="rating-div-container">
                  <div className="sub-rating-div">
                    <StarRating fun={totalRatingfun} text="Service?" />
                    <StarRating fun={totalRatingfun} text="Price?" />
                    <StarRating fun={totalRatingfun} text="Quality?" />
                    <StarRating fun={totalRatingfun} text="Location?" />
                  </div>
                  <div className="total-rating-div">
                    <span className="total-review-value">
                      {(totalRating.Service +
                        totalRating.Quality +
                        totalRating.Price +
                        totalRating.Location) /
                        4}
                    </span>
                    <span>Average Rating</span>
                  </div>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleOnChangeReview}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleOnChangeReview}
                  />

                  <textarea
                    placeholder="Message"
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                    onChange={handleOnChangeReview}
                  ></textarea>
                  <button type="submit" className="btn">
                    send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        {rating.length > 0 && (
          <section className=".section-review,">
            <h2>Review</h2>
            <section className="rating-container">
              <div className="rating-div-container">
                {rating.map((data) => {
                  service = service + data.service;
                  quality = quality + data.quality;
                  price = price + data.price;
                  location = location + data.location;
                })}
                {rating.length > 0 && (
                  <div className="sub-rating-div">
                    <StarRating
                      value={true}
                      index={service / rating.length}
                      text="Service?"
                    />
                    <StarRating
                      value={true}
                      index={quality / rating.length}
                      text="Price?"
                    />
                    <StarRating
                      value={true}
                      index={price / rating.length}
                      text="Quality?"
                    />
                    <StarRating
                      value={true}
                      index={location / rating.length}
                      text="Location?"
                    />
                  </div>
                )}
                <div className="total-rating-div">
                  <span className="total-review-value">
                    {(
                      (service + quality + price + location) /
                      4 /
                      rating.length
                    ).toFixed(2)}
                  </span>
                  <span>Average Rating</span>
                  {/* <div>{(service / rating.length).toFixed(2)}</div>
                <div>{(quality / rating.length).toFixed(2)}</div>
                <div>{(price / rating.length).toFixed(2)}</div>
                <div>{(location / rating.length).toFixed(2)}</div> */}
                </div>
              </div>
              <div style={{ marginTop: "13%" }}>
                {rating.map((data) => {
                  return (
                    <div className="review-div" key={data._id}>
                      <div>
                        <div>
                          <b>{data.name}</b>
                        </div>
                        <span>{data.date}</span>
                      </div>
                      <div>
                        <StarRating
                          value={true}
                          index={
                            (data.service +
                              data.quality +
                              data.price +
                              data.location) /
                            4
                          }
                          textVisible={true}
                        />
                      </div>
                      <div>{data.message}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlockDetails;

{
  /* <div className="BlockDetails-rotate-img-div">
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
            </div> */
}
