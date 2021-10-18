import React, { useState } from 'react'
import '../assets/styles/Login.css'
import { login } from '../services/user'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login({ 'email': email, 'password': password })
      setEmail('')
      setPassword('')
      history.push('/feed')
    } catch (error) {
      console.log("error :(")
    }
  }

  return (
    <section className="container-login">
      <div className="section-login">
        <div className="section-login__info">
          <h2 className="title-principal-form">Log in</h2>
          <form onSubmit={handleLogin} >
            <label htmlFor="username">Email</label>
            <input
              type="text"
              className="input-control"
              id="email"
              name="email"
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter your email"></input>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input-control"
              id="password"
              name="password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter your password"></input>

            <a href="/register" className="link-redirect">Don't you have an account? Create it now</a>
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
