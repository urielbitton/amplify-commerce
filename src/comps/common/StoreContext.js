import React, {createContext, useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import refProd from './referProduct'
import axios from 'axios'
import csc from 'country-state-city'
import SalesTax from 'sales-tax'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const user = firebase.auth().currentUser
  const [allProducts, setAllProducts] = useState([])
  const [myUser, setMyUser] = useState({})
  const [cart, setCart] = useState([])
  const [auser, setAUser] = useState('')

  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'})
  const percentFormat = new Intl.NumberFormat('en-CA', {style: 'percent'})
  const numberFormat = new Intl.NumberFormat('en-CA')
  const cartSubtotal = cart?.length?cart?.reduce((a, b) => a + (refProd(allProducts,b?.id)?.price*b?.units), 0):0

  const [locateUser, setLocateUser] = useState(false)
  const [userLocation, setUserLocation] = useState({})
  const [slideNav, setSlideNav] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [myOrders, setMyOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [showQuickShop, setShowQuickShop] = useState(false)
  const [showEditProd, setShowEditProd] = useState(false)
  const [colorFilter, setColorFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [categFilter, setCategFilter] = useState('all')
  const [showTrackCont, setShowTrackCont] = useState(false)
  const [provinceChoices, setProvinceChoices] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [taxRate, setTaxRate] = useState(0)
  const [showSearch, setShowSearch] = useState(false)

  const [quickProduct, setQuickProduct] = useState({
    id: '', 
    name: '',
    imgs: [],
    price: 0,
    sizes: [{name: '',colors:[]}],
    descript: ''
  })
  const [editProduct, setEditProduct] = useState({
    id: '',
    img: '',
    name: '',
    chosenSize: '',
    chosenColor: '',
    units: 0,
    sizes: []
  }) 
  const [shippingMethods, setShippingMethods] = useState([
    {name: 'Express Shipping', price: 6.99, value: 'express'},
    {name: 'Standard Shipping', price: 3.99, value: 'standard', defaultvalue:true},
    {name: 'Local Pickup', price: 0, value: 'pickup'},
  ])
  const [billingState, setBillingState] = useState({}) 
  const [shippingState, setShippingState] = useState({})
  const [paymentMethods, setPaymentMethods] = useState([
    {name: 'Credit/Debit Card', value: 'stripe', img: 'https://i.imgur.com/NK5CCXP.png', defaultValue: true},
    {name: 'PayPal', value: 'paypal', img: 'https://i.imgur.com/6fFDmjU.png'},
  ])
  const [trackingDetails, setTrackingDetails] = useState({
    img: '',
    trackingNum: '', 
    products: [{id:''}],
    estDelivery: '',
    carrier: '',
    shippingMethod: '',
    updates: [],
    orderStatus: ''
  })
  const expiryMonths = [1,2,3,4,5,6,7,8,9,10,11,12]
  const expiryYears =  Array.apply(null, {length: 15}).map((el,i) => {
    return new Date().getFullYear() + i
  })

  useEffect(() => {
    db.collection('products').doc('allproducts').onSnapshot(snap => {
      setAllProducts(snap?.data()?.allproducts) 
    })  
    db.collection('orders').onSnapshot(snap => {
      let allorders = []
      snap.forEach(el => {
        if(el.data().allorders.length)
          allorders.push(el.data())
      })
      setAllOrders(...allorders)
    })
  },[auser]) 
  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.uid).onSnapshot(snap => {
        setMyUser(snap?.data()?.userinfo)
      })
      db.collection('users').doc(user.uid).onSnapshot(snap => {
        setCart(snap?.data()?.userinfo.cart)
      })
      db.collection('orders').doc(user.uid).onSnapshot(snap => {
        setMyOrders(snap?.data()?.allorders) 
      })
    }
    else {
      localStorage.getItem('cart')
      setCart(JSON.parse(localStorage.getItem('cart')) || [])
    }
  },[user])
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])
  useEffect(() => {
    if(locateUser) {
      axios({
        method: 'get', 
        url: `https://extreme-ip-lookup.com/json/`,
      }).then((res) => {
        setUserLocation(res.data)
      })  
    }
  },[locateUser])
  useEffect(() => { 
    setProvinceChoices(csc.getStatesOfCountry(selectedCountry))
  },[selectedCountry, userLocation]) 
  useEffect(() => { 
    SalesTax.getSalesTax(selectedCountry,provinceChoices?.find(x => x.name===selectedProvince || x.isoCode===selectedProvince)?.isoCode).then(tax=>{
      setTaxRate(tax.rate)
     })
  },[selectedProvince, selectedCountry]) 
  
 
  return (
    <StoreContext.Provider value={{ 
      slideNav, setSlideNav, showCart, setShowCart, cartSubtotal, colorFilter, setColorFilter, priceFilter,
      setPriceFilter, sizeFilter, setSizeFilter, ratingFilter, setRatingFilter, categFilter, setCategFilter,
      allProducts, myUser, setMyUser, user, auser, setAUser, shippingMethods, currencyFormat, percentFormat,
      showQuickShop, setShowQuickShop, quickProduct, setQuickProduct, showEditProd, setShowEditProd,
      editProduct, setEditProduct, billingState, setBillingState, shippingState, setShippingState,
      paymentMethods, setPaymentMethods, locateUser, setLocateUser, userLocation, setUserLocation, 
      myOrders, setMyOrders, trackingDetails, setTrackingDetails, showTrackCont, setShowTrackCont, 
      provinceChoices, setProvinceChoices, taxRate, setTaxRate, selectedProvince, setSelectedProvince,
      selectedCountry, setSelectedCountry, expiryMonths, expiryYears, numberFormat, allOrders, setAllOrders,
      showSearch, setShowSearch, cart, setCart
    }}>
      {props.children}  
    </StoreContext.Provider>
  )  

} 

export default StoreContextProvider