import React, { useEffect } from "react";
import tokenvarify from "../../function/function";
import addImage from "../../add-image.png";
import Footer from "../Footer";
import img1 from "../../interior-2685521_960_720.jpg";

import Block from "../Block";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  tokenvarify("/login");
  const [roomData, setRoomData] = React.useState([]);
  useEffect(() => {
    getData();
    window.scrollTo(0, 0)

  }, []);
  const getData = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    let data = await fetch("/bgetData/room", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        token: token,
      },
    });
    data = await data.json();
    console.log(`data from dashborad ====${JSON.stringify(data)}`);
    setRoomData(data);
  };
  const handleOnClick = () => {
    navigate("/createroom");
  };
  const handleOnChange=(id,roomstatus)=>{
    console.log("handleOnChange")
    console.log(`roomstatus=${roomstatus}`)
    if(roomstatus){
      if (window.confirm("Are you want to DEACTIVATE the HOME")) {
        updateFun(id,false)
      } 
    }
    else{
      updateFun(id,true)
    }
  }
  const updateFun = async(id,roomstatus) => {
    const cookies = new Cookies();
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
                          imgValue={img1}
                          price={data.price}
                          id={data._id}
                          border="true"
                          location="Mandsaur"
                          rating="5"
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
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
