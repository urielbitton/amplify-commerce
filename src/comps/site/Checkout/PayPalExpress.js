import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'
 
export default function PayPalExpress() {

  const onSuccess = (payment) => { 
    console.log("The payment was succeeded!", payment);
  }
 
  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  }

  const onError = (err) => {
    console.log("Error!", err);
  }

  let env = 'production' // you can set here to 'production' for production or 'sandbox'
  let currency = 'CAD'
  let total = 0.05

  const client = {
      sandbox:    '',
      production: 'ASTQpkv9Y3mQ5-YBd20q0jMb9-SJr_TvUl_nhXu5h3C7xl0wumYgdqpSYIL6Vd__56oB7Slag0n2HA_r', 
  }

  return (
      <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
  )
} 