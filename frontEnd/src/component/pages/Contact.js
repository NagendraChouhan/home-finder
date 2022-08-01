import React, { useEffect } from "react";
import Footer from "../Footer";
import { Cookies } from "react-cookie";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [contactFormData, setContactFormData] = React.useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setContactFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
    // console.log(JSON.stringify(contactFormData))
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(contactFormData));
    if (contactFormData.name !== "") {
      if (contactFormData.email !== "") {
        if (
          contactFormData.number !== "" &&
          contactFormData.number.length >= 10
        ) {
          if (contactFormData.subject !== "") {
            if (contactFormData.message !== "") {
              const cookies = new Cookies();
              const token = cookies.get("token");
              let result = await fetch(`/bcounseling/contact`, {
                method: "POST",
                body: JSON.stringify({ contactFormData }),
                headers: {
                  "content-Type": "application/json",
                  token: token,
                },
              });
              result = await result.json();
              console.log(
                `result from blockDetails====${JSON.stringify(result)}`
              );
              if (result.result) {
                alert(
                  "Your Message is send successfully\nFor more information check your Gmail"
                );
              } else {
                alert(result.err);
              }
            } else {
              console.log("Enter Message");
            }
          } else {
            console.log("Enter Subject");
          }
        } else {
          console.log("Enter Valid  Number");
        }
      } else {
        console.log("Enter Email");
      }
    } else {
      console.log("Enter Name");
    }
  };

  return (
    <>
      <section className="contact" id="contact">
        <h1 className="heading">
          {" "}
          <span>contact</span> us{" "}
        </h1>

        <div className="contact-inner-div">
          <div className="phone">
            <h1>PHONE NUMBER</h1>
            <span
              style={{ fontSize: "xxx-large", lineHeight: "0.5",color:"#00beffd1" }}
              className="material-symbols-outlined"
            >
              call
            </span>
            <p>9587456321</p>
            <p>
              888-555-222 <br />
              (Tol Free)
            </p>
          </div>
          <div className="email">
            <h1>EMAIL</h1>
            <span
              style={{ fontSize: "xxx-large", lineHeight: "0.5",color:"#00beffd1" }}
              className="material-symbols-outlined"
            >
              mail
            </span>
            <p>abc@1234gmail.com</p>
          </div>
          <div className="office">
            <h1>OUR OFFICE</h1>
            <span
              style={{ fontSize: "xxx-large", lineHeight: "0.5",color:"#00beffd1" }}
              className="material-symbols-outlined"
            >
              apartment
            </span>
            <p>adress of office</p>
          </div>
        </div>
        <h1 className="heading">enquiry</h1>
        <form onSubmit={handleOnSubmit} className="contact-form">
          <div className="contact-form-inputBox">
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={handleOnChange}
              value={contactFormData.name}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleOnChange}
              value={contactFormData.email}
            />
          </div>

          <div className="inputBox">
            <input
              type="number"
              placeholder="number"
              name="number"
              onChange={handleOnChange}
              value={contactFormData.number}
            />
            <input
              type="text"
              placeholder="subject"
              name="subject"
              onChange={handleOnChange}
              value={contactFormData.subject}
            />
          </div>

          <textarea
            placeholder="Message"
            name="message"
            cols="30"
            rows="10"
            onChange={handleOnChange}
            value={contactFormData.message}
          ></textarea>
          <br />

          <button type="submit" className="btn">
            send message
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
