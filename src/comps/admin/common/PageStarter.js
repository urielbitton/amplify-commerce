import React from 'react'
import AdminBtn from './AdminBtn'
import './styles/PageStarter.css'

export default function PageStarter(props) {

  const {subtitle, title, img, btnText, btnUrl, hide, clickEvent=false, onClick} = props

  return (
    <div className={`pagestarter ${hide?"hide":""}`}>
      <h6>{subtitle}</h6>
      <h3>{title}</h3>
      <img src={img} alt=""/> 
      {btnText&&<AdminBtn title={btnText} solid url={btnUrl} clickEvent={clickEvent} onClick={onClick} />}
    </div>
  )
}