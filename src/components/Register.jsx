import React from 'react'
import { Link } from 'react-router-dom'
import { arrayOfSkills } from '../utils/helpers'
import '../assets/styles/Register.css'



const Register = () => {

  // const handleTechnology = (e) => {
  //   if (technologies.has(e.target.value)) {
  //     technologies.delete(e.target.value)
  //     // e.target.classList.remove('active')
  //   } else {
  //     technologies.add(e.target.value)
  //     // e.target.classList.add('active')
  //   }
  //   setTechnology(Array.from(technologies))
  // }

  return (
    <section className="container-register">
      <div className="section-register">
        <div className="section-register__info">
          <h2 className="title-principal-form">Register</h2>

          <form action="">
            <label for="fullname">Fullname</label>
            <input
              type="text"
              className="input-control"
              id="fullname"
              placeholder="Enter your fullname"></input>

            <label for="username">Username</label>
            <input
              type="text"
              className="input-control"
              id="username"
              placeholder="Enter your username" ></input>

            <label for="password">Password</label>
            <input
              type="password"
              className="input-control"
              id="password"
              placeholder="Enter your password"></input>

            <label for="password">Confirm password</label>
            <input
              type="password"
              className="input-control"
              id="password-confirmed"
              placeholder="Enter your password again"></input>

            <label for="description">Description</label>
            <input
              type="text"
              className="input-control"
              id="description"
              placeholder="Enter your description"></input>

            <label for="profession">Profession</label>
            <input
              type="text"
              className="input-control"
              id="profession"
              placeholder="Enter your profession"></input>

            <a href="/login" className="link-redirect">Do you already have an account? Login now</a>
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
