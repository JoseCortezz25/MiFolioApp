import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import logoIcon from '../assets/static/icons/logo.svg'
import { useUser } from '../context/UserContext'
import { getUser } from '../services/user'
import { getToken, getCurrentUser } from '../utils/helpers'
import ProfileImage from './ProfileImage'
import UserContext from '../context/UserContext'
import iconExit from '../assets/static/icons/icons-exit.svg'
import iconAddProject from '../assets/static/icons/add-project-simple.svg'
import iconMessanger from '../assets/static/icons/messager_icon.svg'
import '../assets/styles/header.css';

const Header = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  // const { logout, user } = useUser()
  const isAuthenticated = getToken()
  const { logout, user: currentUser } = useContext(UserContext)

  // useEffect(() => {
  //   getUser(getCurrentUser()).then(dataUser => {
  //     setCurrentUser(dataUser)
  //   })
  // }, [])

  return (
    <header className="container-header">
      <nav className="title-header">
        <div className="logo">
          {isAuthenticated
            ? <Link to={"/feed"}><img src={logoIcon} alt="" /></Link>
            : <Link to={"/"}><img src={logoIcon} alt="" /></Link>
          }
        </div>
      </nav>
      {isAuthenticated
        ?
        <nav className="nav-items">
          <Link to={`${process.env.PUBLIC_URL}/messenger/${currentUser?.username}`} className="nav-item"> <img className="icon-header" src={iconMessanger} alt="" /></Link>
          <Link to={`${process.env.PUBLIC_URL}/add-project`}><img className="icon-header" src={iconAddProject} alt="" /></Link>
          <Link to={"/"} onClick={logout}><img className="icon-header" src={iconExit} alt="" /></Link>
          <Link to={`${process.env.PUBLIC_URL}/user/${currentUser?.username}`}>
            <ProfileImage user={currentUser} />
          </Link>
        </nav>
        :
        <nav className="nav-items">
          <Link to={"/login"}>Log in</Link>
        </nav>
      }
    </header>
  )
}

export default Header
