import React, { useContext, useEffect, useState } from 'react'
import {AppInput} from '../../common/AppInputs'
import AppButton from '../common/AppButton'
import SectionTitles from './SectionTitles'
import './styles/SubscribeComp.css'
import {StoreContext} from '../../common/StoreContext'
import {deleteDB, setDB} from '../../common/services/CrudDb'
import { db } from '../../common/Fire'

export default function SubscribeComp() {

  const {user, allSubscribers} = useContext(StoreContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const alreadySubbed = allSubscribers.some(x => x.email === email) 
  const docId = user?user.uid:db.collection('subscribers').doc().id

  function subscribeUser() {
    if(!alreadySubbed) {
      setDB('subscribers', docId, {
        id: docId,
        date: new Date(),
        email,
        name,
        isActive: true
      }).then(() => {
        window.alert('You were successfully subscribed to our newsletter. Thank you.')
      })
    }
    else {
      const confirm = window.confirm('Are you sure you would like to unsubscribe from our newsletter?')
      if(confirm) {
        deleteDB('subscribers', docId).then(() => {
          window.alert(`Your email ${email} has been successfully unsubscribed from our newsletter.`)
        })
      }
    }
  }

  useEffect(() => {
    if(user) {
      setName(user.displayName)
      setEmail(user.email)
    }
  },[user])

  return (
    <div className="subscribesection">
      <div className="grid">
        <SectionTitles 
          title="Subscribe to Amplify"
          text="Subscribe to our newsletter for news, deals and promotions."
        />
        <div className="subscribeform">
          <AppInput 
            placeholder="Your Name"
            className="nameinp"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <AppInput 
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <AppButton 
            title={alreadySubbed?"Unsubscribe":"Subscribe"}
            disabled={!name.length || !email.length}
            onClick={() => subscribeUser()}
          />
        </div>
      </div>
    </div>
    
  )
}