/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Trix from 'trix'
import { useParams } from 'react-router'
import { ReactTrixRTEInput } from 'react-trix-rte'
import { arrayOfSkills } from '../utils/helpers'
import MessageError from './MessageError'
import { updateProject } from '../services/project'
import '../assets/styles/form.css'

const technologies = new Set()

const FormUpdateProject = () => {
  const [project, setProject] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [technology, setTechnology] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  let history = useHistory()
  const { url } = useParams()

  useEffect(() => {
    fetch(`https://mi-folio-app.herokuapp.com/api/project/${url}`, { method: "GET" })
      .then(project => project.json())
      .then(data => {
        setProject(data.body)
      })
      .catch(error => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTechnology = (e) => {
    if (technologies.has(e.target.value)) {
      technologies.delete(e.target.value)
    } else {
      technologies.add(e.target.value)
    }
    setTechnology(Array.from(technologies))
  }

  const handleDescription = (e) => {
  console.log(e);
  }

  const handleImage = (e) => {
    console.log('e')
    console.log(e)
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]
    if (allowedMimes.includes(e.type)) {
      setImage(e)
      setError(false)
    } else {
      window.document.getElementById('input-file').value = ''
      setImage('')
      setError(true)
      setErrorMessage('Invalid file type!. Only allowed jpeg, jpg and png')
    }
  }

  const handleSubmitProjectUpdated = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('technologies', technology)
    formData.append('url', url)

    updateProject(url, formData)
      .then((res) => {
        const { data: { body } } = res
        history.push(`${process.env.PUBLIC_URL}/project/${body.url}`)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    
    <section className="container-form">
      <div className="container-add-project__content">
        <h2 className="title-principal-form">Update project</h2>
        <form
          className="container-add-project__form"
          action="/project/add"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmitProjectUpdated}>

          <label htmlFor="name">Name of the project</label>
          <input
            type="text"
            name="name"
            className="input-control"
            defaultValue={project.name}
            onChange={({ target }) => setName(target.value)}
            required></input>

          <label htmlFor="description">Description of the project</label>
          <ReactTrixRTEInput
            name="description"
            // defaultValue="<div>React Trix Rich Text Editor</div>"
            // defaultValue={project.description}
            onChange={({ target }) => setDescription(target.value)}
            />

          <label htmlFor="">Technologies used in the project</label>
          <div className="knowledge-list-addproject" value={technology}>
            {arrayOfSkills.map(technology => {
              return (
                <li key={technology.id} className="tag-skill" htmlFor={`custom-checkbox-${technology.id}`}>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${technology.id}`}
                    className="custom-checkbox"
                    name={`checkbox-${technology.id}`}
                    value={technology.tech}
                    onChange={handleTechnology}
                  />
                  <label key={technology.id + 1} htmlFor={`custom-checkbox-${technology.id}`}>{technology.tech}</label>
                </li>
              )
            })}
          </div>
          <br />
          <label htmlFor="image">Upload an image of the project</label>
          <br />

          {error ? <MessageError error={errorMessage} /> : null}
          <input
            type="file"
            name="image"
            className="custom-file-input"
            id="input-file"
            onChange={({ target }) => handleImage(target.files[0])}>
            </input>
          <label htmlFor="input-file" className="custom-file-label">Choose file</label>

          <input type="hidden" name="technologies" id="technologies"></input>
          <input type="submit" value="Update project" className="btn-standard btn-form"></input>
        </form>
      </div>
    </section>
  )
}

export default FormUpdateProject
