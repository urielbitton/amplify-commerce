import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import './styles/SlideNav.css'
import Logo from '../../common/Logo'
import { Link, NavLink } from 'react-router-dom'
import menuLinks from './arrays/menuLinks'
import AppButton from './AppButton'

export default function SlideNav() {

  const {slideNav, setSlideNav} = useContext(StoreContext)
  const [tabOpen, setTabOpen] = useState(false)
  const [tabNum, setTabNum] = useState(0)

  useEffect(() => {
    window.onclick = () => {
      slideNav&&setSlideNav(false)
    }
  },[slideNav])
  
  const menurow = menuLinks?.map(({name, sublinks},i) => {
    return <div 
      className={`moblink ${tabNum===i&&tabOpen&&"open"}`} 
      onClick={() => {setTabNum(i);setTabOpen(prev => !prev)}}
    >
      <div className="head">
        <NavLink 
          to={`/${name==='home'?'':name}`}
          onClick={() => setSlideNav(prev => !prev)}
          exact={name==='home'&&true} 
          activeClassName="activemoblink"
        >
          <span>{name}</span>
        </NavLink>
        <i className="far fa-angle-right"></i>
      </div>
      <div className="body" style={{display: sublinks?"flex":"none"}}>
        {
          sublinks?.map(({name,pos,url}) => {
            return <NavLink 
              to={url}
              onClick={() => setSlideNav(prev => !prev)}
              exact={true} 
              activeClassName="activemoblink"
            >
              {name}
            </NavLink>
          })
        }
      </div>
    </div>
  })

  return (
    <div 
      className={`slidenav ${slideNav?"open":"closed"} hidescroll`}
      onClick={(e) => e.stopPropagation()}
    >
      <Logo color/>
      <div className="menu">
        {menurow}
        <Link 
          to="/admin" 
          className="noborder" 
          onClick={() => setSlideNav(prev => !prev)}
        >
          <AppButton 
            title="Login"
            icon="far fa-sign-in"
          />
        </Link>
        <Link  
          to="/start-a-project" 
          onClick={() => setSlideNav(prev => !prev)} 
          className="noborder"
        >
        </Link>
      </div>
    </div>
  )
}