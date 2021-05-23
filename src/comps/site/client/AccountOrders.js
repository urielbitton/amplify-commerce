import React, { useContext, useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import './styles/AccountOrders.css'
import {StoreContext} from '../../common/StoreContext'
import OrdersCard from './OrdersCard'

export default function AccountOrders()  {

  const {myOrders} = useContext(StoreContext)
  const [statusFilter, setStatusFilter] = useState('all')

  const ordersrow = myOrders
  ?.filter(x => x.orderStatus === statusFilter || statusFilter === 'all')
  .map(order => {
    return <OrdersCard order={order} />
  })

  return (
    <div className="accountorderspage">
      <div className="switchbar">
        <NavLink exact to="/my-account/orders/" activeClassName="activemenulink">
          Orders<hr/>
        </NavLink>
        <NavLink to="/my-account/orders/open" activeClassName="activemenulink">
          Open Orders<hr/>
        </NavLink>
        <NavLink to="/my-account/orders/cancelled/" activeClassName="activemenulink">
          Cancelled<hr/>
        </NavLink>
      </div>
      <div className="filtersbar">

      </div>
      <div className="orderscontent">
        <Switch>
          <Route exact path="/my-account/orders/">
            {ordersrow}
          </Route>
          <Route path="/my-account/orders/cancelled/">

          </Route>
          <Route path="/my-account/orders/open/">

          </Route>
        </Switch>
      </div>
    </div>
  )
} 