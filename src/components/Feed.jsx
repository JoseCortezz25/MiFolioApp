import React, { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import CoverImage from './CoverImage'
import { getUser } from '../services/user'
import CardProject from './CardProject'
import { getCurrentUser } from '../utils/helpers' 
import { useUser } from '../context/UserContext'
import { Loading } from './Loading'
import '../assets/styles/Feed.css'

const Feed = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [projects, setProjects] = useState([])
  const { user } = useUser()

  useEffect(() => {
    getUser(getCurrentUser()).then(dataUser => {
      setCurrentUser(dataUser)
    })

    fetch('http://localhost:5000/api/projects')
      .then(projects => projects.json())
      .then(data => {
        setProjects(data.data)
      })
      .catch(error => console.log(error))
  }, [user])

  return projects ? (
    <section className="container-feed">
      { currentUser ? <CoverImage nameUser={currentUser}/> : <Loading /> }
      
      <div className="feed-projects">
        <ResponsiveMasonry>
          <Masonry gutter="3rem">
            {projects.map(project => {
              return (
                <CardProject key={project._id} project={project} />
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>

    </section> 
  ) : (
    <div>No exite productos :/</div>
  )
}

export default Feed
