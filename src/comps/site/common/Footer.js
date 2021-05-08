import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Footer.css'

export default function Footer() {

  const footlinks = [
    {name: 'Women\'s Apparel', url: ''},
    {name: 'Men\'s Apparel', url: ''},
    {name: 'Kid\'s Apparel', url: ''},
    {name: 'Shop Collections', url: ''},
    {name: 'Shop Deals', url: ''},
    {name: '1-800-384-0039', url: ''},
    {name: 'help@amplify.com', url: ''},
    {name: 'Returns & Exchanges', url: '',},
    {name: 'My Account', url: ''},
    {name: 'FAQ', url: ''},
    {name: 'Contact Us', url: ''},
    {name: 'Our Stores', url: ''},
    {name: 'About Us', url: ''},
    {name: 'Careers', url: ''},
    {name: 'Sustainability', url: ''},
  ]

  const footlinksrow = footlinks.map(({name,url}) => {
    return <h6><Link to={url}>{name}</Link></h6>
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