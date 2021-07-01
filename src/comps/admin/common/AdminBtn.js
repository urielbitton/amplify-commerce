import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminBtn(props) {

  const {title, icon, url, className, solid, nourl, onClick, disabled} = props

  return (
    <Link to={url}>
      <div className={`adminbtn ${className} ${disabled?"disabled":""} ${solid?"solid":""}`} onClick={nourl?() => onClick():() => null}> 
        <i className={icon}></i>
        <span>{title}</span>
      </div>
    </Link>
  )
}