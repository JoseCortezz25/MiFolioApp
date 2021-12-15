import React from 'react'
import '../assets/styles/CardUserMessenger.css'

const CardUserMessenger = ({image, fullname}) => {
  console.log(image);
  return (
    <div className="CardUserMessenger">
      <div className="CardUserMessenger__image">
        <img src={image} alt="" />
      </div>
      <p className="CardUserMessenger__fullname">
        {fullname}
      </p>
    </div>
  )
}

export default CardUserMessenger
