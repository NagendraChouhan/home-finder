import React, { useEffect } from "react";
import tokenvarify from "../../function/function";
import addImage from "../../add-image.png";

import Block from "../Block";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Dashboard = (props) => {
  const navigate = useNavigate();
  tokenvarify("/login");
  const [roomData, setRoomData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  useEffect(() => {
    props.setLoderfun("60%")

    getData();
    window.scrollTo(0, 0)

  }, []);
  const getData = async () => {
    props.setLoderfun("80%")

    const cookies = new Cookies();
    const token = cookies.get("token");
    const admin = cookies.get("admin");
    console.log(`admin=${admin}`)
    let data
    if(admin==='login'){
      console.log('in admin')
      data = await fetch("/bgetData/admin", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          token: token,
        },
      });
    }
    else{
      console.log('in else admin')

      data = await fetch("/bgetData/room", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          token: token,
        },
      });
    }
    props.setLoderfun("90%")

    data = await data.json();
    props.setLoderfun("100%")

    console.log(`data from dashborad ====${JSON.stringify(data)}`);
    setRoomData(data.rooms);
    if(data.userdata){

      setUserData(data.users)
      console.log(`user data=${JSON.stringify(data.users)}`)
    }
    props.setLoderfun("100%",true)

  };
  const handleOnClick = () => {
    navigate("/createroom");
  };
  const handleOnChange=(id,roomstatus)=>{
    console.log("handleOnChange")
    console.log(`roomstatus=${roomstatus}`)
    if(roomstatus){
      if (window.confirm("Are you want to DEACTIVATE your HOME")) {
        updateFun(id,false)
      } 
    }
    else{
      updateFun(id,true)
    }
  }
  const cookies = new Cookies();
  const updateFun = async(id,roomstatus) => {
        const token = cookies.get("token");
      
        console.log(`id==${id}`)
        let data = await fetch(`/bcreateRoom/update?id=${id}&roomstatus=${roomstatus}`, {
          method: "put",
          headers: {
            "content-Type": "application/json",
            token: token,
          },
        });
        data = await data.json();
        getData();
        console.log(`data from dashborad ====${JSON.stringify(data)}`);
  };
  const handleOnClickEdit=(_id)=>{
    console.log(`data=${_id}`)
    // console.log(`_id=${JSON.stringify(data)}`)
    navigate(`/createroom?id=${_id}`);
    //send room _id
  }
  return (
    <>
      <div className="ceate-room-main-div">
        <div className="div-container">
          <div className="heading-div">Your Rooms</div>
          <div className="create-div" onClick={handleOnClick}>
            <img src={addImage} alt="add-image" />
            <span>Create Room</span>
          </div>
        </div>
        <section className="section-container">
          <div className="section-div-container">
            <table>
              <thead>
                <tr>
                  <th className="room-column">Rooms</th>
                  <th>Date</th>
                  <th>Viewed</th>
                </tr>
              </thead>
              <tbody>
                {roomData.map((data) => {
                  const checked=data.roomstatus
                  return (
                    <tr key={data._id}>
                      <td>
                        <Block
                          imageKey={data.roomImagesKey[0]}
                          roomId={data.id}
                          price={data.price}
                          id={data._id}
                          border="true"
                          location={data.district}
                          roomtype={data.roomtype}
                        />
                      </td>
                      <td>{data.date}</td>
                      <td style={{position: "relative"}}>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={()=>handleOnChange(data._id,data.roomstatus)}
                            checked={checked}
                            />
                          <span className="slider round"></span>
                        </label>
                        <div className="edit-div" onClick={()=>handleOnClickEdit(data._id)}>Edit</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        { userData.length>0 &&<section className="section-container">
          <div className="section-div-container">
            <table style={{margin:'10px 0px'}}>
              <thead>
                <tr>
                  {/* <th className="room-column">S.NO.</th> */}
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data) => {
                  const checked=data.roomstatus
                  return (
                    <tr key={data._id}>
                      {/* <td>{data._id}</td> */}
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>}
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Dashboard;
