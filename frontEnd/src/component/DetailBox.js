import React from "react";

const DetailBox = (props) => {
  return (
    <div className="blockDetails-box">
      <span
        style={{ fontSize: "xxx-large", lineHeight: "1" }}
        className={props.iconClass}
      >
        {props.iconText}
      </span>

      <span>{props.item}</span>
      <hr />
      <span className="value">{props.value}</span>
    </div>
  );
};

export default DetailBox;
