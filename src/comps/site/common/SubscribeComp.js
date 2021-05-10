import React from 'react'
import {AppInput} from '../../common/AppInputs'
import AppButton from '../common/AppButton'
import SectionTitles from './SectionTitles'
import './styles/SubscribeComp.css'

export default function SubscribeComp() {
  return (
    <div className="subscribesection">
      <div className="grid">
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
    
  )
}