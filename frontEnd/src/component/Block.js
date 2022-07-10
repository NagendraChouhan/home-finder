import React from 'react';
import BlockDetails from './pages/BlockDetails'
import { useNavigate } from 'react-router-dom';
const Block = (props) => {
    const display=props.display===undefined ?true:false
    const border=props.border===undefined ?true:false
    let displaycss={}
    let displaycssimag={}
    if(!display){
        displaycss={
            minWidth: "auto",
            boxShadow: "0px 0px 15px grey"
        }
        displaycssimag={
            margin:"unset"
        }
    }
    if(!border){
        displaycss={
            border:"none"
        }
    }
    const navigate=useNavigate()
    const handleOnClick=(_id)=>{    

        navigate(`/blockDetails?id=${_id}`)
        console.log(`onClick==${_id}`)
    }
    return (
        <>
            <div className="block-div" style={displaycss} onClick={()=>handleOnClick(props.id)}>
                <img src={props.img} alt="Room Image" style={displaycssimag} />
                <div className="block-value-div">
                    {display &&<span><b>Rs-{props.price}</b></span>}
                    {display &&<span><b>{props.location}</b></span>}
                    {!display &&<span><b>{props.texts}<br/>{props.texts2}</b></span>}
                    {display &&<span style={{ color: "grey" }}>Rating {props.rating}</span>}
                </div>
            </div>
        </>
    )
}

export default Block;