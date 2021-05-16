import React, { useContext, useState } from 'react'
import AppButton from './AppButton'
import {StoreContext} from '../../common/StoreContext'

export default function QuickShopBtn(props) {

  const {setShowQuickShop, setQuickShopProd} = useContext(StoreContext)
  const {product} = props

  return (
    <AppButton 
      title="Quick Shop"
      onClick={() => {setQuickShopProd(product);setShowQuickShop(true)}}
      className="quickshopbtn"
    />
  )
}