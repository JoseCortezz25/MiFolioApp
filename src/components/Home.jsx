import React from 'react'
import { Link } from 'react-router-dom'
import logoIcon from '../assets/static/icons/logo.svg'
import '../assets/styles/Home.css'
import '../assets/styles/buttons.css'

const Home = () => {
  return (
    <section className="initial-page">
      <div className="box-initial-page">
        <div className="box-initial-page__logo">
          <img src={logoIcon} alt="Logo" />
        </div>
        <div className="box-initial-page__content">
          <h1 className="principal-message">
            Share your projects with everyone. Show your talent.
          </h1>
          <div className="box-buttons">
            <Link to={"/login"} className="btn-standard btn-login">Log In</Link>
            <Link to={"/register"} className="btn-standard btn-register">Create new account</Link>
          </div>
        </div>
      </div>

      <div className="box-initial-page">
        <img src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_960_720.jpg" alt="photo cover" />
      </div>
    </section>
  )
}

export default Home
