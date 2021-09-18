import React from 'react'
import '../assets/styles/Login.css'

const Login = () => {
  return (
    <section className="container-login">
      <div className="section-login">
        <div className="section-login__info">
          <h2 className="title-principal-form">Log in</h2>
          <form action="">
            <label for="username">Username</label>
            <input
              type="text"
              className="input-control"
              id="username"
              placeholder="Enter your username"></input>

            <label for="password">Password</label>
            <input
              type="password"
              className="input-control"
              id="password"
              placeholder="Enter your password"></input>

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
