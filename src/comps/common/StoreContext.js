import React, {createContext, useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const user = firebase.auth().currentUser
 
  return (
    <StoreContext.Provider value={{ 
      
    }}>
      {props.children}  
    </StoreContext.Provider>
  )  

} 

export default StoreContextProvider