import React, { useState, useEffect } from 'react'
// import { useUser } from '../context/UserContext'
import { getUser, updateUserById } from '../services/user'
import { getCurrentUser } from '../utils/helpers'
// import { Loading } from './Loading'
import { useHistory } from 'react-router-dom'

const FormUpdateUser = () => {
  // const { user } = useUser()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [profession, setProfession] = useState('')
  const [image, setImage] = useState('')
  let history = useHistory()

  const handleSendDataForUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('fullname', fullname);
    formData.set('email', email);
    formData.set('description', description);
    formData.set('profession', profession);
    formData.set('image', image);

    updateUserById(getCurrentUser(), formData)
      .then(res => {
        history.push(`${process.env.PUBLIC_URL}/user/${res.username}`)
      })
  }

  return  (
    <div className="container-form">
      <div className="container-add-project__content">
        <h2 className="title-principal-form">Update your information</h2>

        <form
          className="container-add-project__form"
          action="/user-update"
          method="POST"
          encType="multipart/form-data"
          onSubmit={ handleSendDataForUpdate }>

          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            className="input-control"
            onChange={({ target }) => setFullname(target.value)}
            placeholder="Enter you fullname" />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="input-control"
            // defaultValue={user.email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Enter your username" />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            className="input-control"
            // defaultValue={user.description}
            onChange={({ target }) => setDescription(target.value)}
            placeholder="Enter your description" />

          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            name="profession"
            className="input-control"
            // defaultValue={user.profession}
            onChange={({ target }) => setProfession(target.value)}
            placeholder="Enter your profession" />

          <label htmlFor="">Upload a profile picture</label>
          <input
            type="file"
            name="image"
            className="custom-file-input"
            id="inputGroupFile01"
            onChange={({ target }) => setImage(target.files[0])}
            />

            <input type="submit" value="Update my profile information" className="btn-standard btn-form"></input>
        </form>
      </div>
    </div>
  ) 
}

export default FormUpdateUser
