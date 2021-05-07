import React from 'react'
import AppButton from '../common/AppButton'

export default function Section4() {
  return (
    <div className="homesection section4">
      <div className="grid xgrid">
        <div className="dealbox">
          <div className="spacediv"></div>
          <div className="dealtitles">
            <h6>30% Off deal</h6>
            <h2>Women's Spring Wear</h2>
            <div>
            <AppButton 
              title="Shop Deal"
              icon="fal fa-angle-right"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}