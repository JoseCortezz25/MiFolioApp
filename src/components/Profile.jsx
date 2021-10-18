import React, { useState, useEffect } from 'react'
import { getUserByUsername } from '../services/user'
import CardProject from './CardProject'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useParams } from 'react-router-dom'
import iconFeed from '../assets/static/icons/icon-feed.svg'
import imageUserDefault from '../assets/static/images/user-stock.png'
import { Loading } from './Loading'
import { getToken, validateUser, getCurrentUser } from '../utils/helpers'
import { Link } from 'react-router-dom'
import '../assets/styles/Profile.css'

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null)
  let { username } = useParams()
  const isAuthenticated = getToken()

  useEffect(() => {
    getUserByUsername(username).then(dataUser => {
      console.log(dataUser);
      setUserProfile(dataUser)
    })
  }, [username])

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
            { isAuthenticated && validateUser(userProfile._id, getCurrentUser()) ? <Link to={`/update-user/${userProfile?.username}`} className="btn-edit-user">Edit user</Link> : null}
          </div>
          <p className="profile-profession">{userProfile?.profession}</p>
          <p className="profile-description">{userProfile?.description}</p>
        </div>
      </div>
      <div className="section-profile-info">

        <div className="feed-projects-profile">
          <div className="box-title-projects">
            <span className="icon-feed"><img src={iconFeed} alt="" /></span><p>Projects</p>
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
            :  <p> No hay proyectos </p>
          }
        </div>
      </div>
    </section >
  ) : (<Loading />)
}

export default Profile
