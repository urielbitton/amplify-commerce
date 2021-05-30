import React from 'react'
import OrderTracking from './OrderTracking'
import PageBanner from './PageBanner'

export default function OrderTrackingPage() {
  
  return (
    <div className="ordertrackingpage">
      <PageBanner title="Order Tracking"/>
      <div className="grid xgrid">
        <div style={{width:'800px'}}>
          <OrderTracking />
        </div>
      </div>
    </div>
  )
}