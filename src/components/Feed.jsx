import React, { useState, useEffect, useContext } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import CoverImage from './CoverImage'
import CardProject from './CardProject'
import { Loading } from './Loading'
import { getAllProjects, getProjectById } from '../services/project'
import UserContext from '../context/UserContext'
import '../assets/styles/Feed.css'

const Feed = () => {
  const [projects, setProjects] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchTextFollowing, setSearchTextFollowing] = useState('')
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
        // const idsFollowing = ['6192bdc25f4178acc0a47dfb', '619321435df9f806c4524705']
        let followingAllProjects = []

        projects.forEach((project, i) => {
          if (followingIds?.includes(project.user._id)) {
            followingAllProjects = [...followingAllProjects, project]
          }
        })

        console.log('followingAllProjects', followingAllProjects)
        setFollowingProjects(followingAllProjects)
        // return followingProjects
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
    return project.name.toLowerCase().includes(searchTextFollowing.toLowerCase())
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
            setSearchText={(text) => setSearchTextFollowing(text)}
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
              {followingProjectsSearch.map(project => {
                return (
                  <CardProject key={project._id} project={project} />
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>

      </section>
    )
  }

  // return projects ? (
  //   <section className="container-feed">
  //     {user
  //       ? <CoverImage
  //         nameUser={user}
  //         setSearchText={(text) => setSearchText(text)}
  //       />
  //       : <Loading />
  //     }
  //     <div className="MenuTop">
  //       <div className="MenuTop-item active-menu">All projects</div>
  //       <div className="MenuTop-item">Following</div>
  //     </div>

  //     <div className="feed-projects">
  //       <ResponsiveMasonry>
  //         <Masonry gutter="3rem">
  //           {projectsSearch.map(project => {
  //             return (
  //               <CardProject key={project._id} project={project} />
  //             )
  //           })}
  //         </Masonry>
  //       </ResponsiveMasonry>
  //     </div>

  //   </section>
  // ) : (
  //   <div>No existe productos :/</div>
  // )
}

export default Feed
