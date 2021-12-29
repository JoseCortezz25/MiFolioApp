import React, { useState, useContext, useParams } from 'react'
import { updateUserById } from '../services/user'
import { getCurrentUser } from '../utils/helpers'
import { useHistory } from 'react-router-dom'
import { isVerifyUsername } from '../services/user'
import UserContext from '../context/UserContext'
import MessageError from './MessageError'

const FormUpdateUser = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [profession, setProfession] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const { user } = useContext(UserContext)
  let history = useHistory()

  const handleSendDataForUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data: message } = await isVerifyUsername(newUsername)
      if (message.message === 'Username already exist') {
        console.log('error');
        setError(true)
        setErrorMessage('Username already exist')
        return
      } else {
        setError(false)
      }
    } catch (error) {
      console.log(error);
    }

    const formData = new FormData();
    formData.set('fullname', fullname);
    formData.set('email', email);
    formData.set('description', description);
    formData.set('profession', profession);
    formData.set('image', image);
    formData.set('username', newUsername);

    updateUserById(getCurrentUser(), formData)
      .then(res => {
        history.push(`${process.env.PUBLIC_URL}/user/${res.username}`)
      })
  }

  return (
    <div className="container-form">
      <div className="container-add-project__content">
        <h2 className="title-principal-form">Update your information</h2>

        <form
          className="container-add-project__form"
          action="/user-update"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSendDataForUpdate}>

          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            className="input-control"
            defaultValue={user?.fullname}
            onChange={({ target }) => setFullname(target.value)}
            placeholder="Enter you new fullname" />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="input-control"
            defaultValue={user?.email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Enter your email" />

          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            className={error ? "input-control text-strike" : "input-control"}
            onChange={({ target }) => setNewUsername(target.value)}
            placeholder="Enter your new username" />
          {error ? <MessageError error={errorMessage} /> : null}

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            className="input-control"
            defaultValue={user?.description}
            onChange={({ target }) => setDescription(target.value)}
            placeholder="Enter your new description" />

          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            name="profession"
            className="input-control"
            defaultValue={user?.profession}
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
