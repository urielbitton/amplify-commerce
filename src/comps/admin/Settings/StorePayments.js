import React, { useContext, useEffect, useState } from 'react'
import {AppSwitch} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {StoreContext} from '../../common/StoreContext'
import {setDB, updateDB} from '../../common/services/CrudDb'
import { db } from '../../common/Fire'

export default function StorePayments() {

  const {storeSettings, setNotifs} = useContext(StoreContext)
  const [enablePayPal, setEnablePayPal] = useState(true)
  const [isSetupPayPal, setIsSetupPayPal] = useState()
  const [enableStripe, setEnableStripe] = useState(true)
  const [isSetupStripe, setIsSetupStripe] = useState()
  const [enableDirect, setEnableDirect] = useState(false)
  const [isSetupDirect, setIsSetupDirect] = useState()
  const updateID = db.collection('updates').doc().id

  function savePayments() {
    updateDB('admin', 'storeSettings', {
      payments: {
        directBank: {isEnabled:enableDirect, isSetup:isSetupDirect},
        paypal: {isEnabled:enablePayPal, isSetup:isSetupPayPal},
        stripe: {isEnabled:enableStripe, isSetup:isSetupStripe}
      }
    }).then(() => {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: `Payments Updated`,
        icon: 'fal fa-wallet',
        text: `The store payments settings were successfully updated`,
        time: 5000
      }])
      setDB('updates', updateID, {
        color: '#0088ff',
        date: new Date(),
        descript: `The store payment settings were updated. View them here.`,
        icon: 'fal fa-cog',
        id: updateID,
        read: false,
        title: 'Payment Settings Updated',
        url: `/admin/settings/store?payments`
      })
    })
  }

  useEffect(() => {
    setEnablePayPal(storeSettings.payments.paypal.isEnabled)
    setEnableStripe(storeSettings.payments.stripe.isEnabled)
    setEnableDirect(storeSettings.payments.directBank.isEnabled)
    setIsSetupPayPal(storeSettings.payments.paypal.isSetup)
    setIsSetupStripe(storeSettings.payments.stripe.isSetup)
    setIsSetupDirect(storeSettings.payments.directBank.isSetup)
  },[storeSettings])

  return (
    <>
      <section>
        <h4 className="settingstitle">Integrated Payments</h4>
        <AppSwitch title="PayPal" iconclass="fab fa-paypal" onChange={(e) => setEnablePayPal(e.target.checked)} checked={enablePayPal} />
        <div className="actioninput">
          <h6>Setup a paypal integrated payments for quick and easy customer checkouts.</h6>
          <AdminBtn title={isSetupPayPal?"Done":"Set Up"}/>
        </div>
        <AppSwitch title="Stripe" iconclass="fab fa-stripe-s" onChange={(e) => setEnableStripe(e.target.checked)} checked={enableStripe} />
        <div className="actioninput">
          <h6>Setup a stripe integrated payments for credit/debit card checkouts.</h6>
          <AdminBtn title={isSetupStripe?"Done":"Set Up"}/>
        </div>
        <AppSwitch title="Bank Transfer" iconclass="fas fa-money-check-alt" onChange={(e) => setEnableDirect(e.target.checked)} checked={enableDirect} />
        <div className="actioninput">
          <h6>Setup a direct bank transfer for customer checkouts.</h6>
          <AdminBtn title={isSetupDirect?"Done":"Set Up"}/>
        </div>
      </section>
      <div className="actionbtns">
        <AdminBtn title="Save" solid clickEvent onClick={() => savePayments()}/>
      </div>
    </>
  )
}