import React from 'react'
import AdminBtn from './AdminBtn'
import './styles/PageStarter.css'

export default function PageStarter(props) {

  const {subtitle, title, img, btnText, btnUrl} = props

  return (
    <div className="pagestarter">
      <h6>{subtitle}</h6>
      <h3>{title}</h3>
      <img src={img} alt=""/> 
      <AdminBtn title={btnText} solid url={btnUrl} />
    </div>
  )
}