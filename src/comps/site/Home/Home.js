import React, {useEffect} from 'react'
import HomeBanner from './HomeBanner'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import SubscribeComp from '../common/SubscribeComp'

export default function Home() {

  useEffect(() => {
    document.title = `Home - Amplify Commerce`
  },[])

  return (
    <div className="homepage">
      <HomeBanner />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <SubscribeComp />
    </div>
  )
} 