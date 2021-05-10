import React from 'react'
import PageBanner from '../common/PageBanner'
import SubscribeComp from '../common/SubscribeComp'

export default function NewArrivals() {
  return (
    <div className="newarrivalspage">
      <PageBanner 
        title="New Arrivals"
      />
      <SubscribeComp />
    </div>
  )
}