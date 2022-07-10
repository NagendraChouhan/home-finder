import React, { useEffect } from 'react'
import tokenvarify from '../../function/function'
import addImage from '../../add-image.png'
import Block from '../Block'
import { useNavigate } from 'react-router-dom'
import {Cookies } from 'react-cookie';


const Dashboard = () => {
  const navigate=useNavigate()
  tokenvarify('/login')
  const [roomData,setRoomData]=React.useState([])
  useEffect(()=>{
    getData()
  },[])
  const getData=async()=>{
    const cookies=new Cookies()
    const token=cookies.get('token')
    let data =await fetch('/bgetData/room',{
      method:'GET',
      headers:{
          'content-Type':'application/json',
          token:token
      }
    })
    data=await data.json()
    console.log(`data from dashborad ====${JSON.stringify(data)}`)
    setRoomData(data)
  }
  const handleOnClick=()=>{
    navigate('/createroom')
  }
  return (
    <>
      <div className='ceate-room-main-div'>
        <div className='div-container'>
          <div className='heading-div'>Your Rooms</div>
          <div className='create-div' onClick={handleOnClick}>
            <img src={addImage} alt='add-image'/>
            <span>Create Room</span>
          </div>
        </div>
        <section className='section-container'>
          <div className='section-div-container'>
            <table>
              <thead>
                <tr>
                  <th className='room-column'>Rooms</th>
                  <th>Date</th>
                  <th>Viewed</th>
                </tr>
              </thead>
              <tbody>
              
                {roomData.map((data)=>{
                    return <tr key={data._id}>
                              <td>
                                <Block imgValue={addImage} price={data.price} id={data._id} border="true" location="Mandsaur"   rating="5" />
                              </td>
                              <td>{data.date}</td>
                              <td></td>
                            </tr>
                })}
                
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default Dashboard