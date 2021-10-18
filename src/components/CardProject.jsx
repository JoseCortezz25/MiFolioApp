import React from 'react'
// import parse from 'html-react-parser'
import '../assets/styles/CardProject.css'
import { Link } from 'react-router-dom';

const CardProject = ({
  project: {
    name,
    description,
    technologies,
    created_at,
    url,
    image_project
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
          {/* <p>{parse(description)}</p> */}
        </div>
      </article>
    </Link>
  )
}

export default CardProject
