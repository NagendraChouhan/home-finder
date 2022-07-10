import Block from "../Block"
import img from "../../logo.svg";
import React, { useEffect } from 'react';

const Rooms = () => {
    useEffect(()=>{
        value()
    },[])
    const [blockData,setBlockData]=React.useState([])
    async function value(){

        console.log(`useEffect`)
        let data=await fetch('/rooms',{
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
    return (
        <>
        
            <div className="room-container">
                {blockData.map((data)=>{
                    return <Block img={img} price={data.price} id={data._id} key={data._id}location="Mandsaur"   rating="5" />
                })}
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