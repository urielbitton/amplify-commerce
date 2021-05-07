import React from 'react'
import AppButton from '../common/AppButton'
import './styles/HomeBanner.css'

export default function HomeBanner() {
  return (
    <div className="homebanner">
      <div className="bannerbg" style={{backgroundImage: `url(https://i.imgur.com/4uKF9Ew.jpg)`}}></div>
      <div className="grid">
        <div className="titlescont">
          <h5>New collection 2021</h5>
          <h1>Women's Summer Trends</h1>
          <div className="btnscont">
            <AppButton 
              title="Shop Now" 
              icon="fal fa-angle-right" 
              white
            />
          </div>
        </div>
        <div className="bannernav">
          <small className="active">01<hr/></small>
          <small>02<hr/></small>
          <small>03<hr/></small>
        </div>
      </div>
    </div>
  )
}