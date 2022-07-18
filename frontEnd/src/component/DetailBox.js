import React from 'react'

const DetailBox = (props) => {
  return (
    <div className="blockDetails-box">
        <span>{props.icon}</span>
        <span>{props.item}</span>
        <hr/>
        <span className="value">{props.value}</span>
    </div>
  )
}

export default DetailBox