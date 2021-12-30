import React, { useState, useEffect, useContext } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import CoverImage from './CoverImage'
import CardProject from './CardProject'
import { Loading } from './Loading'
import { getAllProjects } from '../services/project'
import iconNotFound from '../assets/static/images/not_found.svg'
import UserContext from '../context/UserContext'
import '../assets/styles/Feed.css'

const Feed = () => {
  const [projects, setProjects] = useState([])
  const [searchText, setSearchText] = useState('')
  // const [searchTextFollowing, setSearchTextFollowing] = useState('')
  const [followingProjects, setFollowingProjects] = useState([])
  const [statusMenu, setStatusMenu] = useState({
    isAllProjects: true,
    isFollowingProjects: false,
  })
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getProjectsFollowing = async () => {
      try {
        const followingIds = user?.following
        let followingAllProjects = []
        projects.forEach((project, i) => {
          if (followingIds?.includes(project.user._id)) {
            followingAllProjects = [...followingAllProjects, project]
          }
        })
        console.log('followingAllProjects', followingAllProjects);
        setFollowingProjects(followingAllProjects)
      } catch (error) {
        console.log('ERROR INFO', error)
      }
    }
    getProjectsFollowing()
  }, [user])

  useEffect(() => {
    getAllProjects()
      .then(data => {
        setProjects(data.data.data)
      })
  }, [])

  const projectsSearch = projects.filter(project => {
    return project.name.toLowerCase().includes(searchText.toLowerCase())
  })

  const followingProjectsSearch = followingProjects.filter(project => {
    return project.name.toLowerCase().includes(searchText.toLowerCase())
  })


  if (statusMenu.isAllProjects) {
    return (
      <section className="container-feed">
        {user
          ? <CoverImage
            nameUser={user}
            setSearchText={(text) => setSearchText(text)}
          />
          : <Loading />
        }
        <div className="MenuTop">
          <button
            className={statusMenu.isAllProjects ? 'MenuTop-item active-menu' : 'MenuTop-item'}
            onClick={() => setStatusMenu({
              isFollowingProjects: false,
              isAllProjects: true,
            })}
          >All projects</button>
          <button
            className={statusMenu.isFollowingProjects ? 'MenuTop-item active-menu' : 'MenuTop-item'}
            onClick={() => setStatusMenu({
              isAllProjects: false,
              isFollowingProjects: true,
            })}
          >Following</button>
        </div>

        <div className="feed-projects">
          <ResponsiveMasonry>
            <Masonry gutter="3rem">
              {projectsSearch.map(project => {
                return (
                  <CardProject key={project._id} project={project} />
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>

      </section>
    )
  } else if (statusMenu.isFollowingProjects) {
    return (
      <section className="container-feed">
        {user
          ? <CoverImage
            nameUser={user}
            setSearchText={(text) => setSearchText(text)}
          />
          : <Loading />
        }
        <div className="MenuTop">
          <button
            className={statusMenu.isAllProjects ? 'MenuTop-item active-menu' : 'MenuTop-item'}
            onClick={() => setStatusMenu({
              isFollowingProjects: false,
              isAllProjects: true,
            })}
          >All projects</button>
          <button
            className={statusMenu.isFollowingProjects ? 'MenuTop-item active-menu' : 'MenuTop-item'}
            onClick={() => setStatusMenu({
              isAllProjects: false,
              isFollowingProjects: true,
            })}
          >Following</button>
        </div>
        {followingProjects.length !== 0 ? (
          <div className="feed-projects">
            <ResponsiveMasonry>
              <Masonry gutter="3rem">
                {followingProjectsSearch.map(project => {
                  return (
                    <CardProject key={project._id} project={project} />
                  )
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        ) : (
          <div className="feed-projects-empty">
            <div className="feed-projects-image">
              <img src={iconNotFound} alt="Not found projects" />
            </div>
            <h2>You don't follow any person yet,
              follow people and watch their work</h2>
          </div>
        )}
      </section>
    )
  }
}

export default Feed
