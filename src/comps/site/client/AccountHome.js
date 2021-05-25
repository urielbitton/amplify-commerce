import React, { useContext } from 'react'
import './styles/AccountHome.css'
import {StoreContext} from '../../common/StoreContext'
import { Link } from 'react-router-dom'
import OrderProgress from '../common/OrderProgress'

export default function AccountHome()  {

  const {myOrders, currencyFormat} = useContext(StoreContext)

  const ordersrow = myOrders?.slice(0,4).map(el => {
    return <div className="orderrow" key={el.orderid}>
      <h6><Link to={`/my-account/order-details/${el.orderid}`}>{el.orderid.slice(0,5)}...</Link></h6>
      <h6>{el.products.length}</h6>
      <h6>{currencyFormat.format(el.orderTotal)}</h6>
      <h6>
        <span className={`${el.orderStatus==='delivered'?"delivered":""} ${el.orderStatus==='cancelled'?"cancelled":""}`}>{el.orderStatus}</span>
      </h6>
      <h6>
        {el.orderDateCreated.toDate().toString().split(' ')[1]}&nbsp; 
        {el.orderDateCreated.toDate().toString().split(' ')[2]}&nbsp; 
        {el.orderDateCreated.toDate().toString().split(' ')[3]}
      </h6>
    </div>
  })

  return (
    <div className="accounthomepage">
      <div className="homebox">
        <h4>Recent Orders</h4>
        <div className="hometable orderstable">
          <div className="header">
            <h6>Order #</h6>
            <h6>Items</h6>
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
            <h6>Order #: {myOrders[myOrders?.length-1]?.orderid}</h6>
            <h6>
              {myOrders[myOrders?.length-1]?.orderDateCreated.toDate().toString().split(' ')[1]}&nbsp;
              {myOrders[myOrders?.length-1]?.orderDateCreated.toDate().toString().split(' ')[2]}&nbsp;
              {myOrders[myOrders?.length-1]?.orderDateCreated.toDate().toString().split(' ')[3]}
            </h6>
          </div>
          <OrderProgress order={myOrders[myOrders?.length-1]} />
        </div>:""
      }
      <div className="homebox full">
        <h4>Recent Purchases</h4>
      </div>
      <div className="homebox">
        <h4>Find an Order</h4>
      </div>
    </div>
  )
}