import React from "react";

const OwnerSection = () => {
  return (
    <section className="owner-section">
      <div className="owner-div-container">
        <h2>Name</h2>
        <h1>Number</h1>
        <form action="" className="contact-form">
          <div className="contact-form-inputBox">
            <input style={{ width: "280px" }} type="text" placeholder="name" />
            <input
              style={{ width: "280px" }}
              type="email"
              placeholder="email"
            />
            <input
              style={{ width: "280px" }}
              type="number"
              placeholder="number"
            />
          </div>

          <textarea 
            style={{ width: "280px" }}
            placeholder="message"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <br />

          <button style={{ width: "280px" }} type="submit" className="btn">
            send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default OwnerSection;
