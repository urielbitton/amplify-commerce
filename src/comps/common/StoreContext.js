import React, {createContext, useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const user = firebase.auth().currentUser
  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'})
  const [allProducts, setAllProducts] = useState([])
  const [myUser, setMyUser] = useState([])
 
  const [slideNav, setSlideNav] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const cartTotal = currencyFormat.format(myUser?.cart?.reduce((a, b) => a + (b.item.price*b.units), 0))

  const [colorFilter, setColorFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
 
  useEffect(() => {
    db.collection('products').doc('allproducts').onSnapshot(snap => {
      setAllProducts(snap.data().allproducts) 
    }) 
  },[]) 
  useEffect(() => {
    user&&db.collection('users').doc(user.uid).onSnapshot(snap => {
      setMyUser(snap.data().userinfo)
    })
  },[user])

  return (
    <StoreContext.Provider value={{ 
      slideNav, setSlideNav, showCart, setShowCart, cartTotal, colorFilter, setColorFilter, priceFilter,
      setPriceFilter, sizeFilter, setSizeFilter, ratingFilter, setRatingFilter,
      allProducts, myUser, setMyUser, user
    }}>
      {props.children}  
    </StoreContext.Provider>
  )  

} 

export default StoreContextProvider