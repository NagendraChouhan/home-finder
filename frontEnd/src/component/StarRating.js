import React from 'react'
import BlockDetails from './pages/BlockDetails'

const StarRating = (props) => {
    const [clicked, setClicked] = React.useState([false, false, false, false, false]);
    const handleOnClick=async(e, index)=>{
          e.preventDefault();
          let clickStates = [...clicked];
          for (let i = 0; i < 5; i++) {
            if (i <= index) {clickStates[i] = true;}
            else {clickStates[i] = false;}
          }
      
          setClicked(clickStates);

          console.log(JSON.stringify(clicked))
          props.fun(props.text,index+1)
    }
  return (
    <div>
        <span className='star-text'>{props.text}</span>
        <div className="star-rating">
        <div className="star-input">
            <input type="radio" name="rating"  />
            <label  
                onClick={(e) => handleOnClick(e, 4)}
                className="fas fa-star" 
                style={clicked[4] ? {color:"#ffc107"} : null}>
            </label>
            <input type="radio" name="rating" />
            <label 
                onClick={(e) => handleOnClick(e, 3)}
                className="fas fa-star"
                style={clicked[3] ? {color:"#ffc107"} : null}>
            </label>
            <input type="radio" name="rating"  />
            <label 
                onClick={(e) => handleOnClick(e, 2)}
                className="fas fa-star"
                style={clicked[2] ? {color:"#ffc107"} : null}>
            </label>
            <input type="radio" name="rating"  />
            <label 
                onClick={(e) => handleOnClick(e, 1)}
                className="fas fa-star"
                style={clicked[1] ? {color:"#ffc107"} : null}>
            </label>
            <input type="radio" name="rating"  />
            <label 
                onClick={(e) => handleOnClick(e, 0)}
                className="fas fa-star"
                style={clicked[0] ? {color:"#ffc107"} : null}>
            </label>
        </div>
        </div>
    </div>
  )
}

export default StarRating