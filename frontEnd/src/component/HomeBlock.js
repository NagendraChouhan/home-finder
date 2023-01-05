import React from "react";
import "../css/whyus.css";

const HomeBlock = (props) => {
  let imgCSS = {};
  let imgDivCSS = {};
  if (props.styleValue) {
    imgCSS = { left: 0 };
    imgDivCSS = { flexDirection: "row-reverse" };
  }
  return (
    <section className="section-container">
      <section className="whyus-section-container">
        <div>
          <div>
            <h1 className="heading" style={{ fontSize: "xx-large" }}>
              {props.heading1}
              <span>{props.heading2}</span>
            </h1>
          </div>
          <div className="whyus-div-contaier" style={imgDivCSS}>
            <div className="whyus-image-div-container">
              <img src={props.img} alt="smiling" width={"100%"} />
              {/* <div className="whyus-ima-text-div">
                <span>Now Try Something Different</span>
            </div> */}
            </div>
            <div className="whyus-reason-container">
              <div>
                <h1
                  className="heading"
                  style={{ fontSize: "5vh", textAlign: "left" }}
                >
                  <span style={{ fontSize: "3vh", fontFamily: "cursive" }}>
                    {props.keyPoint}
                    <br />
                  </span>
                  {props.subHeading}
                </h1>
              </div>
              <div className="whyus-point-div-container">
                <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
                <span>01. {props.point1}</span>
                <span>02. {props.point2}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeBlock;
