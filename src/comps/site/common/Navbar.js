import React, { useEffect, useState } from 'react'
import './styles/Navbar.css'
import Logo from '../../common/Logo'
import { Link, NavLink } from 'react-router-dom'
import menuLinks from './arrays/menuLinks'

export default function Navbar() {

  const [dealBar, setDealBar] = useState(true)
  const [fixNav, setFixNav] = useState(false)
  let prevScrollpos = window.pageYOffset
  
  const menulinksrow = menuLinks?.map(({name,url,exact,sublinks}) => {
    return <div className="menulink">
      <NavLink exact={exact} to={url} activeClassName="activemenulink">{name}<hr/></NavLink>
      {
        sublinks?.map(({name,url}) => {
          return <div className="sublink">
            <NavLink to={url}>{name}</NavLink>
          </div>
        }) 
      }
    </div>
  })

  useEffect(() => {
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset
      if(window.pageYOffset > 130) {
        if (prevScrollpos < currentScrollPos) {
          setFixNav(true)
        }  
      }
      else {
        setFixNav(false)
      }
      prevScrollpos = currentScrollPos
    }
  },[])

  return (
    <>
      { dealBar&&
        <div className="dealbar">
          <div></div>
          <p>Exclusive deals this weekend - <span>30% OFF</span> all women's wear.  
            <Link href="#">Get deal</Link>
          </p>
          <i className="fal fa-times" onClick={() => setDealBar(false)}></i>
        </div>
      }
      <nav className={`navbar ${fixNav&&"fixednav"}`}>
        <div className="left">
          <Logo color text/>
          <div className="menu">
            {menulinksrow}
          </div>
        </div>
        <div className="right">
          <div className="logdiv">
            <Link to="/login">register</Link>
            <span>/</span>
            <Link to="/login">login</Link>
          </div>
          <div>
            <i className="fal fa-search"></i>
          </div> 
          <div>
            <i className="fal fa-heart"></i>
            <div className="numcircle">2</div>
          </div>
          <div>
            <i className="fal fa-shopping-cart"></i>
            <div className="numcircle">13</div>
          </div>
        </div>
      </nav>
    </>
  )
}

