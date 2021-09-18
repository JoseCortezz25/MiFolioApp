/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Trix from 'trix'
import { ReactTrixRTEInput } from 'react-trix-rte';
import '../assets/styles/form.css'

const arrayOfSkills = [
  { id: 1, tech: 'Html5' },
  { id: 2, tech: 'Css3' },
  { id: 3, tech: 'Python' },
  { id: 4, tech: 'Java' },
  { id: 5, tech: 'Javascript' },
  { id: 6, tech: 'Jquery' },
  { id: 7, tech: 'Laravel' },
  { id: 8, tech: 'R' },
  { id: 9, tech: 'Apollo' },
  { id: 10, tech: 'Graphql' },
  { id: 11, tech: 'Typescript' },
  { id: 12, tech: 'Mongoose' },
  { id: 13, tech: 'Sequelize' },
  { id: 14, tech: 'SQL' },
  { id: 15, tech: 'MVC' },
  { id: 16, tech: 'WordPress' },
  { id: 17, tech: 'Angular' },
  { id: 18, tech: 'Node' },
  { id: 19, tech: 'Express' },
  { id: 20, tech: 'Php' }
];

const FormAddProject = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState(
    // new Array()
  )

  const handleImage = e => {
    setImage(e.target.files[0])
    // console.log(technologies);
  }

  const handleName = e => {
    console.log(e.target.value);
    setName(e.target.value)
  }

  const handleDescription = e => {
    console.log(skill);
    
    // console.log(skills);
    // setDescription(...skill, e.target.value)
  }

  const handleSendData = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    console.log(formData);
    await fetch('http://localhost:5000/api/add-project', {
      method: 'POST',
      body: formData
    })
  }

  const technologies = new Set()
  // const technologiesContainer = document.querySelector('.knowledge-list-addproject')
  // useEffect(() => {
  //   document.addEventListener('DOMContentLoaded', () => {
  //     if (technologiesContainer) {
  //       technologiesContainer.addEventListener('click', addTechnologies)
  //       console.log('technologies cargados')
  //     }
  //   })

  const addTechnologies = e => {
    console.log(e.target.innerText);
    // if (e.target.tagName === 'LI') {
    //   if (e.target.classList.contains('active')) {
    //     technologies.delete(e.target.textContent)
    //     e.target.classList.remove('active')
    //   } else {
    //     technologies.add(e.target.textContent)
    //     e.target.classList.add('active')
    //   }
    // }
    // console.log(technologies);
    // const technologiesArray = [...technologies]
    // document.querySelector("#technologies").value = technologiesArray
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setSkill(
      ...skill,
      e.target.value
    )
    console.log("skill");
    console.log(skill);
  }

  return (
    <section className="container-form">
      <div className="container-add-project__content">
        <h2 className="title-principal-form">Add new project in your portfolio</h2>

        <form
          className="container-add-project__form"
          action="/project/add"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSendData}>

          <label htmlFor="name">Name of the project</label>
          <input
            type="text"
            name="name"
            placeholder="Enter the name of your project"
            className="input-control"
            onChange={handleName} required></input>

          <label htmlFor="description">Description of the project</label>
          <ReactTrixRTEInput name="description" onChange={handleDescription} />

          <label htmlFor="">Technologies used in the project</label>
          <div className="knowledge-list-addproject" value={skill}>
            {arrayOfSkills.map(skill => {
              return (
                // <input type="text" key={skill} onChange={handleChange}>{skill}</input>
                <li key={skill.id}>
                  <label htmlFor={`custom-checkbox-${skill.id}`}>{skill.tech}</label>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${skill.id}`}
                    name={skill.tech}
                    value={skill.tech}
                    onChange={handleChange}
                  />
                </li>
              )
            })}
          </div>
          <br />

          <label htmlFor="">Upload an image of the project</label>
          <input
            type="file"
            name="image"
            className="custom-file-input"
            id="inputGroupFile01"
            onChange={handleImage}
          ></input>

          <label htmlFor="inputGroupFile01" className="custom-file-label">Choose file</label>

          <input type="hidden" name="technologies" id="technologies"></input>
          <input type="submit" value="Add project" className="btn-standard btn-form"></input>
        </form>
      </div>
    </section>
  )
}

export default FormAddProject
