import React, { useEffect, useState } from 'react'
import './styles/AppAccordion.css'

export default function AppAccordion(props) {

  const {title, subtitle, children, className, openDefault=false, maxHeight=500} = props
  const [open, setOpen] = useState(openDefault)

  useEffect(() => {
    setOpen(openDefault)
  },[openDefault])

  return (
    <div className={`appaccordion ${className} ${open?"open":"closed"}`}>
      <div className="header" onClick={() => setOpen(prev => !prev)}>
        <h5>{title}</h5>
        <div className="right">
          <small>{subtitle}</small>
          <i className={`far fa-angle-down ${open?"up":""}`}></i>
        </div>
      </div>
      <div className="content" style={{maxHeight: open?maxHeight:'0'}}> 
        {children}
      </div>
    </div>
  )
}