import React, { useEffect } from "react";

const AlertBlock = (props) => {
  console.log("AlertBlock");
  useEffect(() => {
    let alertId = document.getElementById("alertId");
    alertId.style.display = "block";
    setTimeout(function () {
      alertId.style.display = "none";
      console.log("setTimeout");
      props.showErrFunc()
    }, 3000);
  });
  return (
    <>
      <div id="alertId" className="alert-div">
        {props.consoleErr}
      </div>
    </>
  );
};

export default AlertBlock;
