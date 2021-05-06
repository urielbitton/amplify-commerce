import React from 'react'
import './styles/AppButton.css'

export default function AppButton(props) {

  const {title, icon, white=false, shadow=false} = props

  return (
    <div className={`appbutton ${white&&"white"} ${shadow&&"shadow"}`}>
      <span>{title}</span>
      <i className={icon}></i>
    </div>
  )
}