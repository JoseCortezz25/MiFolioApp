/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Trix from 'trix'
import { ReactTrixRTEInput } from 'react-trix-rte'
import { arrayOfSkills } from '../utils/helpers'
import { createNewProject } from '../services/project'
import { getToken } from '../utils/helpers'
import MessageError from './MessageError'
import '../assets/styles/form.css'


const technologies = new Set()

const FormAddProject = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [technology, setTechnology] = useState()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  let history = useHistory()

  const handleImage = (e) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]
    if (allowedMimes.includes(e.type)) {
      setImage(e)
      setError(false)
    } else {
      window.document.getElementById('input-file-add').value = ''
      setImage('')
      setError(true)
      setErrorMessage('Invalid file type!. Only allowed jpeg, jpg and png')
    }
  }

  const handleName = e => {
    setName(e.target.value)
  }

  const handleDescription = e => {
    setDescription(e.target.value)
  }

  const handleTechnology = (e) => {
    if (technologies.has(e.target.value)) {
      technologies.delete(e.target.value)
    } else {
      technologies.add(e.target.value)
    }
    setTechnology(Array.from(technologies))
  }

  const handleSendData = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('technologies', technology)

    if (!image) {
      setError(true)
      setErrorMessage('You have not selected an image')
    } else {
      setError(false)
      createNewProject(formData, getToken())
        .then((res) => {
          const { data: { body } } = res
          history.push(`${process.env.PUBLIC_URL}/project/${body.url}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <section className="container-form">
      <div className="container-add-project__content">
        <h2 className="title-principal-form">Add new project in your portfolio</h2>

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
            placeholder="Enter the name of your project"
            className="input-control"
            onChange={handleName} required></input>

          <label htmlFor="description">Description of the project</label>
          <ReactTrixRTEInput name="description" onChange={handleDescription} />

          <label htmlFor="">Technologies used in the project</label>
          <div className="knowledge-list-addproject" value={technology}>
            {arrayOfSkills.map((technology, idx) => {
              return (
                  <li key={idx} className="tag-skill" htmlFor={`custom-checkbox-${technology.id}`}>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${technology.id}`}
                      className="custom-checkbox"
                      name={`checkbox-${technology.id}`}
                      value={technology.tech}
                      onChange={handleTechnology}
                    />
                    <label htmlFor={`custom-checkbox-${technology.id}`}>{technology.tech}</label>
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
            id="input-file-add"
            onChange={({ target }) => handleImage(target.files[0])}
          ></input>

          <label htmlFor="input-file-add" className="custom-file-label">Choose file</label>
          <input type="hidden" name="technologies" id="technologies"></input>
          <input type="submit" value="Add project" className="btn-standard btn-form"></input>
        </form>
      </div>
    </section>
  )
}

export default FormAddProject
