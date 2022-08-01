import React from "react";

const CategoryBox = (props) => {
  let colorStyle = {};
  if (props.cssValue) {
    colorStyle = { color: "#00eb00" };
  } else if (props.cssValue === false) {
    colorStyle = { color: "#ff0e0e" };
  }
  return (
    <span>
      <span className="property-name">{props.item} </span>
      <span style={colorStyle}>{props.value}</span>
    </span>
  );
};

export default CategoryBox;
