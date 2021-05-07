import React from 'react'
import HomeBanner from './HomeBanner'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'

export default function Home() {
  return (
    <div className="homepage">
      <HomeBanner />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  )
} 