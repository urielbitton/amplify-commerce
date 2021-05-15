import React, {useContext, useEffect} from 'react'
import PageBanner from '../common/PageBanner'
import {StoreContext} from '../../common/StoreContext'

export default function Checkout() {

  const {showCart, setShowCart} = useContext(StoreContext)

  useEffect(() => {
    showCart&&setShowCart(false)
  },[]) 

  return (
    <div className="checkoutpage">
      <PageBanner title="Checkout" />
      <div className="grid xgrid">
        
      </div>
    </div>
  )
}