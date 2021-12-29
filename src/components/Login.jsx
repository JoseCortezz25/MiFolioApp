import React, { useState } from 'react'
import { login, isVerifyUser } from '../services/user'
import { setToken, setCurrentUser } from '../utils/helpers'
import MessageError from './MessageError'
import '../assets/styles/Login.css'
import '../assets/styles/BarError.css'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmitLogin = async (e) => {
    e.preventDefault()

    try {
      const {data: {message}} = await isVerifyUser(email)
      if (message === 'User don\'t exist') {
        setError(true)
        setErrorMessage('User don\'t exist')
        return
      } else {
        setError(false)
      }

      login({ email, password })
        .then(res => {
          setToken(res.data.body.token);
          setCurrentUser(res.data.body.id);
          setEmail('')
          setPassword('')
          history.push(`${process.env.PUBLIC_URL}/feed`)
        })
        .catch(err => {
          setError(true)
          setErrorMessage('Password or email incorrect')
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="container-login">
      <div className="section-login">
        <div className="section-login__info">
          <h2 className="title-principal-form">Log in</h2>

          <form onSubmit={handleSubmitLogin} >
            <label htmlFor="username">Email</label>
            <input
              type="text"
              className={error ? "input-control text-strike" : "input-control"}
              id="email"
              name="email"
              required
              onChange={({ target }) => setEmail(target.value.toLowerCase())}
              placeholder="Enter your email"></input>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={error ? "input-control text-strike" : "input-control"}
              id="password"
              name="password"
              required
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter your password"></input>

            {error ? <MessageError error={errorMessage} /> : null}
            <a href={"/register"} className="link-redirect">Don't you have an account? Create it now</a>
            <button type="submit" className="btn-standard btn-form">Log in</button>
          </form>
        </div>
      </div>
      <div className="section-login">
        <div className="title-section-form">
          <h2>Join our community</h2>
        </div>
      </div>
    </section>
  )
}

export default Login
