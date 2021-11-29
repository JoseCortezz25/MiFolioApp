import React from 'react'
import '../assets/styles/CoverImage.css'
import ProjectsSearch from './ProjectsSearch'

const CoverImage = ({ nameUser, setSearchText }) => {
  return (
    <section className="container-cover-image">
      <p className="subtitle-cover">Hi there, { nameUser?.fullname }</p>
      <p className="text-cover">Explore other people's projects!</p>
      <ProjectsSearch setSearchText={setSearchText}/>
    </section>
  )
}

export default CoverImage
