import React from 'react'

const CategoryBox = (props) => {
  return (
    <span>
    <span className="property-name">{props.item} </span>
    {props.value}
    </span>
  )
}

export default CategoryBox