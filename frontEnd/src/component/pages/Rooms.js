import Block from "../Block";
import Footer from "../Footer";
import img from "../../logo.svg";
import img1 from "../../interior-2685521_960_720.jpg";

import React, { useEffect } from "react";
import FilterDiv from "../FilterDiv";

const Rooms = () => {
  useEffect(() => {
    value();
    window.scrollTo(0, 0);
  }, []);
  const [blockData, setBlockData] = React.useState([]);

  async function value() {
    console.log(`useEffect`);
    let data = await fetch("/brooms", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    data = await data.json();

    setBlockData(data);
    console.log(`data===== ${JSON.stringify(data)}`);
    console.log(`data===== ${JSON.stringify(data[0]._id)}`);
    console.log(`blockData===== ${blockData.length}`);
    console.log(`data.result.length===${data.length}`);
  }
  let [styleValue, setStyleValue] = React.useState({
    filterDiv: "none",
    marginDiv: "10px",
  });

  const setBlockDatafun = (data) => {
    setBlockData(data);
  };

  const handleOnClick = () => {
    console.log("onClick");
    styleValue.filterDiv === "none"
      ? setStyleValue((preValue) => ({ ...preValue, filterDiv: "grid" }))
      : setStyleValue((preValue) => ({ ...preValue, filterDiv: "none" }));
    styleValue.marginDiv === "330px"
      ? setStyleValue((preValue) => ({ ...preValue, marginDiv: "10px" }))
      : setStyleValue((preValue) => ({ ...preValue, marginDiv: "330px" }));
  };
  return (
    <>
      <div className="room-div-main">
        <div>
          <div>
            <span className="toggle-button" onClick={handleOnClick}>
              Filter
            </span>
          </div>
          <div style={{ display: styleValue.filterDiv }} className="filter-div">
            <FilterDiv setBlockDatafun={setBlockDatafun} />
          </div>
        </div>
        <div
          style={{ marginLeft: styleValue.marginDiv }}
          className="room-container"
        >
          {blockData.map((data) => {
            if (data.roomstatus) {
              return (
                <Block
                  imgValue={img1}
                  price={data.price}
                  id={data._id}
                  key={data._id}
                  location={data.district}
                  roomtype={data.roomtype}
                />
              );
            }
            return;
          })}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Rooms;

// useEffect(() => {
//     let isMounted = true;               // note mutable flag
//     someAsyncOperation().then(data => {
//       if (isMounted) setState(data);    // add conditional check
//     })
//     return () => { isMounted = false }; // cleanup toggles value, if unmounted
//   }, []);                               // adjust dependencies to your needs
