import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import Dashbox from '../Home/Dashbox'

export default function Analytics() {

  const {allOrders, allProducts, allCoupons, allShipping, allCustomers} = useContext(StoreContext)

  const dashboxarr2 = [
    {title: 'Total Products', icon: 'far fa-shopping-bag', total: allOrders.length, format: 'number'},
    {title: 'Total Products', icon: 'far fa-tshirt', total: allProducts.length, format: 'number'},
    {title: 'Total Coupons', icon: 'far fa-money-bill', total: allCoupons.length, format: 'number'},
    {title: 'Total Shipping Methods', icon: 'far fa-truck', total: allShipping.length, format: 'number'},
    {title: 'Total Customers', icon: 'far fa-user-tag', total: allCustomers.length, format: 'number'},
  ]

  const dashboxrow2 = dashboxarr2?.map(el => {
    return <Dashbox el={el} />
  }) 

  return (
    <div className="analyticspage dashboardpage">
      <div className="dashboxcont">
        {dashboxrow2}
      </div>
      <div className="pagecont">
        
      </div>
    </div>
  )
}