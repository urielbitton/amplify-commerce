import React, { useState } from 'react'
import './styles/OrderTracking.css'
import {AppInput} from '../../common/AppInputs'
import AppButton from './AppButton'

export default function OrderTracking(props) {

  const {} = props
  const [orderID, setOrderID] = useState('')
  const [billingEmail, setBillingEmail] = useState('')

  function trackOrder() {

  }

  return (
    <div className="ordertrackingcont">
      <p>To track an order, please provide the order number found in your confirmation email from Amplify.
        Make sure to check your spam folder as well.
      </p>
        <AppInput 
          title="Order ID"
          onChange={(e) => setOrderID(e.target.value)}
        />
        <AppInput 
          title="Billing Email"
          onChange={(e) => setBillingEmail(e.target.value)}
        />
        <div className="btnscont">
          <AppButton 
            title="Track Order"
            onClick={() => trackOrder()}
          />
        </div>
    </div>
  )
}