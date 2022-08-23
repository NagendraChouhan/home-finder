import React, { useEffect } from "react";
import addImage from "../../add-image.png";
import { Cookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import AlertBlock from "../AlertBlock";
import Footer from "../Footer";

const CreateRoom = (props) => {
  // const { data, otherParam } = Route.params;
  const id = new URLSearchParams(useLocation().search).get("id");
  //this id is an room _id

  let buttonText = "Create Room";
  if (id !== undefined && id !== null) {
    buttonText = "Save";
  }
  const [disabledButton, setDisabledButton] = React.useState(false);
  console.log(` id from CreateRoom =${id}`);
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
    imageFile: [],
    prevImagesKey: [],
    removeImagesValue: [],
    removeImagesFlag: true,
    updateFlag: false,
    imageFileFlag: false,
    addAddress: false,
  });
  const [availableAddress, setAvailableAddress] = React.useState([]);
  const [userLocation, setUserLocation] = React.useState({
    longitude: "",
    latitude: "",
  });

  const [consoleErr, setConsoleErr] = React.useState();
  const showErrFunc = () => {
    setConsoleErr(null);
  };
  const setUserLocationFun = () => {
    navigator.geolocation.getCurrentPosition((postion) => {
      console.log(`user position=${JSON.stringify(postion.coords)}`);
      setUserLocation({
        longitude: postion.coords.longitude,
        latitude: postion.coords.latitude,
      });
      console.log(
        `user longitude:postion.coords.longitude=${useLocation.longitude}`
      );
      console.log(
        `user latitude:postion.coords.latitude=${useLocation.latitude}`
      );
    });
  };

  useEffect(() => {
    props.setLoderfun("60%")

    value();
    if (id !== undefined && id !== null) {
      getData();
      buttonText = "Save";
    }
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  async function value() {
    if (id === undefined || id === null) {
      props.setLoderfun("80%")
    }

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
    if (id === undefined || id === null) {
      props.setLoderfun("100%")
    }
    else(
      props.setLoderfun("70%")
    )
    data = await data.json();
  
    // console.log(`data from value=====##########====== ${JSON.stringify(data)}`);
    
    setAvailableAddress(data);
    if (id === undefined || id === null) {
      props.setLoderfun("100%",true)
    }
    else(
      props.setLoderfun("80%")
    )
    // console.log(`data from availableAddress=====##########====== ${availableAddress}`);
  }
  const getData = async () => {
    props.setLoderfun("90%")

    console.log(`roomId===${id}`);
    console.log(`useEffect`);
    let data = await fetch(`/bgetData/roomDetails?roomId=${id}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    props.setLoderfun("100%")
    data = await data.json();

    console.log(
      `data from getdata of createRoom=${JSON.stringify(data.images)}`
    );

    setFormData((preValue) => ({
      ...preValue,
      roomtype: data.roomDetail.roomtype,
      price: data.roomDetail.price,
      securityCharge: data.roomDetail.securityCharge,
      checkboxSecurityCharge:
        data.roomDetail.securityCharge == null ? false : true,
      numberOfSameRoom: data.roomDetail.numberOfSameRoom,
      checkboxNumberOfSameRoom:
        data.roomDetail.numberOfSameRoom == null ? false : true,
      area: data.roomDetail.area,
      addressIdRadio: data.roomDetail.addressIdRadio,
      pg: data.roomDetail.pg,
      otherThingsAvailable: data.roomDetail.otherThingsAvailable,
      Bed: data.roomDetail.Bed,
      checkboxBed: data.roomDetail.Bed > 0 ? true : false,
      Table: data.roomDetail.Table,
      checkboxTable: data.roomDetail.Table > 0 ? true : false,
      Almirah: data.roomDetail.Almirah,
      checkboxAlmirah: data.roomDetail.Almirah > 0 ? true : false,
      Ventilation: data.roomDetail.Ventilation,
      wifi: data.roomDetail.wifi,
      packing: data.roomDetail.packing,
      Boys: data.roomDetail.Boys,
      Girls: data.roomDetail.Girls,
      Famaly: data.roomDetail.Famaly,
      images: data.images,
      prevImagesKey: data.roomDetail.roomImagesKey,
      updateFlag: true,
      imageFileFlag: true,
    }));
    props.setLoderfun("100%",true)
  };

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
      imageFile: event.target.files,
      images: fileArray,
      removeImagesValue: [],
      removeImagesFlag: false,
    }));
    Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
  };
  const removeImages = (photo) => {
    console.log("removeImages ");
    // console.log(`formData.images[i]=== ${JSON.stringify(photo)}`);
    var newArray = [];
    var fileimg = {};
    var localRemoveImages = [];

    if (
      formData.prevImagesKey.length >= 1 &&
      formData.imageFileFlag &&
      formData.removeImagesFlag
    ) {
      setFormData((perFormData) => ({
        ...perFormData,
        imageFileFlag: false,
      }));
      for (let i = 0; i < formData.prevImagesKey.length; i++) {
        let value = formData.prevImagesKey[i];
        formData.imageFile = { ...formData.imageFile, [i]: value };
      }
      console.log(
        `formData.prevImagesKey.length =${formData.prevImagesKey.length} && formData.updateFlag=${formData.updateFlag}`
      );
    }
    console.log(`formData.imageFile ${JSON.stringify(formData.imageFile)}`);
    console.log(`formData.updateFlag ${JSON.stringify(formData.updateFlag)}`);
    let index = 0;
    for (let i = 0; i < formData.images.length; i++) {
      if (formData.images[i] !== photo) {
        console.log("if i= " + [i]);
        newArray = newArray.concat(formData.images[i]);
        let fileimgVlue = formData.imageFile[i];
        fileimg = { ...fileimg, [index]: fileimgVlue };
        console.log(`fileimg= ${JSON.stringify(fileimg)}`);
        console.log(
          `formData.imageFile[${i}] ${JSON.stringify(formData.imageFile[i])}`
        );
        index++;
      } else if (formData.updateFlag) {
        localRemoveImages = formData.removeImagesValue.concat(
          formData.imageFile[i]
        );
        console.log("else i= " + [i]);
        console.log(`else fileimg= ${JSON.stringify(fileimg)}`);
        console.log(
          `else formData.imageFile[${i}] ${JSON.stringify(
            formData.imageFile[i]
          )}`
        );
      }
    }
    console.log(`fileimg setFormData= ${JSON.stringify(fileimg)}`);

    setFormData((perFormData) => ({
      ...perFormData,
      images: newArray,
      imageFile: fileimg,
      removeImagesValue: localRemoveImages,
    }));
    console.log(
      `formData.removeImagesValue=${JSON.stringify(formData.removeImagesValue)}`
    );
    console.log(`formDataimageFile==${JSON.stringify(formData.imageFile)}`);
    console.log(`formDataimages==${JSON.stringify(formData.images)}`);
  };
  const renderImges = (images) => {
    // console.log(` renderImges = (images) =${JSON.stringify(images[0])}`);
    // console.log(` renderImges = (images) =${JSON.stringify(images)}`);
    return images.map((photo) => {
      return (
        <img
          onClick={() => removeImages(photo)}
          src={photo}
          key={photo}
          alt={photo}
          style={{ width: "230px", height: "180px", margin: "5px" }}
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
    setDisabledButton(true);
    console.log("Form is ready to submit");
    console.log(`from CreateRoom=====${JSON.stringify(formData)}`);
    let result;
    const cookies = new Cookies();
    const token = cookies.get("token");
    console.log(`req to /bcreateRoom/updateAllData id=${id}`);
    var roomId = id; //this id we send is an an room _id
    if (id !== null && formData.updateFlag) {
      //this id we send is an an room _id

      //send req to /bcreateRoom/updateAllData for update the room data and save to the Data base

      console.log(`req to /bcreateRoom/updateAllData`);
      result = await fetch(`/bcreateRoom/updateAllData?id=${id}`, {
        method: "put",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      console.log(`req to /bcreateRoom/image id=${JSON.stringify(result)}`);
      console.log(
        `formData.imageFile.length=${JSON.stringify(formData.imageFile)}`
      );
      console.log(
        `formData.imageFile.length=${Object.keys(formData.imageFile).length}`
      );

      if (Object.keys(formData.imageFile).length === 0) {
        console.log(`formData.imageFile length=${formData.imageFile.length}`);
        console.log(`navigate`);

        navigate(`/blockDetails?id=${id}`);
      }
    } else {
      console.log(
        `req to /bcreateRoom/images formData.image=${JSON.stringify(
          formData.imageFile
        )}`
      );
      console.log(`req to /bcreateRoom`);

      //send req to /bcreateRoom for create and save the room data to the Data base

      result = await fetch("/bcreateRoom", {
        method: "post",
        body: JSON.stringify({ formData }),
        headers: {
          "content-Type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      console.log(`req to /bcreateRoom id=${result.result._id}`);

      roomId = result.result._id;
    }
    console.log(
      `Images saving Object.keys ${Object.keys(formData.imageFile).length}`
    );
    if (result.result) {
      console.log(
        `Images saving formData.imageFile ${JSON.stringify(formData.imageFile)}`
      );

      if (Object.keys(formData.imageFile).length > 0) {
        //send req to /bcreateRoom/image for uploading images to bucket  and save the key/image Name in Data base
        console.log(
          `Images savingformData.imageFile.length  ${formData.imageFile.length}`
        );
        const formData1 = new FormData();
        for (let i = 0; i < formData.images.length; i++) {
          formData1.append("imageFile", formData.imageFile[i]);
        }
        result = await axios.post(
          `/bcreateRoom/image?roomId=${roomId}`,
          formData1,
          {
            headers: { "Content-Type": "multipart/form-data", token: token },
          }
        );
      }
      if (id !== null && formData.updateFlag) {
        //send req to /bcreateRoom/deleteImages for deleting images to bucket  and update the in Data base
        console.log(`deleteImages`);
        // const formData1 = new FormData();
        // formData1.append("removeImages", formData.removeImages);
        // formData1.append("prevImagesKey", formData.prevImagesKey);
        let deleteImages;
        if (formData.removeImagesFlag) {
          deleteImages = formData.removeImagesValue;
        } else {
          deleteImages = formData.prevImagesKey;
        }
        result = await axios.delete(
          `/bcreateRoom/deleteImage?roomId=${roomId}`,
          {
            data: {
              deleteImagesKey: deleteImages,
            },
            headers: { "Content-Type": "application/json", token: token },
          }
        );
      }
      console.log(`navigate1`);
      navigate(`/blockDetails?id=${roomId}`);

      // navigate(`/dashboard`);
    }
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(formData.roomtype);
    console.log(typeof formData.roomtype);
    if (formData.roomtype !== "") {
      if (formData.checkboxBed && formData.Bed <= 0) {
        setConsoleErr("Bed Value Must Be More Then 0");
        console.log("Bed Value Must Be More Then 0");
      } else {
        if (formData.checkboxTable && formData.Table <= 0) {
          setConsoleErr("Table Value Must Be More Then 0");
          console.log("Table Value Must Be More Then 0");
        } else {
          if (formData.checkboxAlmirah && formData.Almirah <= 0) {
            setConsoleErr("Almirah Value Must Be More Then 0");
            console.log("Almirah Value Must Be More Then 0");
          } else {
            if (formData.price !== "") {
              if (formData.area !== "") {
                if (formData.images.length >= 5) {
                  if (formData.images.length <= 30) {
                    if (
                      formData.checkboxSecurityCharge &&
                      formData.securityCharge === ""
                    ) {
                      setConsoleErr("Enter Security Charge");
                      console.log("Enter Security Charge");
                    } else {
                      if (formData.Famaly || formData.Girls || formData.Boys) {
                        if (
                          formData.checkboxNumberOfSameRoom &&
                          formData.numberOfSameRoom === ""
                        ) {
                          setConsoleErr("Enter Number of Same Room You Have");
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
                                          setConsoleErr("Please Enter pinCode");
                                          console.log("Enter pinCode");
                                        }
                                      } else {
                                        setConsoleErr("Please Enter landmark");
                                        console.log("Enter landmark");
                                      }
                                    } else {
                                      setConsoleErr("Please Enter colony");
                                      console.log("Enter colony");
                                    }
                                  } else {
                                    setConsoleErr("Please Enter houseNo");
                                    console.log("Enter houseNo");
                                  }
                                } else {
                                  setConsoleErr("Please Enter district");
                                  console.log("Enter district");
                                }
                              } else {
                                setConsoleErr("Please Enter state");
                                console.log("Enter state");
                              }
                            } else {
                              setConsoleErr("Please Enter country");
                              console.log("Enter country");
                            }
                          } else {
                            if (formData.addressIdRadio !== "") {
                              submitForm();
                            } else {
                              setConsoleErr("Please Select or Add New Address");
                              console.log("Select or Add New Address");
                            }
                          }
                        }
                      }
                      else{
                        setConsoleErr("Please Select Atleast One Option of Room is Available");
                        console.log("Please Select Atleast One Option of Room is Available");
                      }
                    }
                  } else {
                    setConsoleErr("Max 30 images are Allowed");
                    console.log("Max 30 images are Allowed");
                  }
                } else {
                  setConsoleErr("Min 5 images requied");
                  console.log("Min 3 images requied");
                }
              } else {
                setConsoleErr("Please Enter Area");
                console.log("Enter Area");
              }
            } else {
              setConsoleErr("Please Enter Price");
              console.log("Enter Price");
            }
          }
        }
      }
    } else {
      setConsoleErr("Please Select Type of Room");
      console.log("Select Type of Room");
    }
  };
  return (
    <>
      {consoleErr && (
        <AlertBlock consoleErr={consoleErr} showErrFunc={showErrFunc} />
      )}
      <div className="create-room-main-div">
        <div>Create Room</div>
        <section className="section-container">
          <div className="section-div-container">
            <form
              className="roomCreateForm"
              onSubmit={handleOnSubmit}
              style={{ width: "90%", margin: "auto" }}
            >
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
                <span>Add Photos Minimum 5</span>
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
              <button
                type="button"
                className="address-btn"
                onClick={handleOnClick}
              >
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
                </div>
              ) : (
                <div className="address-div">
                  {availableAddress.map((data) => {
                    let checked = false;
                    if (formData.addressIdRadio !== "") {
                      if (data._id == formData.addressIdRadio) {
                        checked = true;
                      }
                    }
                    return (
                      <label style={{ display: "flex" }}>
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
                  })}
                </div>
              )}
              <div className="button-div">
                <button
                  disabled={disabledButton}
                  style={disabledButton ? { cursor: "no-drop" } : {}}
                  type="submit"
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CreateRoom;
