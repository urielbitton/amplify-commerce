import React, { useEffect, useState } from 'react'
import './styles/Sidebar.css'
import {menuLinks} from './arrays/links'
import { NavLink, useLocation } from 'react-router-dom'

export default function Sidebar() {

  const [openTab, setOpenTab] = useState(0)
  const location = useLocation()

  const menulinksrow = menuLinks?.map(({name,icon,sublinks},i) => {
    return <div className="adminlink">
      <h6 className={`menulink ${i===openTab?"activemenulink":""}`} onClick={() => setOpenTab(i===openTab?-1:i)}> 
        <span>
          <i className={icon}></i>
          {name}
        </span>
        {sublinks&&<i className="fal fa-angle-up"></i>}
      </h6>
      <div className={`sublinkcont ${i===openTab?"open":""}`}>
        {
          sublinks?.map(({name,icon,url,exact}) => {
            return <NavLink exact={exact} to={url} className="menulink" activeClassName="activemenulink">
              <span>
                <i className={icon}></i>
                {name}
              </span>
            </NavLink>
          })
        }
      </div>
    </div>
  })

  useEffect(() => {
    if(location.pathname.includes('/admin/store/')) 
      setOpenTab(1)
    else if(location.pathname.includes('/admin/orders/')) 
      setOpenTab(2)
    else if(location.pathname.includes('/admin/customers/')) 
      setOpenTab(3)
    else if(location.pathname.includes('/admin/support/')) 
      setOpenTab(4)
    else if(location.pathname.includes('/admin/settings/')) 
      setOpenTab(5)
    else 
      setOpenTab(0)
  },[])

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
      <div className="addnewbtn">
        <img src="" alt=""/>
        <h4>Add New</h4>
      </div>
    </div> 
  )
}