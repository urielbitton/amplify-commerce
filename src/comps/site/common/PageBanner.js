import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/PageBanner.css'

export default function PageBanner(props) {
  
  const {title} = props
  const location = useLocation()
  const crumbs = location.pathname?.split('/').slice(1)
 
  const crumbsrow = crumbs?.map(el => {
    return <>
      <small><i className="fal fa-angle-left"></i></small>
      <Link><small>{el.replaceAll('-',' ')}</small></Link>
    </>
  })

  return (
    <div className="pagebanner">
      <div className="grid">
        <div className="crumbscont">
          <Link to="/"><small>Home</small></Link>
          {crumbsrow}
        </div>
        <div className="titlecont">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  )
}