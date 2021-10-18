import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import parse from 'html-react-parser'
import { getToken, validateUser, getCurrentUser } from '../utils/helpers'
import { Loading } from './Loading'
import '../assets/styles/SingleProject.css'

const SingleProject = () => {
  const [project, setProject] = useState([])
  const { url } = useParams()
  const isAuthenticated = getToken()

  useEffect(() => {
    fetch(`http://localhost:5000/api/project/${url}`, { method: "GET" })
      .then(project => project.json())
      .then(data => {
        setProject(data.body)
      })
      .catch(error => console.log(error))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return project ? (
      <section className="container-single-project">
      <div className="cover-image-project">
        <img src={project.image_project?.imageURL} alt="" />
      </div>
      <div className="single-project__body">
        <h1 className="single-project__title">{project?.name}</h1>
        <div className="single-project_technologies">
          {project.technologies?.map((tech, i) => {
            return <p className="item-tech" key={i}>{tech}</p>
          })}
        </div>
        <div className="single-project__description">{parse(`${project?.description}`)}</div>
        { isAuthenticated && validateUser(project.user?._id, getCurrentUser()) ? <a href={`/update-project/${url}`} className="btn-standard btn-edit">Edit project</a> : null }
      </div>

    </section>
  ) : <Loading />
}

export default SingleProject
