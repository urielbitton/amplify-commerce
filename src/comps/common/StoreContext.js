import React, {createContext, useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const user = firebase.auth().currentUser

  const [slideNav, setSlideNav] = useState(false)
  const [colorFilter, setColorFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')

  const [allProducts, setAllProducts] = useState([])
  const [myUser, setMyUser] = useState([])
 
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
      slideNav, setSlideNav, colorFilter, setColorFilter, priceFilter, setPriceFilter, sizeFilter, setSizeFilter,
      ratingFilter, setRatingFilter,
      allProducts, myUser, setMyUser
    }}>
      {props.children}  
    </StoreContext.Provider>
  )  

} 

export default StoreContextProvider