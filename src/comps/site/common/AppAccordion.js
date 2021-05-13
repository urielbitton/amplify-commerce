import React, { useState } from 'react'
import './styles/AppAccordion.css'

export default function AppAccordion(props) {

  const {title, children, className} = props
  const [open, setOpen] = useState(false)

  return (
    <div className={`appaccordion ${className} ${open?"open":"closed"}`}>
      <div className="header" onClick={() => setOpen(prev => !prev)}>
        <h5>{title}</h5>
        <i className={`far fa-angle-down ${open?"up":""}`}></i>
      </div>
      <div className="content"> 
        {children}
      </div>
    </div>
  )
}