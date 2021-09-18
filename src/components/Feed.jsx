import React, { useState, useEffect } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import CoverImage from './CoverImage'
import CardProject from './CardProject'
import '../assets/styles/Feed.css'

const Feed = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(projects => projects.json())
      .then(data => {
        console.log(data.data);
        setProjects(data.data)
      })
      .catch(error => console.log(error))

  }, [])

  return (
    <section className="container-feed">
      <CoverImage />
      <div className="feed-projects">
        <ResponsiveMasonry>
          <Masonry gutter="3rem">
            {projects.map(project => {
              return (
                <CardProject key={project._id} project={project}/>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>

    </section>
  )
}

export default Feed
