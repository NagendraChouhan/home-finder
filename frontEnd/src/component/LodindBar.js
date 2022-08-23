import React from 'react'

const LodindBar = (props) => {
    // console.log(`widthValue=${JSON.stringify(props.widthValue)}`)
  return (
          <div id="loding-div" style={{width:`${props.widthValue}`}}className="loding-bar"></div>

  )
}

export default LodindBar