import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminBtn(props) {

  const {title, icon, url, className} = props

  return (
    <div className={`adminbtn ${className}`}>
      <i className={icon}></i>
      <Link to={url}>{title}</Link>
    </div>
  )
}