import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles/Logo.css'

export default function Logo(props) {

  const {width=40, color=false, text=false, fontSize='23px', linkable} = props
  const history = useHistory()

  return (
    <div 
      className={`logocont ${!color&&'b-w'} ${text&&"text"} ${linkable&&"linkable"}`} 
      onClick={() => linkable&&history.push('/')}
    >
      <img src="https://i.imgur.com/43BCbLO.png" alt=""  style={{width}}/>
      <h5 style={{fontSize}}>Amplify<span>.</span></h5>
    </div>
  )
}