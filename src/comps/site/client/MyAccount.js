import React, { useContext, useEffect } from 'react'
import firebase from 'firebase'
import { NavLink, Route, Switch, useHistory } from 'react-router-dom'
import {StoreContext} from '../../common/StoreContext'
import AppButton from '../common/AppButton'
import PageBanner from '../common/PageBanner'
import './styles/MyAccount.css'
import AccountHome from './AccountHome'
import AccountOrders from './AccountOrders'
import AccountAddresses from './AccountAddresses'
import AccountPayments from './AccountPayments'
import AccountSettings from './AccountSettings'

export default function MyAccount() {

  const {user} = useContext(StoreContext)
  const history = useHistory()

  const accountlinks = [
    {name: 'home', url: '/my-account', icon: 'fal fa-home', exact: true},
    {name: 'my orders', url: '/my-account/orders/', icon: 'fal fa-shopping-bag'},
    {name: 'my addresses', url: '/my-account/addresses/', icon: 'fal fa-map-marker-alt'},
    {name: 'my payments', url: '/my-account/payments/', icon: 'fal fa-credit-card-front'},
    {name: 'settings', url: '/my-account/settings/', icon: 'fal fa-cog'},
  ]
  const accountlinksrow = accountlinks.map(({name,url,icon,exact}) => {
    return <NavLink to={url} exact={exact} activeClassName="activemenulink">
      <i className={icon}></i>
      {name}
    </NavLink>
  })

  function logoutUser() {
    const confirm = window.confirm('Are you sure you wish to log out?')
    if(confirm) {
      firebase.auth().signOut()
      window.location.reload()
    }
  }

  useEffect(() => {
    if(user === null) {
      history.push('/')
    }  
  },[]) 

  return (
    <div className="myaccountpage">
      <PageBanner title="My Account"/>
      <div className="grid xgrid">
        <div className="myaccountcont">
          <div className="myaccountsidebar">
            <div className="menu">
              {accountlinksrow}
            </div>
            <AppButton 
              title="Log Out"
              onClick={() => logoutUser()}
              icon="fal fa-sign-out"
              noanimate
            /> 
          </div>
          <div className="myaccountcontent">
            <Switch>
              <Route exact path="/my-account">
                <AccountHome />
              </Route>
              <Route path="/my-account/orders">
                <AccountOrders />
              </Route>
              <Route path="/my-account/addresses">
                <AccountAddresses />
              </Route>
              <Route path="/my-account/payments">
                <AccountPayments />
              </Route>
              <Route path="/my-account/settings">
                <AccountSettings />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}