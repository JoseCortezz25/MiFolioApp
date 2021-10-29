import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import parse from 'html-react-parser'
import { getToken, validateUser, getCurrentUser } from '../utils/helpers'
import { Loading } from './Loading'
import { Link } from 'react-router-dom'
import SectionProfileUser from './SectionProfileUser'
import '../assets/styles/SingleProject.css'
import Swal from 'sweetalert2'

const SingleProject = () => {
  const [project, setProject] = useState([])
  const { url } = useParams()
  const isAuthenticated = getToken()

  useEffect(() => {
    fetch(`https://mi-folio-app.herokuapp.com/api/project/${url}`, { method: "GET" })
      .then(project => project.json())
      .then(data => {
        setProject(data.body)
      })
      .catch(error => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteProject = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your project has been deleted.',
          'success'
        )
      }
    })
  }

  return project ? (
    <section className="container-single-project">

      <div className="section-single-project">
        <img src={project.image_project?.imageURL} alt="" />
      </div>

      <div className="section-single-project">
        <h1 className="single-project__title">{project?.name}</h1>
        <SectionProfileUser user={project?.user} />
        <div className="single-project_technologies">
          {project.technologies?.map((tech, i) => {
            return <p className="item-tech" key={i}>{tech}</p>
          })}
        </div>
        <div className="single-project__description">{parse(`${project?.description}`)}</div>
        {isAuthenticated && validateUser(project.user?._id, getCurrentUser())
          ?
          <>
            <Link to={`${process.env.PUBLIC_URL}/update-project/${url}`} className="btn-standard btn-edit">Edit project</Link>
            <Link to="#" onClick={() => deleteProject()} className="btn-standard btn-delete">Delete project</Link>
          </>
          : null
        }
      </div>

    </section>
  ) : <Loading />
}

export default SingleProject
