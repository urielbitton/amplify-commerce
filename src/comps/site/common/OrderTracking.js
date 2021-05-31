import React, { useContext, useEffect, useState } from 'react'
import './styles/OrderTracking.css'
import {AppInput} from '../../common/AppInputs'
import AppButton from './AppButton'
import { StoreContext } from '../../common/StoreContext'
import OrdersCard from '../client/OrdersCard'

export default function OrderTracking(props) {

  const {} = props
  const {allOrders} = useContext(StoreContext)
  const [orderID, setOrderID] = useState('')
  const [billingEmail, setBillingEmail] = useState('')
  const [orderNumGo, setOrderNumGo] = useState('')
  const [emailGo, setEmailGo] = useState('')
  const [message, setMessage] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  const pattern = new RegExp('\\b' + clean(orderID), 'i')

  const ordersrow = allOrders?.allorders
  ?.filter(x => x.orderid === orderNumGo && x.billingDetails.email === emailGo)
  .map(order => {
    return <OrdersCard order={order} prodindex={0} showmore />
  })

  function trackOrder() {
    if(orderID.length && billingEmail.length) {
      setOrderNumGo(orderID)
      setEmailGo(billingEmail)
    }
    else {
      setMessage('Please enter the order ID and the associated billing email to track an order.')
    }
  }

  useEffect(() => {
    if(orderNumGo.length && emailGo.length && ordersrow?.length <= 0) {
      setMessage('No orders mathcing the provided order id have been found.')
    }
    else if(orderNumGo.length && emailGo.length && ordersrow?.length > 0) {
      setMessage('')
    }
  },[ordersrow])

  return (
    <div className="ordertrackingcont">
      <p>To track an order, please provide the order number found in your confirmation email from Amplify.
        Make sure to check your spam folder as well.
      </p>
        <form onSubmit={(e) => {e.preventDefault();trackOrder()}}>
          <input style={{display:'none'}}/>
          <AppInput 
            title="Order ID"
            onChange={(e) => setOrderID(e.target.value)}
            value={orderID}
          />
          <AppInput 
            title="Billing Email"
            onChange={(e) => setBillingEmail(e.target.value)}
          />
          <button style={{display:'none'}}>Submit</button>
        </form>
        <div className="btnscont">
          <AppButton 
            title="Track Order"
            onClick={() => trackOrder()}
          />
        </div>
        <div className="orderresultscont">
          {ordersrow}
          <small>{message}</small>
        </div>
    </div>
  )
}