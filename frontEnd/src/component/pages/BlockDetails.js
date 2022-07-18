import React, { useEffect } from "react";
import logo from "../../logo.svg";
import { useLocation } from "react-router-dom";
import DetailBox from "../DetailBox";
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

const BlockDetails = (props) => {
  useEffect(() => {
    getData();
  }, []);
  const roomId = new URLSearchParams(useLocation().search).get("id");
  //roomIs is an createRoomModel _id
  const [roomData, setRoomData] = React.useState();
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
    console.log(`data===== ${JSON.stringify(data)}`);
    const userId = data.id;
    const addressIdRadio = data.addressIdRadio;
    console.log(`userId====${userId}`);
    console.log(`addressIdRadio====${addressIdRadio}`);
    let address = await fetch(
      `/bgetData/addressData?userId=${userId}&addressIdRadio=${addressIdRadio}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    address = await address.json();
    console.log(`address from blockDetails====${JSON.stringify(address)}`);
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
  const [totalRating, setTotalRating] = React.useState({
    Service: 0,
    Price: 0,
    Quality: 0,
    Location: 0,
  });
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

      <section className="BlockDetails-section">
        <div className="BlockDetails-container">
          <div className="BlockDetails-detail-container">
            <div className="BlockDetails-detail">
              <div className="BlockDetails-detail-div">
                <h1>Name of House</h1>
                <span>Place Name</span>
                <h2>Price Of Property</h2>
                <span>Area Of Property</span>
              </div>
            </div>
            <section className="box-section">
              <div className="box-div-container">
                <DetailBox icon="LOGO" item="area" value="811sqft" />
                <DetailBox icon="LOGO" item="Bedrooms" value="3" />
                <DetailBox icon="LOGO" item="Bathrooms" value="2" />
                <DetailBox icon="LOGO" item="Beds" value="1" />
              </div>
            </section>
          </div>
          <section className="owner-section-top">
            <OwnerSection />
          </section>
        </div>

        <section className="BlockDetails-facility-section">
          <div className="facility-container">
            <div className="BlockDetails-facility-div">
              <h2>Details</h2>
              <div className="category top-category">
                <div className="sub-category">
                  <CategoryBox item="Property Type:" value="Value" />
                  <CategoryBox item="price:" value="Value" />
                  <CategoryBox item="Security Charge:" value="Value" />
                  <CategoryBox item="PG:" value="Value" />
                  <CategoryBox item="Area:" value="Value" />
                  <CategoryBox item="Bed:" value="Value" />
                </div>
                <div className="sub-category">
                  <CategoryBox item="Table:" value="Value" />
                  <CategoryBox item="Almirah:" value="Value" />

                  <CategoryBox item="Wifi:" value="Value" />
                  <CategoryBox item="Packing:" value="Value" />
                  <CategoryBox item="Ventilation:" value="Value" />
                </div>
              </div>
              <h2>Available For</h2>
              <div className="category">
                <CategoryBox item="Boys:" value="Value" />
                <CategoryBox item="Girls:" value="Value" />
                <CategoryBox item="Famaly:" value="Value" />
              </div>
              <h2>Location</h2>
              <div className="category">
                <span>country</span>
                <span>state</span>
                <span>district</span>
                <span>houseNo</span>
                <span>colony</span>
                <span>landmark</span>
                <span>pinCode</span>
              </div>
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
        <OwnerSection />
      </section>
      <section className="section-review">
        <h2>Review</h2>
        <div className="review-container">
          <div>
            <form>
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
                  style={{ width: "46%" }}
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                />
                <input
                  style={{ width: "46%" }}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                />
              </div>
              <textarea
                placeholder="Message"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
              <button type="submit" className="btn">
                send message
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
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
      </section>
    </div>
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
