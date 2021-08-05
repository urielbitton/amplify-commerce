import React, { useContext, useEffect, useState } from 'react'
import './styles/Sidebar.css'
import {menuLinks} from './arrays/links'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { StoreContext } from '../../common/StoreContext'

export default function Sidebar() {

  const {setEditProdMode, setEditCoupMode, setEditShipMode, setEditOrdMode, setEditCustMode} = useContext(StoreContext)
  const [openTab, setOpenTab] = useState(0)
  const [openNew, setOpenNew] = useState(false)
  const location = useLocation()
  const history = useHistory()

  const menulinksrow = menuLinks?.map(({name,icon,sublinks},i) => {
    return <div className="adminlink">
      <h6 
        className={`menulink ${i===openTab?"activemenulink":""}`} 
        onClick={() => {setOpenTab(i===openTab?-1:i);i===0&&history.push('/admin/')}}
      > 
        <span>
          <i className={icon}></i>
          {name}
        </span>
        {sublinks&&<i className="fal fa-angle-up"></i>}
      </h6>
      <div className={sublinks&&`sublinkcont ${i===openTab?"open":""}`}>
        {
          sublinks?.map(({name,icon,url,exact}) => {
            return <NavLink exact={exact} to={url} className="menulink" activeClassName="activemenulink" key={url}>
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

  useEffect(() => {
    window.onclick = () => {
      openNew&&setOpenNew(false)
    }
  },[openNew])

  return (
    <div className="adminsidebar">
      <div className="logocont">
        <div className="logodiv">
          <hr/><hr/>
        </div>
        <h4>Atomics.</h4>
      </div>
      <div className="sidebarcontent hidescroll">
      <div className="menu">
        {menulinksrow}
      </div>
      <div 
        className={`addnewbtn ${openNew?"open":""}`} 
        onClick={(e) => {e.stopPropagation();setOpenNew(prev => !prev)}}
      >
        <div className="button">
          <i className="fad fa-plus"></i>
          <div className="infotxt">
            <h4>Add New</h4>
            <h6>Add products, orders, users</h6>
          </div>
          <i className="fal fa-angle-up"></i>
        </div>
        <div className="slidecont">
          <Link to="/admin/store/add-product" onClick={() => setEditProdMode(false)}><i className="fal fa-plus"></i>Add Product</Link>
          <Link to="/admin/store/add-coupon" onClick={() => setEditCoupMode(false)}><i className="fal fa-plus"></i>Add Coupon</Link>
          <Link to="/admin/store/add-shipping" onClick={() => setEditShipMode(false)}><i className="fal fa-plus"></i>Add Shipping</Link>
          <Link to="/admin/orders/add-order" onClick={() => setEditOrdMode(false)}><i className="fal fa-plus"></i>Add Order</Link>
          <Link to="/admin/customers/add-customer" onClick={() => setEditCustMode(false)}><i className="fal fa-plus"></i>Add Customer</Link>
          <Link to="/admin/settings/users/add-user"><i className="fal fa-plus"></i>Add User</Link>
        </div>
      </div>
      <div className="sidefooter">
        <small>© 2021 Amplify Commerce by Atomics Digital. Version : 2.3.0</small> 
      </div>
      </div>
    </div> 
  )
}