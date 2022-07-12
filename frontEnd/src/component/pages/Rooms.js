import Block from "../Block"
import img from "../../logo.svg";
import React, { useEffect } from 'react';
import FilterDiv from '../FilterDiv'

const Rooms = () => {
    useEffect(()=>{
        value()
    },[])
    const [blockData,setBlockData]=React.useState([])
    async function value(){

        console.log(`useEffect`)
        let data=await fetch('/brooms',{
            method:'GET',
            headers:{
                'content-Type':'application/json',
            }
        })
        data=await data.json()
        
        setBlockData(data)
        console.log(`data===== ${JSON.stringify(data)}`)
        console.log(`data===== ${JSON.stringify(data[0]._id)}`)
        console.log(`blockData===== ${blockData.length}`)
        console.log(`data.result.length===${data.length}`)
        
    }
    let [styleValue,setStyleValue]=React.useState({
        filterDiv:"none",
        marginDiv:"10px"
    })
    const handleOnClick=()=>{
    console.log("onClick")
    styleValue.filterDiv==="none"?setStyleValue((preValue)=>({...preValue,filterDiv:"grid"})):setStyleValue((preValue)=>({...preValue,filterDiv:"none"}))
    styleValue.marginDiv==="330px"?setStyleValue((preValue)=>({...preValue,marginDiv:"10px"})):setStyleValue((preValue)=>({...preValue,marginDiv:"330px"}))

  }
    return (
        <>
            <div className="room-div-main">
                <div >
                <div>
                    <span className="toggle-button" onClick={handleOnClick}>Filter</span>
                </div>
                <div style={{display:styleValue.filterDiv}} className="filter-div">
                    <FilterDiv/>
                </div>
                </div>
                <div style={{marginLeft:styleValue.marginDiv}}className="room-container">
                    {blockData.map((data)=>{
                        return <Block imgValue={img} price={data.price} id={data._id} key={data._id}location="Mandsaur"   rating="5" />
                    })}
                </div>
            </div>
        </>
    )
}

export default Rooms;



// useEffect(() => {
//     let isMounted = true;               // note mutable flag
//     someAsyncOperation().then(data => {
//       if (isMounted) setState(data);    // add conditional check
//     })
//     return () => { isMounted = false }; // cleanup toggles value, if unmounted
//   }, []);                               // adjust dependencies to your needs