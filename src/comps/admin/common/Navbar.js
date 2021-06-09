import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Navbar.css'

export default function Navbar() {

  return (
    <div className="adminnav">
      <div className="left">
        <Link to="/"><button>Amplify Site</button></Link>
      </div>
      <div className="right">

      </div>
    </div> 
  )
}