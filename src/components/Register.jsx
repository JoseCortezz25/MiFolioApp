import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import '../assets/styles/Register.css'
import { register, isVerifyUser } from '../services/user.js'
import MessageError from './MessageError'

const Register = ({ history }) => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [description, setDescription] = useState('')
  const [profession, setProfession] = useState('')
  const [error, setError] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    try {
      if (password !== confirmpassword) {
        setError(true)
        setErrorMessage('Passwords don\'t match')
        return
      } else {
        setError(false)
      }

      const {data: {message}} = await isVerifyUser(email)
      if (message === 'User already exist') {
        setErrorEmail(true)
        setErrorMessage('User already exist')
        return
      }

      register({fullname, email, password, description, profession})
        .then((res) => {
          console.log(res);
          setFullname('')
          setEmail('')
          setPassword('')
          setConfirmpassword('')
          setDescription('')
          setProfession('')
          history.push(`${process.env.PUBLIC_URL}/login`)
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      history.push(`${process.env.PUBLIC_URL}/error`)
    }
  }

  return (
    <section className="container-register">
      <div className="section-register">
        <div className="section-register__info">

          <h2 className="title-principal-form">Register</h2>
          <form onSubmit={handleSubmitRegister}>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              className="input-control"
              id="fullname"
              required
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your fullname"></input>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={errorEmail ? "input-control text-strike" : "input-control"}
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" ></input>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              // className="input-control"
              id="password"
              required
              className={error ? "input-control text-strike" : "input-control"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"></input>

            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              className={error ? "input-control text-strike" : "input-control"}
              id="password-confirmed"
              required
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Enter your password again"></input>

            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="input-control"
              id="description"
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description"></input>

            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              className="input-control"
              id="profession"
              required
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Enter your profession"></input>

            {error || errorEmail ? <MessageError error={errorMessage} /> : null}
            <a href={"/login"} className="link-redirect">Do you already have an account? Login now</a>
            <button type="submit" className="btn-standard btn-form">Register</button>
          </form>
        </div>
      </div>
      <div className="section-register">
        <div className="title-section-form">
          <h2>Join our community</h2>
        </div>
      </div>
    </section>
  )
}

export default Register
