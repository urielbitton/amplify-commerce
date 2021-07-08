import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminBtn(props) {

  const {title, icon, url, className, solid, clickEvent, onClick, disabled} = props

  return (
    <Link to={!disabled&&url} onClick={clickEvent?(e) => !disabled&&onClick(e):() => null}>
      <div className={`adminbtn ${className} ${disabled?"disabled":""} ${solid?"solid":""}`}> 
        <i className={icon}></i>
        <span>{title}</span>
      </div>
    </Link>
  )
}