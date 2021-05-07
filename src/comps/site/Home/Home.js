import React from 'react'
import HomeBanner from './HomeBanner'
import Section1 from './Section1'
import Section2 from './Section2'

export default function Home() {
  return (
    <div className="homepage">
      <HomeBanner />
      <Section1 />
      <Section2 />
    </div>
  )
} 