import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/CardProject.css'

const CardProject = ({
  project: {
    name,
    technologies,
    url,
    image_project,
    user
  } }) => {

  return (
    <Link to={"/project/" + url} className="card-project-link">
      <article className="card-project">
        <div className="card-project__image">
          <img src={image_project?.imageURL} alt={name} />
        </div>
        <div className="card-project__body">
          <div className="card-project__technologies">
            {technologies.map(technology => {
              return <p className="item-tech" key={technology}>{technology}</p>
            })}
          </div>
          <h2>{name}</h2>
          { user?.fullname ? <span>By {user?.fullname}</span> : null}
        </div>
      </article>
    </Link>
  )
}

export default CardProject
