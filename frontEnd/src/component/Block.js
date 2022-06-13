function Block(props){
    return(
        <>
            <div className="block-div" >
                <img src={props.img} alt="Room Image"/>
                <div className="block-value-div">
                    <span><b>Rs-{props.price}</b></span>
                    <span><b>{props.location}</b></span>
                    <span style={{color:"grey"}}>Rating {props.rating}</span>
                </div>
            </div>
        </>
    )
}

export default Block;