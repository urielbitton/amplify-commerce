import React from 'react'
import './styles/Logo.css'

export default function Logo(props) {

  const {width=40, color=false, text=false, fontSize='23px'} = props

  return (
    <div className={`logocont ${!color&&'b-w'} ${text&&"text"}`}>
      <img src="https://i.imgur.com/43BCbLO.png" alt=""  style={{width}}/>
      <h5 style={{fontSize}}>Amplify<span>.</span></h5>
    </div>
  )
}