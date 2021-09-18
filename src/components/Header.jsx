import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/header.css'
import logoIcon from '../assets/static/icons/logo.svg'

const Header = () => {
  return (
    <header className="container-header">
      <div className="container-header__content">
        <nav>
          <div className="logo">
            <img src={logoIcon} alt="" />
          </div>
        </nav>
        <nav>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
