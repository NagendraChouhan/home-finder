import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Block = (props) => {
  useEffect(() => {
    console.log(`inside useEffect`);
    if (props.imageKey !== undefined) {
      // getData();
      setImageUrl(props.imageurl);
    }
  }, []);
  const [imageUrl, setImageUrl] = React.useState();
  // async function getData() {
  //   console.log(`roomId===${props.roomId}`);
  //   console.log(`useEffect`);
  //   console.log(`imageurl===${props.imageurl}`);

  //   console.log(
  //     `window.sessionStorage.getItem(props.imageKey)${window.sessionStorage.getItem(
  //       props.imageKey
  //     )}`
  //   );
  //   const sessionStorageuImageUrl = window.sessionStorage.getItem(
  //     props.imageKey
  //   );
  //   console.log(`useEffect datadata`);

  //   let data = await fetch(
  //     `/bgetData/roomDetails?roomId=${props.roomId}&imageKey=${props.imageKey}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log(`data`);

  //   data = await data.json();
  //   console.log(`data from getdata of block=${JSON.stringify(data)}`);
  //   setImageUrl(data.imagesUrl);
  //   window.sessionStorage.setItem(props.imageKey, data.imagesUrl);
  //   // }
  //   // else{
  //   //   setImageUrl(sessionStorageuImageUrl);
  //   // }
  // }
  const display = props.display === undefined ? true : false;
  const border = props.border === undefined ? true : false;
  let displaycss = {};
  let displaycssimag = {};
  let homeTextCSS = {};
  let locationCSS = {};
  let homeIconCSS = {
    color: "#d9d9d7",
    backgroundColor: "#0172b4",
    borderRadius: "5px",
    padding: "5px",
    // verticalAlign: "middle",
  };
  if (!display) {
    displaycss = {
      minWidth: "auto",
      boxShadow: "0px 0px 15px grey",
    };
    displaycssimag = {
      margin: "unset",
      width: "250px",
      height: "180px",
    };
    homeTextCSS = {
      display: "grid",
      justifyContent: "center",
      padding: "2px 15px",
      marginTop: "7px",
      margin: "0px",
      borderTop: "none",
      fontSize: "revert",
    };
  }
  if (!border) {
    displaycss = {
      border: "none",
    };
    displaycssimag = {
      margin: "unset",
      width: "250px",
      height: "180px",
    };
    locationCSS = {
      fontSize: "large",
      margin: "5% 0% 0% 0%",
      textAlign: "center",
    };
    homeTextCSS = {
      display: "grid",
      justifyContent: "center",
      padding: "2px 15px",
      marginTop: "7px",
      margin: "0px",
      borderTop: "none",
      fontSize: "revert",
    };
  }
  const navigate = useNavigate();
  const handleOnClick = (_id) => {
    if (_id !== undefined) {
      navigate(`/blockDetails?id=${_id}`);
      console.log(`onClick==${_id}`);
    }
  };

  return (
    <>
      <div
        className="block-div"
        style={displaycss}
        onClick={() => handleOnClick(props.id)}
      >
        {props.imgValue === undefined ? (
          <div
            className="Block-BlockDetails-img-div"
            style={{
              backgroundImage: "url(" + imageUrl + ")",
            }}
          ></div>
        ) : (
          <img src={props.imgValue} alt="Room Image" style={displaycssimag} />
        )}

        {display && (
          <span style={locationCSS} className="location">
            <b style={{ textTransform: "capitalize" }}>{props.location}</b>
          </span>
        )}
        <div className="block-value-div" style={homeTextCSS}>
          {display && (
            <span>
              <b>₹{props.price}</b>
            </span>
          )}
          {!display && (
            <span>
              <b>
                {props.texts}
                <br />
                {props.texts2}
              </b>
            </span>
          )}
          {display && (
            <span>
              <i style={homeIconCSS} className="fa fa-home"></i>&nbsp;
              <span
                style={{
                  fontFamily: "sans-serif",
                  textDecoration: "underline",
                }}
              >
                {props.roomtype}
              </span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Block;
