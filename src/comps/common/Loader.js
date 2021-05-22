import React from 'react'
import './styles/Loader.css'

export default function Loader(props) {

  const {height="100%"} = props

  return <div className="loadercont" style={{height}}>
    <div className="spinner"></div>
  </div>
}