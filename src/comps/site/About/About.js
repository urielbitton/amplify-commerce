import React from 'react'
import PageBanner from '../common/PageBanner'
import SubscribeComp from '../common/SubscribeComp'

export default function About() {
  return (
    <div className="aboutpage">
      <PageBanner 
        title="About"
      />
      <SubscribeComp />
    </div>
  )
}