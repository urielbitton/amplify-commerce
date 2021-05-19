import React, { useContext } from 'react'
import refProd from '../../common/referProduct'
import { StoreContext } from '../../common/StoreContext'
import {colorConverter, sizeConverter} from '../../common/UtilityFuncs'

export default function CheckoutItem(props) {

  const {allProducts, currencyFormat} = useContext(StoreContext)
  const {name, imgs, price, sizes} = refProd(allProducts,props.el.id)
  const {id, subid, units, chosenColor, chosenSize} = props.el

  return (
    <div className="checkoutitem">
      <div>
        <h5>{name} x {units}</h5>
        <small><span>Size:</span> {sizeConverter(chosenSize)}, <span>Color:</span> {colorConverter(chosenColor) || chosenColor}</small>  
      </div>
      <span>{currencyFormat.format(price*units)}</span>
    </div>
  )
}