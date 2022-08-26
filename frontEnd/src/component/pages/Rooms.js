import Block from "../Block";

import Footer from "../Footer";

import React, { useEffect, useState } from "react";
import FilterDiv from "../FilterDiv";
import SkeletonBar from "../SkeletonBar";

const Rooms = (props) => {
  useEffect(() => {
    props.setLoderfun("30%");
    value();
    window.scrollTo(0, 0);
  }, []);
  const [blockData, setBlockData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function value() {
    props.setLoderfun("60%");

    console.log(`useEffect`);
    let data = await fetch("/brooms", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    props.setLoderfun("70%");
    data = await data.json();
    props.setLoderfun("80%");

    setBlockData(data);
    props.setLoderfun("100%");

    setIsLoading(false);
    setTimeout(function () {
      console.log(`setTimeout`);
      props.setLoderfun("100%", true);
    }, 3000);

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
    console.log(`data feom filter=${JSON.stringify(data)}`);
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
          {isLoading && <SkeletonBar index={10} />}

          {blockData.map((data) => {
            if (data.roomstatus) {
              return (
                <Block
                  imageKey={data.roomImagesKey[0]}
                  roomId={data.id}
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
        {}
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
