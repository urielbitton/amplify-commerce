import React, {useContext, useEffect, useState} from 'react'
import PageBanner from '../common/PageBanner'
import {StoreContext} from '../../common/StoreContext'
import './styles/Checkout.css'
import { Link, useHistory } from 'react-router-dom'
import {AppInput} from '../../common/AppInputs'
import CheckoutItem from './CheckoutItem'
import AppButton from '../common/AppButton'
import { PayPalButton } from 'react-paypal-button-v2'
import CreateOrder from './CreateOrder'
import { db } from '../../common/Fire'
import firebase from 'firebase'
import AddressBox from '../client/AddressBox'
import Loader from '../../common/Loader'

export default function Checkout() {

  const { showCart, setShowCart, billingState, setBillingState, shippingState, setShippingState, countries,
    myUser, cartSubtotal, currencyFormat, percentFormat, shippingMethods, paymentMethods, setLocateUser, 
    userLocation, provinces} = useContext(StoreContext)
  const cart = myUser?.cart
  const [chosenShipping, setChosenShipping] = useState({name: "regular",cost: 3.99})
  const [paymentDetails, setPaymentDetails] = useState({method:'stripe',email:'',cardnumber:''})
  const [taxRate, setTaxRate] = useState(0.15) 
  const [successPaid, setSuccessPaid] = useState(false)
  const [failPaid, setFailPaid] = useState(false)
  const [paySwitch, setPaySwitch] = useState(0)
  const orderTotal = cartSubtotal + (cartSubtotal*taxRate) + chosenShipping.cost
  const clientid = "ASTQpkv9Y3mQ5-YBd20q0jMb9-SJr_TvUl_nhXu5h3C7xl0wumYgdqpSYIL6Vd__56oB7Slag0n2HA_r"
  const history = useHistory()
  const user = firebase.auth().currentUser
    
  const provincesOpts = provinces?.map(({name,rate}) => {
    return <option value={name} selected={userLocation.region===name}>
      {name} 
    </option>
  }) 
  const countriesOpts = countries?.map(({name,value}) => {
    return <option value={name} selected={userLocation.country===name}>
      {name}
    </option>  
  })
  const billingarr = [
    {title: 'First Name *', name: 'fname', halfwidth: true},
    {title: 'Last Name *', name: 'lname', halfwidth: true},
    {title: 'Company Name', name: 'company'},
    {title: 'Street Address *', name: 'address'},
    {title: 'Apartment/Unit', name: 'aptunit'},
    {title: 'City *', name: 'city'},
    {title: 'Postal Code/ZIP *', name: 'postcode'},
    {title: 'Phone Number *', name: 'phone'},
    {title: 'Email Address *', name: 'email'},
  ]
  const billingInputs = billingarr.map(({title,name,halfwidth}) => {
    return <AppInput 
      title={title} 
      name={name}
      onChange={(e) => handleChange(e)}
      className={halfwidth?"halfwidth":""}
    />
  })
  const caritemrows = cart?.map(el => {
    return <CheckoutItem el={el} key={el.id}/>
  })
  const shipoptions = shippingMethods?.map(({name,price,value,defaultvalue}, i) => {
    return <AppInput
        type="radio"
        title={<>{name} <span>{`(${currencyFormat.format(price)})`}</span></>}
        name="shippingmethod"
        onChange={() => setChosenShipping({ name: value, cost: price })}
        value={chosenShipping}
        defaultChecked={defaultvalue}
        key={i}
      />
    }
  )
  const paymentInputs = paymentMethods.map(({name,value,img,defaultValue},i) => {
    return <div className="paymentitem" key={i}>
      <AppInput
        type="radio"
        title={name}
        name="paymentmethod"
        onChange={(e) => {setPaymentDetails({method:'paypal',email:'urielas1@gmail.com',cardnumber:''});setPaySwitch(i)}}
        value={value}
        defaultChecked={defaultValue}
      />
      <img src={img} alt={name}/>
    </div>
  })
  const addressboxrow = myUser?.addresses
  ?.filter(x => x.primary)
  .map(el => {
    return <AddressBox el={el} />
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
    if(allowOrder()) {
      
    }
    else 
      window.alert('Please fill in all billing details to proceed.')
  }
  function startOrder() {
    const orderid = db.collection('orders').doc().id
    const customer = {
      id: user.uid,
      name: myUser.fullname,
      email: myUser.email,
      phone: myUser.phone,
      profimg: myUser.profimg,
      city: myUser.city,
      country: myUser.country,
      provstate: myUser.provstate
    }
    CreateOrder(orderid, cart, customer, cartSubtotal, orderTotal, chosenShipping,
      paymentDetails, taxRate, billingState, shippingState, myUser)
    setBillingState({})
    history.push('/order-confirm')
  }

  useEffect(() => {
    showCart&&setShowCart(false) 
  },[])  

  useEffect(() => { 
    setLocateUser(true)  
    console.log('User is in: '+userLocation.region) 
    setBillingState({
      provstate: userLocation.region,
      country: userLocation.country
    })  
  },[userLocation])   

  return (
    <div className="checkoutpage">
      <PageBanner title="Checkout" />
      <div className="grid xgrid">
        { !myUser&&
          <div className="registercont">
            <h6>Returning Customer?<Link to="/login">Login Here</Link></h6>
          </div>
        }
        <div className="checkoutcont">
          <form className="checkoutform" onSubmit={(e) => e.preventDefault()} autoComplete>
            <h3 className="titles">Billing Details</h3>
            {
              !myUser?.addresses?.length?
              <>
              {billingInputs.slice(0,6)}
              <label className="appselect">
                <h6>Province/State *</h6>
                <select onChange={(e) => setBillingState(prev => ({...prev,provstate:e.target.value}))}>
                  {provincesOpts}
                </select>
              </label> 
              <label className="appselect"> 
                <h6>Country *</h6>
                <select onChange={(e) => setBillingState(prev => ({...prev,country:e.target.value}))}>
                  {countriesOpts} 
                </select> 
              </label> 
              {billingInputs.slice(6)} 
              </>:
              addressboxrow
            }
            {
              !myUser?.addresses?.length&&
              <div>
                <AppInput title="Create an Account?" type="checkbox" className="checkinput" />
              </div>
            }
            <h3 className="titles">Shipping Address</h3>
            <div>
              <AppInput title="Different Shipping Adress" type="checkbox" className="checkinput" />
            </div>
            <label className="apptextarea">
              <h6>Order Notes</h6>
              <textarea placeholder="Delivery instructions, notes about order..."/>
            </label>
          </form>
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
              <div className={`paypalcont ${paySwitch===1?"show":""}`}>
                <PayPalButton
                  amount={0.01} 
                  onSuccess={(details, data) =>  {startOrder();setSuccessPaid(true)}}
                  onError={() => {setFailPaid(true);window.alert('The transaction was not successful, please try again later.')}}
                  options={{ clientId: clientid }}
                />
              </div>
            </div>
            <div className="checkoutitem paycont">
              {
                paySwitch===0&&
                <AppButton 
                title="Place Order"
                onClick={() => placeOrder()}
                className={`placeorderbtn ${allowOrder()?"enabled":""}`}
              />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}