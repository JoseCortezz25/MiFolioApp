import React from 'react'

const ProjectsSearch = ({setSearchText}) => {
  return (
    <input 
      type="text" 
      className="project-search"
      placeholder="Search projects"
      onChange={(e) => setSearchText(e.target.value)}/>
  )
}

export default ProjectsSearch
