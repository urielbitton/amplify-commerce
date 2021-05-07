import React from 'react'
import './styles/HomeSections.css'
import SectionTitles from '../common/SectionTitles'
import {AppInput} from '../../common/AppInputs'
import AppButton from '../common/AppButton'

export default function Section5() {

  const features = [
    {name: 'Free Shipping', icon: 'fal fa-truck', text:'All orders over $35 qualify for free shipping.'},
    {name: 'Secure Checkouts', icon: 'fal fa-credit-card', text:'Our payments gateway is completely secure.'},
    {name: 'Free Returns', icon: 'fal fa-comments-alt-dollar', text: 'Anything you don\'t like or doesn\'t fit can be returned!'},
    {name: 'Quality Guarantee', icon: 'fal fa-shield-alt', text:'All our products possess a certificate of authenticity.'},
  ]

  const featuresrow = features?.map(({name,icon,text}) => {
    return <div className="featuresbox">
      <i className={icon}></i>
      <div>
        <h4>{name}</h4>
        <small>{text}</small>
      </div>
    </div>
  })

  return (
    <div className="homesection section5">
      <div className="grid xgrid">
        <div className="featuressection">
          {featuresrow}
        </div>
        <div className="spacerl"></div>
        <div className="subscribesection">
          <SectionTitles 
            title="Subscribe to Amplify"
            text="Subscribe to our nesletter for news, deals and promotions."
          />
          <div className="subscribeform">
            <AppInput 
              placeholder="Your email"
            />
            <AppButton 
              title="Subscribe"
            />
          </div>
        </div>
      </div>
    </div>
  )
}