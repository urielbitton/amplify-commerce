import React, {createContext, useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import refProd from './referProduct'
import axios from 'axios'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const user = firebase.auth().currentUser
  const [allProducts, setAllProducts] = useState([])
  const [myUser, setMyUser] = useState([])
  const [auser, setAUser] = useState('')

  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'})
  const percentFormat = new Intl.NumberFormat('en-US', {style: 'percent'})
  const cartSubtotal = myUser?.cart?.reduce((a, b) => a + (refProd(allProducts,b.id).price*b.units), 0)

  const [locateUser, setLocateUser] = useState(false)
  const [userLocation, setUserLocation] = useState({})
  const [slideNav, setSlideNav] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showQuickShop, setShowQuickShop] = useState(false)
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
  const [showEditProd, setShowEditProd] = useState(false)

  const [colorFilter, setColorFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [categFilter, setCategFilter] = useState('all')
  const [shippingMethods, setShippingMethods] = useState([
    {name: 'Express Shipping', price: 6.99, value: 'express'},
    {name: 'Regular Shipping', price: 3.99, value: 'regular', defaultvalue:true},
    {name: 'Local Pickup', price: 0, value: 'pickup'},
  ])
  const [billingState, setBillingState] = useState({
 
  })
  const [shippingState, setShippingState] = useState({

  })
  const [countriesList, setCountriesList] = useState([
    {name: 'Canada', value: 'ca'},
    {name: 'United States', value: 'us'},
  ])
  const [paymentMethods, setPaymentMethods] = useState([
    {name: 'Credit/Debit Card', value: 'stripe', img: 'https://i.imgur.com/NK5CCXP.png', defaultValue: true},
    {name: 'PayPal', value: 'paypal', img: 'https://i.imgur.com/6fFDmjU.png'},
  ])
  const [provinces, setProvinces] = useState([
    {name: 'Alberta', rate: 5},
    {name: 'British Columbia', rate: 12},
    {name: 'Manitoba', rate: 12},
    {name: 'New Brunswick', rate: 15},
    {name: 'Newfoundland & Labrador', rate: 15},
    {name: 'Northwest Territories', rate: 5},
    {name: 'Nova Scotia', rate: 15},
    {name: 'Nunavut', rate: 5},
    {name: 'Ontario', rate: 13},
    {name: 'Prince Edward Island', rate: 15},
    {name: 'Quebec', rate: 15},
    {name: 'Saskatchewan', rate: 11},
    {name: 'Yukon', rate: 5},
  ])

  
  useEffect(() => {
    db.collection('products').doc('allproducts').onSnapshot(snap => {
      setAllProducts(snap?.data()?.allproducts) 
    })  
  },[auser]) 
  useEffect(() => {
    user&&db.collection('users').doc(user.uid).onSnapshot(snap => {
      setMyUser(snap?.data()?.userinfo)
    })
  },[user])
  
  useEffect(() => {
    if(locateUser) {
      axios({
        method: 'get', 
        url: `https://extreme-ip-lookup.com/json/`,
      }).then((res) => {
        console.log(res)
        setUserLocation(res.data)
      })
    }
  },[locateUser])

  return (
    <StoreContext.Provider value={{ 
      slideNav, setSlideNav, showCart, setShowCart, cartSubtotal, colorFilter, setColorFilter, priceFilter,
      setPriceFilter, sizeFilter, setSizeFilter, ratingFilter, setRatingFilter, categFilter, setCategFilter,
      allProducts, myUser, setMyUser, user, auser, setAUser, shippingMethods, currencyFormat, percentFormat,
      showQuickShop, setShowQuickShop, quickProduct, setQuickProduct, showEditProd, setShowEditProd,
      editProduct, setEditProduct, billingState, setBillingState, shippingState, setShippingState,
      countriesList, setCountriesList, paymentMethods, setPaymentMethods, locateUser, setLocateUser,
      userLocation, setUserLocation, provinces, setProvinces
    }}>
      {props.children}  
    </StoreContext.Provider>
  )  

} 

export default StoreContextProvider