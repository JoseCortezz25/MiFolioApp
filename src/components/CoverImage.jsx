import React from 'react'
import '../assets/styles/CoverImage.css'

const CoverImage = ({ nameUser }) => {
  return (
    <section className="container-cover-image">
      <p className="subtitle-cover">Hi there, { nameUser?.fullname }</p>
      <p className="text-cover">Explore other people's projects!</p>
    </section>
  )
}

export default CoverImage
