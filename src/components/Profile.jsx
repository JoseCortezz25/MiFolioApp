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
import UserContext from '../context/UserContext'
import { followUser, verifyUserToFollow } from '../services/user'
import iconNotFound from '../assets/static/images/not_found.svg'

import '../assets/styles/Profile.css'

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [isFollowingToUser, setIsFollowingToUser] = useState(false)
  const [stateFollow, setStateFollow] = useState({
    countFollowers: 0,
    countFollowing: 0
  })
  const isAuthenticated = getToken()
  const { user } = useContext(UserContext)
  let { username } = useParams()

  const handleFollowToUser = (id_sender, id_receiver) => {
    followUser(id_sender, id_receiver, isFollowingToUser).then(data => {
      const message = data.data.body.message
      const userToFollow = data.data.body.user
      setStateFollow({
        ...stateFollow,
        countFollowers: userToFollow.followers.length,
        countFollowing: userToFollow.following.length
      })
      if (data.statusText === 'OK' && data.status === 200 && message === 'follow') {
        setIsFollowingToUser(true)
      } else if (data.statusText === 'OK' && data.status === 200 && message === 'unfollow') {
        setIsFollowingToUser(false)
      }
    })
  }

  const goLoginPage = () => window.location.href = '/login'

  useEffect(() => {
    getUserByUsername(username)
      .then(dataUser => {
        setUserProfile(dataUser)
        setStateFollow({
          ...stateFollow,
          countFollowers: dataUser.followers.length,
          countFollowing: dataUser.following.length
        })
      })
  }, [username])

  useEffect(() => {
    const verifyIfUserToFollow = (sender, idReceiver) => {
      const userFollowed = sender?.following.find(user => user.toString() === idReceiver)
      userFollowed ? setIsFollowingToUser(true) : setIsFollowingToUser(false)
    }

    verifyIfUserToFollow(user, userProfile?._id)
  }, [user, userProfile])

  //userProfile?._id, isFollowingToUser

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
            {isAuthenticated && validateUser(userProfile?._id, getCurrentUser())
              ? <Link to={`${process.env.PUBLIC_URL}/update-user/${userProfile?.username}`} className="btn-edit-user">Edit user</Link>
              :
              isAuthenticated ? (
                <button
                  onClick={() => handleFollowToUser(user._id, userProfile._id)}
                  className={isFollowingToUser ? 'btn-normal-standard  btn-following none-style-btn' : 'btn-normal-standard none-style-btn btn-follow'}
                >
                  {isFollowingToUser ? 'Following' : 'Follow'}
                </button>
              ) : (
                <button
                  onClick={goLoginPage}
                  className={isFollowingToUser ? 'btn-normal-standard  btn-following none-style-btn' : 'btn-normal-standard none-style-btn btn-follow'}
                >
                  {isFollowingToUser ? 'Following' : 'Follow'}
                </button>
              )
            }
          </div>
          <p className="profile-profession">{userProfile?.profession}</p>
          <div className="info-details">
            <p><strong>{userProfile?.projects.length}</strong> Projects</p>
            <p><strong>{stateFollow.countFollowing || 0}</strong> Following</p>
            <p><strong>{stateFollow.countFollowers || 0}</strong> Followers</p>
          </div>

          <p className="profile-description">{userProfile?.description}</p>

          {/* <Link onClick={joinRoom} to="#" className="btn-message">
            <img src={iconSendMessenge} alt="" />
            <span>Message</span>
          </Link> */}
        </div>
      </div>
      <div className="section-profile-info">
        <div className="feed-projects-profile">
          <div className="box-title-projects">
            <span className="icon-feed"><img src={iconFeed} alt="icon" /></span><p>Projects</p>
          </div>
          {userProfile?.projects.length > 0
            ?
            < ResponsiveMasonry >
              <Masonry gutter="3rem">
                {userProfile.projects.map(project => (
                  <CardProject key={project._id} project={project} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
            :
            <div className="feed-projects-empty">
              <div className="feed-projects-image">
                <img src={iconNotFound} alt="Not found projects" />
              </div>
              <h2>No project added yet</h2>
              {isAuthenticated && validateUser(userProfile?._id, getCurrentUser()) ? 
                <Link 
                  to={`${process.env.PUBLIC_URL}/add-project/`} 
                  className="btn-standard btn-add">
                    Add your first project
                </Link> : null
              }
            </div>
            // <div className="section-not-resources">
            //   <p>😕 No project added yet</p>
            // </div>
          }
        </div>
      </div>
    </section >
  ) : (<Loading />)
}

export default Profile
