import React from 'react'
import '../common/styles/ProductTable.css'
import AddToCart from '../common/AddToCart'

export default function CartItem(props) {
  
  const {id, name, imgs, price} = props.el.item
  const {chosenColor, chosenSize, units} = props.el
  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}) 

  function removeItem() {
    
  }

  return (
    <div className="cartitem proditem">
      <div>
        <img src={imgs[0]} alt={name} />
      </div>
      <div className="prodname">
        <h5>{name}</h5>
        <h6>Color: {chosenColor}</h6>
        <h6>Size: {chosenSize}</h6>
      </div> 
      <div> 
        <h5>{currencyFormat.format(price)}</h5>
      </div>
      <div>
        <AddToCart el={props.el.item} />
      </div>
      <div>
        <h5>{currencyFormat.format(price*units)}</h5>
      </div>
      <div className="delete" onClick={() => removeItem()}>
        <i className="fal fa-times"></i>
      </div> 
    </div>
  )
}