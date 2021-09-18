import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Register.css'

const arrayOfSkills = ['Html5', 'Css3', 'Python', 'Java', 'Javascript',
'Jquery', 'Laravel', 'R', 'Apollo', 'Graphql', 'Typescript',
'Mongoose', 'Sequelize', 'SQL', 'MVC', 'WordPress', 'Angular',
'Node', 'Express', 'Php'
];

document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelector('.knowledge-list')

  if (skills) {
    skills.addEventListener('click', addSkills)
    console.log('skills cargados')
  }
})

const skills = new Set()
const addSkills = e => {
  if (e.target.tagName === 'LI') {
    if (e.target.classList.contains('active')) {
      skills.delete(e.target.textContent);
      e.target.classList.remove('active');
    } else {
      skills.add(e.target.textContent);
      e.target.classList.add('active');
    }
  }
  // console.log(skills);
  const skillsArray = [...skills];
  document.querySelector("#skills").value = skillsArray;
}

const Register = () => {
  return (
    <section className="container-register">
      <div className="section-register">
        <div className="section-register__info">
          <h2 className="title-principal-form">Register</h2>

          <form action="">
            <label for="fullname">Fullname</label>
            <input type="text" className="input-control" id="fullname" placeholder="Enter your fullname"></input>

            <label for="username">Username</label>
            <input type="text" className="input-control" id="username" placeholder="Enter your username" ></input>

            <label for="password">Password</label>
            <input type="password" className="input-control" id="password" placeholder="Enter your password"></input>

            <label for="password">Confirm password</label>
            <input type="password" className="input-control" id="password-confirmed" placeholder="Enter your password again"></input>

            <label for="description">Description</label>
            <input type="text" className="input-control" id="description" placeholder="Enter your description"></input>

            <label for="profession">Profession</label>
            <input type="text" className="input-control" id="profession" placeholder="Enter your profession"></input>

            <label for="profession">Skills</label>
            <div className="knowledge-list">
              {arrayOfSkills.map(skill => {
                return (
                  <li>{skill}</li>
                )
              })}
            </div>
            <div className="campo centrar-horizontal">
              <input type="hidden" name="skills" id="skills"></input>
            </div>

            <Link to="/login">Do you already have an account? Login now</Link>
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
