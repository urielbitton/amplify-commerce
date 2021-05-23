import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Route, Switch, useLocation } from 'react-router-dom'
import './styles/AccountOrders.css'
import {StoreContext} from '../../common/StoreContext'
import OrdersCard from './OrdersCard'
import {AppSelect} from '../../common/AppInputs'

export default function AccountOrders()  {

  const {myOrders} = useContext(StoreContext)
  const [statusFilter, setStatusFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')
  const location = useLocation()

  const ordersrow = myOrders
  ?.filter(x => x.orderStatus === statusFilter || statusFilter === 'all')
  .map((order,i) => {
    return <OrdersCard order={order} prodindex={0} showmore/>
  })
  const ordersfilters = [
    {name: 'This Month', value: '1m'},
    {name: 'Past 3 Months', value: '3m'},
    {name: 'This Year', value: '1y'},
    {name: 'All Time', value: 'all'},
  ]
  const filteroptions = ordersfilters.map(el => {
    return {name: el.name, value: el.value, selected: timeFilter===el.value?"selected":""}
  })
  const orderlinks = [
    {name: 'orders', url: '/my-account/orders/', exact: true},
    {name: 'open orders', url: '/my-account/orders/open/?query=open'},
    {name: 'cancelled', url: '/my-account/orders/cancelled/?query=cancelled'}
  ]
  const ordermenulinks = orderlinks.map(({name,url,exact}) => {
    return <NavLink exact={exact} to={url} activeClassName="activemenulink">
        {name}<hr/>
      </NavLink>
  })
  const ordermenuroutes = orderlinks.map(({name,url,exact}) => {
    return <Route path={url}>
        {ordersrow}
      </Route>
  })

  useEffect(() => {
    if(location.search.includes('query'))
      setStatusFilter(location.search.split('=')[1])
    else 
      setStatusFilter('all')
  },[location.search])

  return (
    <div className="accountorderspage">
      <div className="switchbar">
        {ordermenulinks}
      </div>
      <div className="filtersbar">
        <h6>{ordersrow.length} orders placed</h6>
        <AppSelect 
          options={filteroptions}
          onChange={(e) => setTimeFilter(e.target.value)}
          namebased
        />
      </div>
      <div className="orderscontent">
        <Switch>
          {ordermenuroutes}
        </Switch>
      </div>
    </div>
  )
} 