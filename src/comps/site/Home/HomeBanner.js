import React from 'react'
import AppButton from '../common/AppButton'
import './styles/HomeBanner.css'

export default function HomeBanner() {
  return (
    <div className="homebanner">
      <div className="bannerbg" style={{backgroundImage: `url(https://i.imgur.com/OfJc5t1.jpg)`}}></div>
      <div className="grid">
        <div className="titlescont">
          <h5>new collection 2021</h5>
          <h1>Women's Summer Trends</h1>
          <div className="btnscont">
            <AppButton 
              title="Shop Now" 
              icon="fal fa-angle-right" 
              white
            />
          </div>
        </div>
      </div>
    </div>
  )
}