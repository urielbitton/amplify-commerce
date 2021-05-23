import React from 'react'
import OrdersCard from './OrdersCard'
import './styles/OrderDetails.css'

export default function OrderDetails(props) {

  const {products} = props.order

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
      <div className="ordercontainer">
        <div className="subcontainer">
          <div>
            <h6>Shipping Details</h6>
          </div>
          <div>
            <h6>Payment Details</h6>
          </div>
        </div>
        <div>
          <h6>Order Summary</h6>
        </div>
      </div>
      {productsrow}
    </div>
  )
}