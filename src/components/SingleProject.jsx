import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import parse from 'html-react-parser'
import '../assets/styles/SingleProject.css'

const SingleProject = () => {
  const [project, setProject] = useState([])
  const { url } = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/api/project/${url}`, { method: "GET" })
      .then(project => project.json())
      .then(data => {
        console.log("PROJECT")
        console.log(data.data)
        setProject(data.data)
      })
      .catch(error => console.log(error))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const renderImageProject = () => {
      if(project.image_project?.imageURL) {
        return <img src={project.image_project?.imageURL} alt="" />
      } else {
        return <img src="https://picsum.photos/1200/950" alt="" />
      }
    }
    
    return (
      <section className="container-single-project">
      <div className="cover-image-project">
        <img src={project.image_project?.imageURL} alt="" />
      </div>
      <div className="single-project__body">
        <h1 className="single-project__title">{project.name}</h1>
        <div className="single-project_technologies">
          {project.technologies?.map(tech => {
            return <p className="item-tech" key={tech}>{tech}</p>
          })}
        </div>
        <div className="single-project__description">{parse(`${project.description}`)}</div>
      </div>

    </section>
  )
}

export default SingleProject
