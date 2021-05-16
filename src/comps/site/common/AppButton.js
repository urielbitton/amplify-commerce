import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles/AppButton.css'

export default function AppButton(props) {

  const {title, icon, url, white=false, shadow=false, className, noanimate, onClick} = props
  const history = useHistory()

  return (
    <div  
      {...props}
      onClick={() => url?history.push(url):onClick()}
      className={`appbutton ${className} ${white?"white":""} ${shadow?"shadow":""} ${noanimate?"noanimate":""}`}>
      <span>{title}</span>
      <i className={icon} style={{display: icon?"block":"none"}}></i>
    </div>
  )
}