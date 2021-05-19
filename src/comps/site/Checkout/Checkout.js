import React, {useContext, useEffect, useState} from 'react'
import PageBanner from '../common/PageBanner'
import {StoreContext} from '../../common/StoreContext'
import './styles/Checkout.css'
import { Link } from 'react-router-dom'
import {AppInput, AppSelect} from '../../common/AppInputs'
import CheckoutItem from './CheckoutItem'
import AppButton from '../common/AppButton'

export default function Checkout() {

  const {
    showCart, setShowCart, billingState, setBillingState, shippingState, setShippingState, countriesList,
    myUser, cartSubtotal, currencyFormat, percentFormat, shippingMethods, paymentMethods, setLocateUser, 
    userLocation, provinces} = useContext(StoreContext)
  const [chosenShipping, setChosenShipping] = useState({name: "regular",cost: 3.99})
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [taxRate, setTaxRate] = useState(0.15)
  const orderTotal = cartSubtotal + (cartSubtotal*taxRate) + chosenShipping.cost

  const provincesOpts = provinces?.map(({name,rate}) => {
    return {name:name, value:rate, selected:userLocation.region===name}
  })
  const billingarr = [
    {title: 'First Name *', name: 'fname', halfwidth: true},
    {title: 'Last Name *', name: 'lname', halfwidth: true},
    {title: 'Company Name', name: 'company'},
    {title: 'Street Address *', name: 'address'},
    {title: 'Apartment/Unit', name: 'aptunit'},
    {title: 'City *', name: 'city'},
    {title: 'Province/State *', name: 'provstate', options: provincesOpts, provinces:true},
    {title: 'Country *', name: 'country', options:countriesList},
    {title: 'Postal Code/ZIP *', name: 'postcode'},
    {title: 'Phone Number *', name: 'phone'},
    {title: 'Email Address *', name: 'email'},
  ]
  const billingInputs = billingarr.map(({title,name,halfwidth,options,required,provinces}) => {
    if(!options) 
      return <AppInput 
        title={title} 
        name={name}
        onChange={(e) => handleChange(e)}
        className={halfwidth?"halfwidth":""}
      />
    else 
      return <AppSelect  
        options={[{name:'Select an Option',disabled:true},...options]} 
        title={title}
        name={name}
        onChange={(e) => !provinces?handleChange(e):setTaxRate(e.target.value/100)}
        namebased={provinces}
      />
  })
  const caritemrows = myUser?.cart?.map(el => {
    return <CheckoutItem el={el} />
  })
  const shipoptions = shippingMethods?.map(({name,price,value,defaultvalue}, i) => {
    return <AppInput
        type="radio"
        title={<>{name} <span>{`(${currencyFormat.format(price)})`}</span></>}
        name="shippingmethod"
        onChange={() => setChosenShipping({ name: value, cost: price })}
        value={chosenShipping}
        defaultChecked={defaultvalue}
      />
    }
  )
  const paymentInputs = paymentMethods.map(({name,value,img,defaultValue}) => {
    return <div className="paymentitem">
      <AppInput
        type="radio"
        title={name}
        name="paymentmethod"
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={value}
        defaultChecked={defaultValue}
      />
      <img src={img} alt={name}/>
    </div>
  })

  function handleChange(event) {
    const {name, value} = event.target
    setBillingState(prev => ({
      ...prev,
      [name]:value
    })) 
  }
  function allowOrder() {
    if(billingState.fname &&  billingState.lname && billingState.address && billingState.aptunit &&
      billingState.city && billingState.provstate && billingState.country && billingState.postcode &&
      billingState.phone && billingState.email) {
      return true
    }
    else return false
  }
  function placeOrder() {
    if(allowOrder())
      console.log('Order has been placed')
    else 
      window.alert('Please fill in all billing details to proceed.')
  }

  useEffect(() => {
    showCart&&setShowCart(false) 
  },[]) 

  useEffect(() => { 
    setLocateUser(true)  
    console.log('User is in: '+userLocation.region) 
    console.log(taxRate)  
    console.log(billingState)
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
            <div>
              <AppInput title="Create an Account?" type="checkbox" className="checkinput" />
            </div>
            <h3 className="titles">Shipping Address</h3>
            <div>
              <AppInput title="Different Shipping Adress" type="checkbox" className="checkinput" />
            </div>
            <label className="apptextarea">
              <h6>Order Notes</h6>
              <textarea placeholder="Delivery instructions, notes about order..."/>
            </label>
          </div>
          <div className="ordercont">
            <h3 className="titles">Order Details</h3>
            <div className="checkoutrowscont">
              {caritemrows}
            </div>
            <div className="cartsubtotal checkoutitem">
              <h5>Order Subtotal</h5>
              <h4>{currencyFormat.format(cartSubtotal)}</h4>
            </div>
            <div className="shipping checkoutitem checkboxitem">
              <h6>
                <span>Shipping</span>
              </h6>
              <div className="shipoptions">{shipoptions}</div>
            </div>
            <div className="cartsubtotal checkoutitem">
              <h5>Taxes ({percentFormat.format(taxRate)})</h5>
              <span>{currencyFormat.format(cartSubtotal*taxRate)}</span>
            </div>
            <div className="carttotal checkoutitem">
              <h3>Order Total</h3>
              <h3>{currencyFormat.format(orderTotal)}</h3>
            </div>
            <div className="checkoutitem checkboxitem paymentsrow">
              {paymentInputs}
            </div>
            <div className="checkoutitem paycont">
              <AppButton 
                title="Place Order"
                onClick={() => placeOrder()}
                className={`placeorderbtn ${allowOrder()?"enabled":""}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}