import React from 'react'
import imageUserDefault from '../assets/static/images/user-stock.png'
import '../assets/styles/ProfileImage.css';

const ProfileImage = ({ user }) => {
  return (
    <div className="box-user-profile">
      {user?.profile_image
        ? <img src={user?.profile_image.imageURL} alt={`profile of ${user?.fullname}`} />
        : <img src={imageUserDefault} alt="profile" />
      }
    </div>
  )
}

export default ProfileImage
