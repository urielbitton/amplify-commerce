import React from 'react'
import { Link } from 'react-router-dom'
import './styles/AppButton.css'

export default function AppButton(props) {

  const {title, icon, url, white=false, shadow=false, className} = props

  return (
    <Link to={url}>
      <div  
        className={`appbutton ${className} ${white&&"white"} ${shadow&&"shadow"}`}>
        <span>{title}</span>
        <i className={icon}></i>
      </div>
    </Link>
  )
}