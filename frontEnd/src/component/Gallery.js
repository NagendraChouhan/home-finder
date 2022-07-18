import React from "react";

const Gallery = (props) => {
  var d;
  const big = (url) => {
    console.log("click" + url);
    // window.open(url,"_self");
    d = document.getElementById("dialog");
    var d1 = document.getElementById("dialog_div");
    var c = document.getElementById("close");

    d.style.display = "block";
    console.log(`logo=${url}`);
    d1.innerHTML = "<img src=" + url + " alt=" + url + "/>";
    c.addEventListener("click", close_fun);
  };
  function close_fun() {
    console.log(d);
    d.style.display = "none";
  }
  return (
    <>
      <div
        className="image"
        style={{ backgroundImage: "url(" + props.logo + ")" }}
        onClick={() => big(props.logo)}
      ></div>
    </>
  );
};

export default Gallery;
