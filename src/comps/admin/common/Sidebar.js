import React from 'react'
import './styles/Sidebar.css'
import {menuLinks} from './arrays/links'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {

  const menulinksrow = menuLinks?.map(({name,icon,url,exact,sublinks}) => {
    return <div className="adminlink">
      <NavLink exact={exact} to={url} activeClassName="activemenulink">
        <span>
          <i className={icon}></i>
          {name}
        </span>
        {sublinks&&<i className="fal fa-angle-up"></i>}
      </NavLink>
    </div>
  })

  return (
    <div className="adminsidebar">
      <div className="logocont">
        <div className="logodiv">
          <hr/><hr/>
        </div>
        <h4>Atomics.</h4>
      </div>
      <div className="menu">
        {menulinksrow}
      </div>
    </div> 
  )
}