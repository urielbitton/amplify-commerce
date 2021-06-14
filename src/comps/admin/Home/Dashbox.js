import React from 'react'
import './styles/Dashbox.css'

export default function Dashbox(props) {

  const {number, title, icon, compareNum} = props.el
  const {compareTitle} = props 

  return (
    <div className="dashbox">
      <div>
        <div className="iconcont">
          <i className={icon}></i>
        </div>
        <h6 className={compareNum>number?"down":"up"}>
          <i className={`far fa-arrow-${compareNum>number?"down":"up"}`}></i>&nbsp;{compareNum}
        </h6>
        <small>{compareTitle}</small>
      </div> 
      <div>
        <h1>{number}</h1>
        <h5>{title}</h5>
      </div>
    </div>
  )
}

