/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Trix from 'trix'
import { useParams } from 'react-router'
import { ReactTrixRTEInput } from 'react-trix-rte'
import { arrayOfSkills } from '../utils/helpers'
import '../assets/styles/form.css'

const technologies = new Set()

const FormUpdateProject = () => {
  const [project, setProject] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [technology, setTechnology] = useState('')
  const [image, setImage] = useState('')
  let history = useHistory()
  const { url } = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/api/project/${url}`, { method: "GET" })
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

  const handleSendData = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('technologies', technology)
    formData.append('url', url)
    await fetch(`http://localhost:5000/api/update-project/${url}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        history.push(`/project/${data.body.url}`)
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
          onSubmit={handleSendData}>

          <label htmlFor="name">Name of the project</label>
          <input
            type="text"
            name="name"
            className="input-control"
            defaultValue={project.name}
            // value={project.name}
            // placeholder={project.name || "Enter the name of your project"}
            onChange={({ target }) => setName(target.value)}
            required></input>

          <label htmlFor="description">Description of the project</label>
          <ReactTrixRTEInput
            name="description"
            defaultValue={project.description}
            onChange={({ target }) => setDescription(target.value)} />

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

          <input
            type="file"
            name="image"
            className="custom-file-input"
            id="inputGroupFile01"
            onChange={({ target }) => setImage(target.files[0])}></input>
          <label htmlFor="inputGroupFile01" className="custom-file-label">Choose file</label>

          <input type="hidden" name="technologies" id="technologies"></input>
          <input type="submit" value="Update project" className="btn-standard btn-form"></input>
        </form>
      </div>
    </section>
  )
}

export default FormUpdateProject
