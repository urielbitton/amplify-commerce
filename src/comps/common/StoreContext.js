import React, {createContext, useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const user = firebase.auth().currentUser

  const [slideNav, setSlideNav] = useState(false)

  const [allProducts, setAllProducts] = useState([])
 
  useEffect(() => {
    db.collection('products').doc('allproducts').onSnapshot(snap => {
      setAllProducts(snap.data().allproducts) 
    })
  },[])

  return (
    <StoreContext.Provider value={{ 
      slideNav, setSlideNav,
      allProducts
    }}>
      {props.children}  
    </StoreContext.Provider>
  )  

} 

export default StoreContextProvider