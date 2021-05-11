import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Footer.css'
import footlinks from './arrays/footLinks'

export default function Footer() {

  const footlinksrow = footlinks.map(({name,url}) => {
    return <h6 key={name}><Link to={url}>{name}</Link></h6>
  })

  return (
    <footer className="footer">
      <div className="grid">
        <div className="colsection">
          <div className="col">
            <h3>Amplify<span>.</span></h3>
            <p>Shop the hottest collections and trends with secure checkouts and free returns.</p>
            <img src="https://i.imgur.com/Kduhi71.png" alt="payments"/>
          </div>
          <div className="col">
            <h4>Shop</h4>
            {footlinksrow.slice(0,5)}
          </div>
          <div className="col">
            <h4>Help</h4>
            {footlinksrow.slice(5,9)}
          </div>
          <div className="col">
            <h4>Company</h4>
            {footlinksrow.slice(9,15)}
          </div>
        </div>
        <div className="bottombar">
          <small>All Rights Reserved. Amplify Commerce &copy; 2021</small>
          <div>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>
      </div>
    </footer>
  )
}