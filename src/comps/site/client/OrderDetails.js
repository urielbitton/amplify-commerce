import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import OrdersCard from './OrdersCard'
import './styles/OrderDetails.css'

export default function OrderDetails(props) {

  const {products, shippingDetails, paymentDetails, orderid, orderDateCreated,
    orderSubtotal, shippingMethod, orderTotal
  } = props.order
  const {currencyFormat} = useContext(StoreContext)
  const orderDate = orderDateCreated.toDate().toString().split(' ')

  const paymenticons = [
    {name:'paypal', icon: "https://i.imgur.com/4eSqQ7U.jpg"},
    {name:'visa', icon: "https://i.imgur.com/qFu3UQf.jpg"},
    {name:'mastercard', icon: "https://i.imgur.com/VVJJmxs.jpg"}
  ]

  const productsrow = products?.map((product,i) => {
    return <OrdersCard 
      topbar={false} 
      vieworderbtn={false} 
      order={props.order} 
      prodindex={i}
    />
  })

  return (
    <div className="orderdetailspage">
      <h3 className="contenttitle">Order Details</h3>
      <div className="metainfo">
        <h5>Order Date: {orderDate[1]} {orderDate[2]} {orderDate[3]}</h5>
        <h5 style={{color:'#aaa'}}>|</h5>
        <h5>Order Number: {orderid}</h5>
      </div>
      <div className="ordercontainer">
        <div className="subcontainer">
          <div className="column">
            <h6>Shipping Details</h6>
            <small>{shippingDetails.fname} {shippingDetails.lname}</small>
            <small>{shippingDetails.address}</small>
            <small>Apt {shippingDetails.aptunit}</small>
            <small>{shippingDetails.city}, {shippingDetails.provstate} 
              <span className="upper">{shippingDetails.postcode}</span>
            </small>
            <small>{shippingDetails.country}</small> 
          </div>
          <div className="column">
            <h6>Payment Details</h6>
            <small>
              <img src={paymenticons.find(x => x.name===paymentDetails.method).icon} alt=""/>
              {
                paymentDetails.method==='paypal'?
                paymentDetails.email:
                paymentDetails.cardnumber
              }
            </small>
          </div>
        </div>
        <div className="column ordersummary">
          <h6>Order Summary</h6>
          <small>Order Subtotal: <span>{currencyFormat.format(orderSubtotal)}</span></small>
          <small>Shipping & Handling: <span>{currencyFormat.format(shippingMethod.cost)}</span></small>
          <small>Total before tax: <span>{currencyFormat.format(orderSubtotal+shippingMethod.cost)}</span></small>
          <small className="ordertotal">Order Total: <span>{currencyFormat.format(orderTotal)}</span></small>
        </div>
      </div>
      {productsrow}
    </div>
  )
}