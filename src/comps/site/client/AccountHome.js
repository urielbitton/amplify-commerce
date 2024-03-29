import React, { useContext } from 'react'
import './styles/AccountHome.css'
import {StoreContext} from '../../common/StoreContext'
import { Link } from 'react-router-dom'
import OrderProgress from '../common/OrderProgress'
import OrderTracking from '../common/OrderTracking'
import refProd from '../../common/referProduct'
import {convertDate} from '../../common/UtilityFuncs'

export default function AccountHome()  {

  const {myOrders, currencyFormat, allProducts} = useContext(StoreContext)
  const recentPurchases = []
  const latestOrder = myOrders[myOrders?.length-1]

  myOrders.forEach(el => { 
    recentPurchases.push(...el.products) 
  })
  const ordersrow = myOrders?.slice(0,4).map(el => {
    return <div className="orderrow" key={el.orderid}>
      <h6><Link to={`/my-account/order-details/${el.orderid}`}>{el.orderNumber.slice(0,7)}...</Link></h6>
      <h6>{el.products.length}</h6>
      <h6>{currencyFormat.format(el.orderTotal)}</h6>
      <h6>
        <span className={`${el.updates[el.updates.length-1]?.status==='Delivered'?"Delivered":""} ${el.updates[el.updates.length-1]?.status==='cancelled'?"cancelled":""}`}>
          {el.updates[el.updates.length-1]?.status}
        </span>
      </h6>
      <h6>
        {convertDate(el.orderDateCreated.toDate())}
      </h6>
    </div>
  })
  const purchasesrow = recentPurchases?.slice(0,5).map(el => {
    return <div className="orderrow" key={el.subid}>
      <h6><img src={refProd(allProducts, el.id).imgs[0]} alt=""/></h6>
      <h6><Link to={`/shop/product/${el.id}`}>{refProd(allProducts, el.id).name}</Link></h6>
      <h6>{currencyFormat.format(refProd(allProducts, el.id).price)}</h6>
      <h6>{el.units}</h6>
      <h6>{/*add instead orderDate on cart item (next to subid) */}</h6>
    </div>
  })

  return (
    <div className="accounthomepage">
      <h3 className="accounttitle">Overview</h3>
      <div className="homebox">
        <h4>Recent Orders</h4>
        <div className="hometable orderstable">
          <div className="header">
            <h6>Order #</h6>
            <h6>Products</h6>
            <h6>Total</h6>
            <h6>Status</h6>
            <h6>Order Date</h6>
          </div>
          <div className="content">
            {ordersrow}
          </div>
        </div>
      </div>
      {
        myOrders?.length?
        <div className="homebox">
          <h4>Latest Order</h4>
          <div className="orderinfo">
            <h6>Order #: {latestOrder?.orderNumber}</h6>
            <h6>
              {convertDate(latestOrder?.orderDateCreated.toDate())}
            </h6>
          </div>
          <OrderProgress order={latestOrder} /> 
        </div>:""
      }
      <div className="homebox full">
        <h4>Recent Purchases</h4>
        <div className="hometable purchasestable">
          <div className="header">
            <h6>Image</h6>
            <h6>Product</h6>
            <h6>Price</h6>
            <h6>Units</h6>
            <h6 style={{flexBasis:105}}>Date Purchased</h6>
          </div>
          <div className="content">
            {purchasesrow}
          </div>
        </div>
      </div>
      <OrderTracking />
    </div>
  )
}