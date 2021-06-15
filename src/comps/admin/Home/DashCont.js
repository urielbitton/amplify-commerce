import React from 'react'
import './styles/DashCont.css'

export default function DashCont(props) {

  const {children, className, title} = props

  return (
    <div className={`dashcont ${className}`}>
      { title&&
        <div className="titlesrow">
          <h4>{title}</h4>
        </div>
      }
      {children}
    </div>
  )
}