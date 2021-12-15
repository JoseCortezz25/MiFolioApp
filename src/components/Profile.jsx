import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { getUserByUsername } from '../services/user'
import CardProject from './CardProject'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useParams } from 'react-router-dom'
import iconFeed from '../assets/static/icons/icon-feed.svg'
import imageUserDefault from '../assets/static/images/user-stock.png'
import { Loading } from './Loading'
import { getToken, validateUser, getCurrentUser } from '../utils/helpers'
import { Link } from 'react-router-dom'
import iconSendMessenge from '../assets/static/icons/send-icon.svg'
import io from 'socket.io-client'
import UserContext from '../context/UserContext'
import { followUser, verifyUserToFollow } from '../services/user'

import '../assets/styles/Profile.css'

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [isFollowingToUser, setIsFollowingToUser] = useState(false)
  const isAuthenticated = getToken()
  const { user } = useContext(UserContext)
  let { username } = useParams()
  const [room, setRoom] = useState('')


  useEffect(() => {
    getUserByUsername(username).then(dataUser => {
      setUserProfile(dataUser)
    })
    verifyUserToFollow(user?._id, userProfile?._id)
      .then(data => {
        console.log(data);
        if (data.statusText === 'OK' && data.status === 200) {
          setIsFollowingToUser(true)
        } else {
          setIsFollowingToUser(false)
        }
      })
  }, [user?._id, userProfile?._id, username, isFollowingToUser])


  const joinRoom = () => {
    const socket = io('http://localhost:5001')
    console.log('room name:', room)
    socket.emit('join_room', room)
  }

  const handleFollowToUser = (id_sender, id_receiver) => {
    followUser(id_sender, id_receiver, isFollowingToUser).then(data => {
      if (data.statusText === 'OK' && data.status === 200) {
        setIsFollowingToUser(true)
      }
    })
  }

  return userProfile ? (
    <section className="container-profile">
      <div className="section-profile">
        <div className="profile-image">
          {userProfile?.profile_image
            ? <img src={userProfile?.profile_image.imageURL} alt={`profile of ${userProfile?.fullname}`} />
            : <img src={imageUserDefault} alt="profile" />
          }
        </div>
        <div className="profile-info">
          <div className="box-fullname">
            <h1 className="profile-name">{userProfile?.fullname}</h1>
            {isAuthenticated && validateUser(userProfile._id, getCurrentUser())
              ? <Link to={`${process.env.PUBLIC_URL}/update-user/${userProfile?.username}`} className="btn-edit-user">Edit user</Link>
              : <button
                onClick={() => handleFollowToUser(user._id, userProfile._id)}
                className={isFollowingToUser ? 'btn-normal-standard  btn-following none-style-btn' : 'btn-normal-standard none-style-btn btn-follow'}
              >
                {isFollowingToUser ? 'Following' : 'Follow'}
              </button>
            }
          </div>
          <p className="profile-profession">{userProfile?.profession}</p>
          <p className="profile-description">{userProfile?.description}</p>
          <p><strong>Following: {userProfile?.following?.length}</strong></p>
          <p><strong>Followers: {userProfile?.followers?.length}</strong></p>

          <Link onClick={joinRoom} to="#" className="btn-message">
            <img src={iconSendMessenge} alt="" />
            <span>Message</span>
          </Link>

          {/* { isAuthenticated && validateUser(userProfile._id, getCurrentUser()) ? <Link to={`${process.env.PUBLIC_URL}/add-project/`} className="btn-standard btn-add">Add new project</Link> : null} */}
        </div>
      </div>
      <div className="section-profile-info">



        <div className="feed-projects-profile">
          <div className="box-title-projects">
            <span className="icon-feed"><img src={iconFeed} alt="icon" /></span><p>Projects</p>
          </div>
          {userProfile.projects.length > 0
            ?
            < ResponsiveMasonry >
              <Masonry gutter="3rem">
                {userProfile.projects.map(project => (
                  <CardProject key={project._id} project={project} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
            : <div className="section-not-resources">
              <p>😕 No project added yet</p>
              {isAuthenticated && validateUser(userProfile._id, getCurrentUser()) ? <Link to={`${process.env.PUBLIC_URL}/add-project/`} className="btn-standard btn-add">Add your first project</Link> : null}
            </div>
          }
        </div>
      </div>
    </section >
  ) : (<Loading />)
}

export default Profile
