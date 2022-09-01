import React, { useEffect } from "react";
import Footer from "../Footer";
import { Cookies } from "react-cookie";
import AlertBlock from "../AlertBlock";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const Profile = (props) => {
    const navigate = useNavigate();
  const [consoleErr, setConsoleErr] = React.useState();
  const [profileData, setprofileData] = React.useState({
    name: "",
    phoneNo: "",
    email: "",
    dob: "",
  });
  function handleOnChange(event) {
    const {name, value} = event.target;
    console.log(name)
    console.log(value)
    setprofileData((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  }
  useEffect(() => {
    props.setLoderfun("80%");
    value();
    window.scrollTo(0, 0);
  }, []);
  async function value() {
    props.setLoderfun("90%");

    console.log(`useEffect`);
    const cookies = new Cookies();
    const token = cookies.get("token");
    let data = await fetch("/bgetData", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        token: token,
      },
    });
    props.setLoderfun("100%");

    data = await data.json();
    console.log(`data=${JSON.stringify(data)}`)
    setprofileData((prevalue) => ({
      ...prevalue,
      name: data.name,
      phoneNo: data.phone,
      email: data.email,
      dob: moment(data.dob).utc().format('YYYY-MM-DD'),
    }));
    props.setLoderfun("100%", true);
  }
  const showErrFunc = () => {
    setConsoleErr(null);
  };
  const handleOnSubmitPersonalInfo = async (event) => {
    event.preventDefault();
    console.log(`dob=${profileData.dob}`)
    if (profileData.phoneNo.length !== 10) {
      setConsoleErr("Please Enter Valid Mobile Number");
      console.log("Enter Mobile Number");
    } else {
      if (profileData.dob === undefined) {
        setConsoleErr("Please Enter DOB");
        console.log("Enter DOB");
      } else {
        const cookies = new Cookies();
        const token = cookies.get("token");
        console.log(`profileData=${JSON.stringify(profileData)}`)
        const result = await fetch("/bprofileupdate", {
          method:"put",
          body: JSON.stringify({ profileData }),
          headers: {
          "Content-Type": "application/json",
            token: token,
          },
          
        });
      }
    }
 };
  const handleOnSubmitPassUpdate=(event)=>{
    event.preventDefault()
    navigate(`/forgetPassword?email=${profileData.email}`);
    
  }
  return (
    <>
      {consoleErr && (
        <AlertBlock consoleErr={consoleErr} showErrFunc={showErrFunc} />
      )}
      <div className="profile-main-div">
        <h1 className="heading">
          <span>{profileData.name}</span>
        </h1>
        <div style={{}}>
          <div className="profile">
            {/* <h1 style={{fontSize: "x-large", lineHeight:2.2}}>My Details</h1> */}
            <form onSubmit={handleOnSubmitPersonalInfo}>
              <h3>Personal Information</h3>
              <div className="profile-container">
                <label className="label">Name :Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  required
                  onChange={handleOnChange}
                  value={profileData.name}
                />
                <br />
                <label className="label">Mobile Number</label>
                <input
                  type="number"
                  placeholder="Enter Mobile Number"
                  name="phoneNo"
                  required
                  onChange={handleOnChange}
                  value={profileData.phoneNo}
                />
                <br />
                <label className="label">DOB</label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleOnChange}
                  value={profileData.dob}
                />
                <span style={{ color: "red" }} className="pass_class"></span>
                <br />
                <button type="submit">Save</button>
                <br />
              </div>
            </form>

            <form onSubmit={handleOnSubmitPassUpdate}>
              <h3>E-mail Address Information</h3>
              <div className="profile-container">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  value={profileData.email}
                />
                <br />
              </div>
              <h3>Password update</h3>
              <div className="profile-container">
                <button type="submit">Change Password</button>
                <br />
              </div>
            </form>
          </div>

          <div id="Address" style={{ display: "none" }}>
            "addresspartial"
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
