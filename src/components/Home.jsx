import React from 'react'
import { Link } from 'react-router-dom'
import logoIcon from '../assets/static/icons/logo.svg'
import '../assets/styles/Home.css'
import '../assets/styles/buttons.css'


const Home = () => {
  return (
    <section className="initial-page">
      <div className="box-initial-page">

        <div className="box-initial-page__info">
          <div className="box-initial-page__logo">
            <img src={logoIcon} alt="Logo" />
          </div>
          <p className="description-initial-page">Share your projects with everyone. Show your talent.</p>
          <Link to={process.env.PUBLIC_URL + "/login"} className="btn-standard btn-login">Log In</Link>
          <Link to={process.env.PUBLIC_URL + "/register"} className="btn-standard btn-register">Create new account</Link>
        </div>
      </div>
      <div className="box-initial-page">
        <img src="https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198_960_720.jpg" />
      </div>
    </section>
  )
}

export default Home
