/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Trix from 'trix'
import { useParams } from 'react-router'
import { ReactTrixRTEInput } from 'react-trix-rte'
import { arrayOfSkills } from '../utils/helpers'
import MessageError from './MessageError'
import { updateProject, getProjectByUrl } from '../services/project'
import { TagsInput } from './TagsInput'
import '../assets/styles/form.css'

const FormUpdateProject = () => {
  const [project, setProject] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [tags, setTags] = useState()
  let history = useHistory()
  const { url } = useParams()

  useEffect(() => {
    const getDataProjectByUrl = async () => {
      try {
        const result = await getProjectByUrl(url)
        const { data: { body } } = result
        setProject(body)
        setName(body.name)
        setTags(body.technologies)
        setDescription(body.description)
      } catch (error) {
        console.log(error);
      }
    }
    getDataProjectByUrl()

    window.addEventListener('keydown', function (e) {
      if (e.keyIdentifier === 'U+000A' || e.keyIdentifier === 'Enter' || e.key === 'Enter') {
        if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
          e.preventDefault();
          return false;
        }
      }
    }, true);
  }, [url])

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
    formData.append('technologies', tags)
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
            defaultValue={description}
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
            id="input-file"
            onChange={({ target }) => handleImage(target.files[0])}>
          </input>

          <label htmlFor="input-file" className="custom-file-label">Choose file</label>
          <button className="btn-standard btn-form">Update project</button>
        </form>
      </div>
    </section>
  )
}

export default FormUpdateProject
