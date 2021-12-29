/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Trix from 'trix'
import { ReactTrixRTEInput } from 'react-trix-rte'
import { createNewProject } from '../services/project'
import { getToken } from '../utils/helpers'
import MessageError from './MessageError'
import { TagsInput } from './TagsInput'
import '../assets/styles/form.css'

const FormAddProject = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [technology, setTechnology] = useState()
  const [tags, setTags] = useState([])
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

  const handleSendData = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('technologies', tags)

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
            onChange={({ target }) => setName(target.value)} required>
          </input>

          <label htmlFor="description">Description of the project</label>
          <ReactTrixRTEInput
            name="description"
            onChange={({ target }) => setDescription(target.value)}
          />

          <label htmlFor="">Write the technologies used to build your project</label>
          <TagsInput
            selectedTags={(tags) => setTags(tags)}
            tags={tags}
          />

          <label htmlFor="image">Upload an image of the project</label>

          {error ? <MessageError error={errorMessage} /> : null}
          <input
            type="file"
            name="image"
            className="custom-file-input"
            id="input-file-add"
            onChange={({ target }) => handleImage(target.files[0])}
          ></input>

          <label htmlFor="input-file-add" className="custom-file-label">Choose file</label>
          <input type="submit" value="Add project" className="btn-standard btn-form"></input>
        </form>
      </div>
    </section>
  )
}

export default FormAddProject
