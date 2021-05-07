import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles/AppButton.css'

export default function AppButton(props) {

  const {title, icon, url, white=false, shadow=false} = props
  const history = useHistory()

  return (
    <div 
      className={`appbutton ${white&&"white"} ${shadow&&"shadow"}`} 
      onClick={() => history.push(url)}
    >
      <span>{title}</span>
      <i className={icon}></i>
    </div>
  )
}