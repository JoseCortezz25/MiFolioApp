import React from 'react'
import '../assets/styles/Profile.css'

const Profile = () => {
  return (
    <section className="container-profile">
      <div className="section-profile">
        <div className="profile-image">
          <img src="/static/images/user-icon-default.jpg" alt="{{ profile.name }}" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">user.fullname</h1>
          <p className="profile-profession">user.profession</p>
          <div className="profile-skills">
          </div>
        </div>
      </div>
      <div className="section-profile-info">
        <h2 className="title-section-profile">Description</h2>
        <p className="profile-description">user.description</p>
      </div>
    </section >
  )
}

export default Profile
