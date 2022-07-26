import React from "react";
import { useNavigate } from "react-router-dom";
const Block = (props) => {
  const display = props.display === undefined ? true : false;
  const border = props.border === undefined ? true : false;
  let displaycss = {};
  let displaycssimag = {};
  let homeTextCSS = {};
  let locationCSS = {};
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
        <img src={props.imgValue} alt="Room Image" style={displaycssimag} />
        {display && (
          <span style={locationCSS} className="location">
            <b style={{ textTransform: "capitalize" }}>{props.location}</b>
          </span>
        )}
        <div className="block-value-div" style={homeTextCSS}>
          {display && (
            <span>
              <b>Rs-{props.price}</b>
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
            <span style={{ color: "grey" }}>Rating {props.rating}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Block;
