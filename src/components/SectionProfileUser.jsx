import React from 'react'
import ProfileImage from './ProfileImage'
import { Link } from 'react-router-dom'
import '../assets/styles/SectionProfileUser.css'

const SectionProfileUser = ({ user }) => {
  return user ? (
    <Link className="section-owner" to={`${process.env.PUBLIC_URL}/user/${user?.username}`}>
        <ProfileImage user={user} />
        <span>{user?.fullname}</span>
    </Link>
  ) : null
}

export default SectionProfileUser
