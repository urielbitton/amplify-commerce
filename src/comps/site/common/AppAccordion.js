import React, { useEffect, useState } from 'react'
import './styles/AppAccordion.css'

export default function AppAccordion(props) {

  const {title, children, className, openDefault=false, maxHeight=500} = props
  const [open, setOpen] = useState(openDefault)

  useEffect(() => {
    setOpen(openDefault)
  },[openDefault])

  return (
    <div className={`appaccordion ${className} ${open?"open":"closed"}`}>
      <div className="header" onClick={() => setOpen(prev => !prev)}>
        <h5>{title}</h5>
        <i className={`far fa-angle-down ${open?"up":""}`}></i>
      </div>
      <div className="content" style={{maxHeight: open?maxHeight:'0'}}> 
        {children}
      </div>
    </div>
  )
}