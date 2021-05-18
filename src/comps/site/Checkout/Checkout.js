import React, {useContext, useEffect, useState} from 'react'
import PageBanner from '../common/PageBanner'
import {StoreContext} from '../../common/StoreContext'
import './styles/Checkout.css'
import { Link } from 'react-router-dom'
import {AppInput, AppSelect} from '../../common/AppInputs'

export default function Checkout() {

  const {
    showCart, setShowCart, billingState, setBillingState, shippingState, setShippingState, countriesList
  } = useContext(StoreContext)
 
  const billingarr = [
    {title: 'First Name', name: 'fname', halfwidth: true},
    {title: 'Last Name', name: 'lname', halfwidth: true},
    {title: 'Company Name', name: 'company'},
    {title: 'Street Address', name: 'address'},
    {title: 'Apartment/Unit', name: 'apt-unit'},
    {title: 'City', name: 'city'},
    {title: 'Province/State', name: 'provstate'},
    {title: 'Country', name: 'country', options:countriesList},
    {title: 'Postal Code/ZIP', name: 'postcode'},
    {title: 'Phone Number', name: 'phone'},
    {title: 'Email Address', name: 'email'},
  ]

  const billingInputs = billingarr.map(({title,name,halfwidth,options}) => {
    if(!options) 
      return <AppInput 
        title={title}
        name={name}
        onChange={(e) => handleChange(e)}
        className={halfwidth?"halfwidth":""}
      />
    else 
      return <AppSelect 
        options={options} 
        title={title}
        name={name}
        onChange={(e) => handleChange(e)}
      />
  })

  function handleChange(event) {
    const {name, value} = event.target
    setBillingState(prev => ({
      ...prev,
      [name]:value
    }))
  }

  useEffect(() => {
    showCart&&setShowCart(false)
  },[]) 

  return (
    <div className="checkoutpage">
      <PageBanner title="Checkout" />
      <div className="grid xgrid">
        <div className="registercont">
          <h6>Returning Customer?<Link to="/login">Login Here</Link></h6>
        </div>
        <div className="checkoutcont">
          <div className="checkoutform">
            <h3 className="titles">Billing Details</h3>
            {billingInputs}
          </div>
          <div className="ordercont">
            <h3 className="titles">Order Details</h3>
          </div>
        </div>
      </div>
    </div>
  )
}