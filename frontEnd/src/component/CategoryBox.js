import React from "react";

const CategoryBox = (props) => {
  let colorStyle = {};
  if (props.cssValue) {
    colorStyle = { color: "rgb(70 165 1)", fontWeight: "bold"};
  } else if (props.cssValue === false) {
    colorStyle = { color: "#ff0e0e", fontWeight: "bold" };
  }
  return (
    <span>
      <span className="property-name">{props.item} </span>
      <span style={colorStyle}>{props.value}</span>
    </span>
  );
};

export default CategoryBox;
