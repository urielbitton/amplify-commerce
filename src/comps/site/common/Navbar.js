import React from 'react'
import './styles/Navbar.css'
import Logo from '../../common/Logo'

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="left">
          <Logo />
        </div>
        <div className="right">
          
        </div>
      </nav>
      <div style={{height:'80px'}}></div>
    </>
  )
}

