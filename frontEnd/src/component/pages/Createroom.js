import React, { useEffect } from "react";
import addImage from "../../add-image.png";
import { Cookies } from "react-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import Footer from "../Footer";

const CreateRoom = () => {
  // const { data, otherParam } = Route.params;
  const id = new URLSearchParams(useLocation().search).get("id");
  
  let buttonText="Create Room"
  if(id!==undefined && id!==null){
    buttonText="Save"
  }
  console.log(` id from CreateRoom =${id}`)
  const [formData, setFormData] = React.useState({
    roomtype: "",
    otherThingsAvailable: "",
    price: "",
    securityCharge: "",
    numberOfSameRoom: "",
    area: "",
    country: "",
    state: "",
    district: "",
    houseNo: "",
    colony: "",
    landmark: "",
    pinCode: "",
    addressIdRadio: "",
    Bed: 0,
    Table: 0,
    Almirah: 0,
    pg: false,
    checkboxBed: false,
    checkboxTable: false,
    checkboxAlmirah: false,
    wifi: false,
    packing: false,
    Ventilation: false,
    checkboxSecurityCharge: false,
    Boys: false,
    Girls: false,
    Famaly: false,
    checkboxNumberOfSameRoom: false,
    images: [],
    addAddress: false,
  });
  const [availableAddress, setAvailableAddress] = React.useState([]);
  const [userLocation, setUserLocation] = React.useState({
    longitude:"",
    latitude:"",
  });
  const setUserLocationFun=()=>{
    navigator.geolocation.getCurrentPosition((postion)=>{
      console.log(`user position=${JSON.stringify(postion.coords)}`)
      setUserLocation({
        longitude:postion.coords.longitude,
        latitude:postion.coords.latitude,
      })
      console.log(`user longitude:postion.coords.longitude=${useLocation.longitude}`)
      console.log(`user latitude:postion.coords.latitude=${useLocation.latitude}`)
    })
  }

  useEffect(() => {
    value();
    if(id!==undefined && id!==null){
      getData()
      buttonText="Save"
    }
    window.scrollTo(0, 0)
  }, []);

  const navigate = useNavigate()

  async function value() {
    console.log(`useEffect`);
    const cookies = new Cookies();
    const token = cookies.get("token");
    let data = await fetch("/bgetData?addAddress=true", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        token: token,
      },
    });
    data = await data.json();

    // console.log(`data from value=====##########====== ${JSON.stringify(data)}`);
    setAvailableAddress(data);
    // console.log(`data from availableAddress=====##########====== ${availableAddress}`);
  }
  const getData = async () => {
    console.log(`roomId===${id}`);
    console.log(`useEffect`);
    let data = await fetch(`/bgetData/roomDetails?roomId=${id}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    data = await data.json();
    console.log(`data from getdata of createRoom=${JSON.stringify(data)}`)
    setFormData((preValue)=>({
      ...preValue,
      // "_id":"62c82cc41470f0355bf5e204",
      // "id":"62a8c4693a09045867968c22",
      roomtype:data.roomtype,
      price:data.price,
      securityCharge:data.securityCharge,
      checkboxSecurityCharge:data.securityCharge==null?false:true,
      numberOfSameRoom:data.numberOfSameRoom,
      checkboxNumberOfSameRoom:data.numberOfSameRoom==null?false:true,
      area:data.area,
      addressIdRadio:data.addressIdRadio,
      pg:data.pg,
      otherThingsAvailable:data.otherThingsAvailable,
      Bed:data.Bed,
      checkboxBed:data.Bed>0?true:false,
      Table:data.Table,
      checkboxTable:data.Table>0?true:false,
      Almirah:data.Almirah,
      checkboxAlmirah:data.Almirah>0?true:false,
      Ventilation:data.Ventilation,
      wifi:data.wifi,
      packing:data.packing,
      Boys:data.Boys,
      Girls:data.Girls,
      Famaly:data.Famaly,
    }));
  }

  const handelOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((perFormData) => ({
      ...perFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handelOnChangeImage = (event) => {
    const fileArray = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    console.log(fileArray);
    setFormData((perFormData) => ({
      ...perFormData,
      images: perFormData.images.concat(fileArray),
    }));
    Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
  };
  const removeImages = (photo) => {
    console.log("removeImages ");
    console.log(`formData.images[i]=== ${JSON.stringify(formData.images)}`);
    var newArray = [];
    for (let i = 0; i < formData.images.length; i++) {
      if (formData.images[i] !== photo) {
        console.log("removeImages ");
        newArray = newArray.concat(formData.images[i]);
        console.log(`formData.images.splice(i,1) ${newArray}`);
      }
    }
    console.log(`typeof===${typeof formData.images[1]}`);
    setFormData((perFormData) => ({
      ...perFormData,
      images: newArray,
    }));
  };
  const renderImges = (images) => {
    return images.map((photo) => {
      return (
        <img
          onClick={() => removeImages(photo)}
          src={photo}
          key={photo}
          alt={photo}
          width={300}
        />
      );
    });
  };
  const handleOnClick = () => {
    setUserLocationFun();
    setFormData((prevalue) => ({
      ...prevalue,
      addAddress: !prevalue.addAddress,
      country: "",
      state: "",
      district: "",
      houseNo: "",
      colony: "",
      landmark: "",
      pinCode: "",
    }));
  };

  const submitForm = async () => {
    console.log("Form is ready to submit");
    console.log(`from CreateRoom=====${JSON.stringify(formData)}`);
    let result ;
    const cookies = new Cookies();
    const token = cookies.get("token");
    console.log(`req to /bcreateRoom/updateAllData id=${id}`)
    if(id!==undefined){
      console.log(`req to /bcreateRoom/updateAllData`)
      result = await fetch(`/bcreateRoom/updateAllData?id=${id}`, {
        method: "put",
        body: JSON.stringify({ formData }),
        headers: {
          "content-Type": "application/json",
          token: token,
        },
      });
      navigate(`/blockDetails?id=${id}`)

    }
    else{
      console.log(`req to /bcreateRoom`)

        result = await fetch("/bcreateRoomjhgjhg", {
        method: "post",
        body: JSON.stringify({ formData }),
        headers: {
          "content-Type": "application/json",
          token: token,
        },
      });
      navigate(`/dashboard`)
      
    }

    result = await result.json();
    console.log(`result from CreateRoom =====##########====== ${result}`);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(formData.roomtype);
    console.log(typeof formData.roomtype);
    if (formData.roomtype !== "") {
      if (formData.checkboxBed && formData.Bed <= 0) {
        console.log("Bed Value Must Be More Then 0");
      } else {
        if (formData.checkboxTable && formData.Table <= 0) {
          console.log("Table Value Must Be More Then 0");
        } else {
          if (formData.checkboxAlmirah && formData.Almirah <= 0) {
            console.log("Almirah Value Must Be More Then 0");
          } else {
            if (formData.price !== "") {
              if (formData.area !== "") {
                if (formData.images.length >= 3) {
                  if (
                    formData.checkboxSecurityCharge &&
                    formData.securityCharge === ""
                  ) {
                    console.log("Enter Security Charge");
                  } else {
                    if (
                      formData.checkboxNumberOfSameRoom &&
                      formData.numberOfSameRoom === ""
                    ) {
                      console.log("Enter Number of Same Room You Have");
                    } else {
                      if (formData.addAddress) {
                        if (formData.country !== "") {
                          if (formData.state !== "") {
                            if (formData.district !== "") {
                              if (formData.houseNo !== "") {
                                if (formData.colony !== "") {
                                  if (formData.landmark !== "") {
                                    if (formData.pinCode !== "") {
                                      submitForm();
                                    } else {
                                      console.log("Enter pinCode");
                                    }
                                  } else {
                                    console.log("Enter landmark");
                                  }
                                } else {
                                  console.log("Enter colony");
                                }
                              } else {
                                console.log("Enter houseNo");
                              }
                            } else {
                              console.log("Enter district");
                            }
                          } else {
                            console.log("Enter state");
                          }
                        } else {
                          console.log("Enter country");
                        }
                      } else {
                        if (formData.addressIdRadio !== "") {
                          submitForm();
                        } else {
                          console.log("Select Address");
                        }
                      }
                    }
                  }
                } else {
                  console.log("Min 3 images requied");
                }
              } else {
                console.log("Enter Area");
              }
            } else {
              console.log("Enter Price");
            }
          }
        }
      }
    } else {
      console.log("Select Type of Room");
    }
  };
  return (
    <>
      <div className="create-room-main-div">
        <div>Create Room</div>
        <section className="section-container">
          <div className="section-div-container">
            <form onSubmit={handleOnSubmit}>
              <select
                name="roomtype"
                value={formData.roomtype}
                onChange={handelOnChange}
              >
                <option value="">Type of Room*</option>
                <option value="Single Room">Single Room</option>
                <option value="1RK">1 RK</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="2BHK2T">2 BHK 2T</option>
                <option value="3BHK2T">3 BHK 2T</option>
                <option value="3BHK3T">3 BHK 3T</option>
              </select>
              <div className="form-div">
                <label>
                  <input
                    type="checkbox"
                    name="pg"
                    checked={formData.pg}
                    onChange={handelOnChange}
                  />
                  Is this a PG ?
                </label>
              </div>
              <div className="form-div">
                <span>Available Things In Room</span>
                <label>
                  <input
                    type="checkbox"
                    name="checkboxBed"
                    checked={formData.checkboxBed}
                    onChange={handelOnChange}
                  />
                  Bed
                </label>
                {formData.checkboxBed && (
                  <input
                    type="number"
                    name="Bed"
                    value={formData.Bed}
                    placeholder="Enter Number of Bed*"
                    onChange={handelOnChange}
                  />
                )}

                <label>
                  <input
                    type="checkbox"
                    name="checkboxTable"
                    checked={formData.checkboxTable}
                    onChange={handelOnChange}
                  />
                  Table
                </label>
                {formData.checkboxTable && (
                  <input
                    type="number"
                    name="Table"
                    value={formData.Table}
                    placeholder="Enter Number of Table*"
                    onChange={handelOnChange}
                  />
                )}
                <label>
                  <input
                    type="checkbox"
                    name="checkboxAlmirah"
                    checked={formData.checkboxAlmirah}
                    onChange={handelOnChange}
                  />
                  Almirah
                </label>
                {formData.checkboxAlmirah && (
                  <input
                    type="number"
                    name="Almirah"
                    value={formData.Almirah}
                    placeholder="Enter Number of Almirah*"
                    onChange={handelOnChange}
                  />
                )}
                <label>
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi}
                    onChange={handelOnChange}
                  />
                  wifi
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="packing"
                    checked={formData.packing}
                    onChange={handelOnChange}
                  />
                  Packing Space
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="Ventilation"
                    checked={formData.Ventilation}
                    onChange={handelOnChange}
                  />
                  Ventilation in Room
                </label>
              </div>
              <input
                type="text"
                name="otherThingsAvailable"
                value={formData.otherThingsAvailable}
                placeholder="Other"
                onChange={handelOnChange}
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Enter Price Of Room*"
                onChange={handelOnChange}
              />
              <div className="form-div">
                <label>
                  <input
                    type="checkbox"
                    name="checkboxSecurityCharge"
                    checked={formData.checkboxSecurityCharge}
                    onChange={handelOnChange}
                  />
                  Security Charge
                </label>
              </div>
              {formData.checkboxSecurityCharge && (
                <input
                  type="number"
                  name="securityCharge"
                  value={formData.securityCharge}
                  placeholder="Enter Security Charge*"
                  onChange={handelOnChange}
                />
              )}
              <input
                type="number"
                name="area"
                value={formData.area}
                placeholder="Enter Area of Room*"
                onChange={handelOnChange}
              />
              <div className="form-div">
                <span>Room is Available</span>
                <label>
                  <input
                    type="checkbox"
                    name="Boys"
                    checked={formData.Boys}
                    onChange={handelOnChange}
                  />
                  Boys
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="Girls"
                    checked={formData.Girls}
                    onChange={handelOnChange}
                  />
                  Girls
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="Famaly"
                    checked={formData.Famaly}
                    onChange={handelOnChange}
                  />
                  Family
                </label>
              </div>
              <div className="form-div">
                <label>
                  <input
                    type="checkbox"
                    name="checkboxNumberOfSameRoom"
                    checked={formData.checkboxNumberOfSameRoom}
                    onChange={handelOnChange}
                  />
                  You have more than one room of the same size and price in the
                  same place?
                </label>
              </div>
              {formData.checkboxNumberOfSameRoom && (
                <input
                  type="number"
                  name="numberOfSameRoom"
                  value={formData.numberOfSameRoom}
                  placeholder="Enter no. of Same Room*"
                  onChange={handelOnChange}
                />
              )}
              <div className="form-div">
                <span>Add Photos Minimum 3</span>
                <label>
                  Select images
                  <img src={addImage} alt="add-image" width={30} />
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handelOnChangeImage}
                    style={{ display: "none" }}
                  />
                </label>
                <div>{renderImges(formData.images)}</div>
              </div>
              <button type="button" onClick={handleOnClick}>
                {formData.addAddress
                  ? "Select From Available Address"
                  : "Add New Address"}
              </button>
              {formData.addAddress ? (
                <div className="address-div">
                  <label>
                    Country
                    <input
                      type="text"
                      name="country"
                      placeholder="Enter Country"
                      value={formData.country}
                      onChange={handelOnChange}
                    />
                  </label>
                  <label>
                    State
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter State"
                      value={formData.state}
                      onChange={handelOnChange}
                    />
                  </label>
                  <label>
                    District
                    <input
                      type="text"
                      name="district"
                      placeholder="Enter District"
                      value={formData.district}
                      onChange={handelOnChange}
                    />
                  </label>
                  <label>
                    House No.
                    <input
                      type="text"
                      name="houseNo"
                      placeholder="Enter House Number"
                      value={formData.houseNo}
                      onChange={handelOnChange}
                    />
                  </label>
                  <label>
                    Colony Name
                    <input
                      type="text"
                      name="colony"
                      placeholder="Enter Colony Name"
                      value={formData.colony}
                      onChange={handelOnChange}
                    />
                  </label>
                  <label>
                    Landmark
                    <input
                      type="text"
                      name="landmark"
                      placeholder="Ex.- Near to Scholl,Collage,garden, et.c"
                      value={formData.landmark}
                      onChange={handelOnChange}
                    />
                  </label>
                  <label>
                    Pin Code
                    <input
                      type="number"
                      name="pinCode"
                      placeholder="Enter Pin Code"
                      title="Only use Number"
                      value={formData.pinCode}
                      onChange={handelOnChange}
                    />
                  </label>

                  <button id="addsubbtn" type="submit">
                    Add Address
                  </button>
                </div>
              ) : (
                availableAddress.map((data) => {
                  let checked=false
                  if(formData.addressIdRadio!==""){
                    if(data._id==formData.addressIdRadio){
                      checked=true
                    }

                  }
                  return (
                    <label key={data._id}>
                      <input
                        type="radio"
                        name="addressIdRadio"
                        value={data._id}
                        onChange={handelOnChange}
                        checked={checked}
                      />
                      <p>
                        <span>{data.country}</span>
                        <br />
                        <span>{data.state}</span>
                        <br />
                        <span>{data.district}</span>
                        <br />
                        <span>{data.houseNo}</span>
                        <br />
                        <span>{data.colony}</span>
                        <br />
                        <span>{data.landmark}</span>
                        <br />
                        <span>{data.pinCode}</span>
                        <br />
                      </p>
                    </label>
                  );
                })
              )}
              <div className="button-div">
                
                <button type="submit">{buttonText}</button>
                
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default CreateRoom;
