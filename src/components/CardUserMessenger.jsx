import React from 'react'
import '../assets/styles/CardUserMessenger.css'

const CardUserMessenger = ({
  image,
  fullname,
  onUserSelect,
  username,
  user
}) => {
  return (
    <div
      className="CardUserMessenger"
      onClick={() => onUserSelect(fullname, username, user._id)}
    >
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
