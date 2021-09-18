import React from 'react'
import Header from '../components/Header'
import '../assets/styles/MainLayouts.css'

const MainLayouts = ({children}) => {
  return (
    <section className="container-main-layouts">
      <Header />
      {children}
    </section>
  )
}

export default MainLayouts
