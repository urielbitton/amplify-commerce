import React, {createContext, useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import refProd from './referProduct'
import axios from 'axios'
import SalesTax from 'sales-tax'
import { convertProvinceCode, getOrdersById, getReviewsById, getTransactionsById } from './UtilityFuncs'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const user = firebase.auth().currentUser
  const [allProducts, setAllProducts] = useState([])
  const [allCustomers, setAllCustomers] = useState([])
  const [allUsers, setAllUsers] = useState([])
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
  const [myReviews, setMyReviews] = useState([])
  const [myTransactions, setMyTransactions] = useState([])
  const [myChat, setMyChat] = useState({})
  const [allOrders, setAllOrders] = useState([])
  const [allStats, setAllStats] = useState({})
  const [allTransactions, setAllTransactions] = useState([])
  const [allReviews, setAllReviews] = useState([])
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
  const [darkMode, setDarkMode] = useState(false)
  const [highSellersLimit, setHighSellersLimit] = useState(5)
  const [recentSellersLimit, setRecentSellersLimit] = useState(5)
  const [recentOrdersLimit, setRecentOrdersLimit] = useState(5)
  const [editProdMode, setEditProdMode] = useState(false)
  const [editCoupMode, setEditCoupMode] = useState(false)
  const [editShipMode, setEditShipMode] = useState(false)
  const [editOrdMode, setEditOrdMode] = useState(false)
  const [editCustMode, setEditCustMode] = useState(false)
  const [editCampMode, setEditCampMode] = useState(false)
  const [allCoupons, setAllCoupons] = useState([])
  const [allShipping, setAllShipping] = useState([])
  const [showAnaTips, setShowAnaTips] = useState(true)
  const [adminTaxRate, setAdminTaxRate] = useState(0) 
  const [allCampaigns, setAllCampaigns] = useState([])
  const [allChats, setAllChats] = useState([])

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
  const [sizesOpts, setSizesOpts] = useState([])
  const [colorsOpts, setColorsOpts] = useState([])
  const [notifs, setNotifs] = useState([])

  useEffect(() => {
    if(locateUser) {
      axios({
        method: 'get', 
        url: `https://extreme-ip-lookup.com/json/`,
      }).then((res) => setUserLocation(res.data))
    }
  },[locateUser])
  
  useEffect(() => { 
    SalesTax.getSalesTax(selectedCountry,convertProvinceCode(provinceChoices, selectedProvince)).then(tax=>{
      setTaxRate(tax.rate)
     })
  },[selectedProvince, selectedCountry]) 
  
  useEffect(() => {
    db.collection('products').onSnapshot(snap => {
      let prodsArr = [] 
      snap.forEach(doc => prodsArr.push(doc.data()) )
      setAllProducts(prodsArr) 
    })
    db.collection('orders').orderBy('orderDateCreated','desc').onSnapshot(snap => {
      let ordersArr = []  
      snap.forEach(doc => ordersArr.push(doc.data()))
      setAllOrders(ordersArr)         
    })  
    db.collection('coupons').onSnapshot(snap => {
      let coupsArr = [] 
      snap.forEach(doc => coupsArr.push(doc.data()))
      setAllCoupons(coupsArr)  
    })
    db.collection('shipping').onSnapshot(snap => {
      let shipArr = [] 
      snap.forEach(doc => shipArr.push(doc.data()))
      setAllShipping(shipArr) 
    }) 
    db.collection('stats').doc('allstats').onSnapshot(snap => {
      setAllStats(snap.data()?.allstats)
    })
    db.collection('customers').onSnapshot(snap => {
      const custArr = []
      snap.forEach(el => custArr.push(el.data()) ) 
      setAllCustomers(custArr)
    }) 
    db.collection('transactions').onSnapshot(snap => {
      const transArr = []
      snap.forEach(el => transArr.push(el.data())) 
      setAllTransactions(transArr)
    }) 
    db.collection('reviews').onSnapshot(snap => {
      const revsArr = [] 
      snap.forEach(doc => revsArr.push(doc.data()))
      setAllReviews(revsArr) 
    })
    db.collection('users').onSnapshot(snap => {
      const usersArr = [] 
      snap.forEach(doc => usersArr.push(doc.data().userinfo))
      setAllUsers(usersArr) 
    })
    db.collection('admin').doc('storeSettings').onSnapshot(snap => {
      setAdminTaxRate(snap.data()?.storesettings.adminTaxRate)
    })
    db.collection('admin').doc('storeSettings').onSnapshot(snap => {
      setSizesOpts(snap.data()?.storesettings.sizeopts)  
      setColorsOpts(snap.data()?.storesettings.coloropts) 
    })
    db.collection('chats').orderBy('chatInfo.dateModified','desc').onSnapshot(snap => {
      const chatsArr = []
      snap.forEach(doc => chatsArr.push(doc.data()))
      setAllChats(chatsArr)
    })
  },[user, auser])  

  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.uid).onSnapshot(snap => {
        setMyUser(snap.data()?.userinfo)
      })
      db.collection('chats').doc(user.uid).onSnapshot(snap => {
        setMyChat(snap.data())
      })
      db.collection('users').doc(user.uid).onSnapshot(snap => {
        setCart(snap.data()?.userinfo.cart)
      })
      db.collection('admin/marketing/campaigns').orderBy('dateCreated','desc').onSnapshot(snap => {
        let campArr = []
        snap.forEach(el => {
          campArr.push(el.data())
        })
        setAllCampaigns(campArr) 
      })
      getOrdersById(user.uid, setMyOrders) 
      getReviewsById(user.uid, setMyReviews)
      getTransactionsById(user.uid, setMyTransactions)
    }
  },[user]) 

 
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
      showSearch, setShowSearch, cart, setCart, darkMode, setDarkMode, allStats, 
      highSellersLimit, setHighSellersLimit, recentSellersLimit, setRecentSellersLimit, 
      recentOrdersLimit, setRecentOrdersLimit, editProdMode, setEditProdMode, sizesOpts, colorsOpts,
      editCoupMode, setEditCoupMode, editShipMode, setEditShipMode, allCoupons, setAllCoupons,
      allShipping, setAllShipping, editOrdMode, setEditOrdMode, allCustomers, setAllCustomers,
      notifs, setNotifs, allTransactions, setAllTransactions, editCustMode, setEditCustMode, 
      showAnaTips, setShowAnaTips, adminTaxRate, setAdminTaxRate, allReviews, setAllReviews, myReviews, setMyReviews,
      myTransactions, setMyTransactions, allUsers, setAllUsers, allCampaigns, setAllCampaigns, 
      editCampMode, setEditCampMode, allChats, setAllChats, myChat, setMyChat
    }}>
      {props.children}  
    </StoreContext.Provider>
  )  

} 

export default StoreContextProvider