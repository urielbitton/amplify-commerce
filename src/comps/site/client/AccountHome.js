import React from 'react'
import './styles/AccountHome.css'

export default function AccountHome()  {
  return (
    <div className="accounthomepage">
      {/*Find an order (enter order number to find an order)*/}
      <div className="homebox">
        <h4>Recent Orders</h4>
      </div>
      <div className="homebox">
        <h4>Track Your Orders</h4>
      </div>
      <div className="homebox full">
        <h4>Recent Purchases</h4>
      </div>
    </div>
  )
}