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
import AccountProfile from './AccountProfile'
import OrderDetails from './OrderDetails'
import Support from './Support'

export default function MyAccount() {

  const {user, myOrders} = useContext(StoreContext)
  const history = useHistory()

  const accountlinks = [
    {name: 'home', url: '/my-account', icon: 'fal fa-home', exact: true},
    {name: 'my orders', url: '/my-account/orders/', icon: 'fal fa-shopping-bag'},
    {name: 'my reviews', url: '/my-account/reviews/', icon: 'fal fa-star-half-alt'},
    {name: 'my addresses', url: '/my-account/addresses/', icon: 'fal fa-map-marker-alt'},
    {name: 'my payments', url: '/my-account/payments/', icon: 'fal fa-credit-card-front'},
    {name: 'customer support', url: '/my-account/customer-support/', icon: 'fal fa-headphones'},
    {name: 'profile', url: '/my-account/profile/', icon: 'fal fa-user'},
  ]
  const accountlinksrow = accountlinks.map(({name,url,icon,exact}) => {
    return <NavLink to={url} exact={exact} key={url} activeClassName="activemenulink">
      <i className={icon}></i>
      {name}
    </NavLink>
  })
  const orderdetailspage = myOrders?.map(order => {
    return <Route path={`/my-account/order-details/${order.orderid}`} key={order.orderid}>
      <OrderDetails order={order} />
    </Route>
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
              <Route path="/my-account/profile">
                <AccountProfile />
              </Route>
              <Route path="/my-account/customer-support">
                <Support />
              </Route>
              {orderdetailspage}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}