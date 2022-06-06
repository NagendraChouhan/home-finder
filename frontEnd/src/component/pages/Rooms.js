import Block from "../Block"
import img from "../../logo.svg";
function Rooms(){
    return(
        <>
            <div className="room-container">
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
                <Block img={img} price="1000" location="Mandsaur" rating="5"/>
            </div>
        </>
    )
}

export default Rooms;