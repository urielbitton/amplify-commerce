import React from 'react'
import './styles/HomeSections.css'

export default function Section5() {

  const features = [
    {name: 'Free Shipping', icon: 'fal fa-truck', text:'All orders over $35 qualify for free shipping.'},
    {name: 'Secure Checkouts', icon: 'fal fa-credit-card', text:'Our payments gateway is completely secure.'},
    {name: 'Free Returns', icon: 'fal fa-repeat-alt', text: 'Anything you don\'t like or doesn\'t fit can be returned!'},
    {name: 'Quality Guarantee', icon: 'fal fa-shield-alt', text:'All our products possess a certificate of authenticity.'},
  ]

  const featuresrow = features?.map(({name,icon,text}) => {
    return <div className="featuresbox" key={name}>
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
      </div>
    </div>
  )
}