import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminBtn(props) {

  const {title, icon, url, className} = props

  return (
    <Link to={url}>
      <div className={`adminbtn ${className}`}>
        <i className={icon}></i>
        <span>{title}</span>
      </div>
    </Link>
  )
}