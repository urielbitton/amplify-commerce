import React, { useContext } from 'react'
import '../common/styles/ProductTable.css'
import AddToCart from '../common/AddToCart'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'

export default function CartItem(props) {
  
  const {currencyFormat, myUser, user} = useContext(StoreContext)
  const {id, name, imgs, price} = props.el.item
  const {chosenColor, chosenSize, units} = props.el
  const cart = myUser?.cart

  function removeItem() {
    cart.forEach(el => {
      if(el.item.id===id) {
        let itemindex = cart.indexOf(el)
        cart.splice(itemindex,1)
      } 
    })
    db.collection('users').doc(user.uid).update({
      userinfo: myUser
    })
  }

  return (
    <div className="cartitem proditem">
      <div className="small">
        <img src={imgs[0]} alt={name} />
      </div>
      <div className="prodname">
        <h5>{name}</h5>
        <h6>Color: {chosenColor}</h6>
        <h6>Size: {chosenSize}</h6>
      </div> 
      <div className="small"> 
        <h5>{currencyFormat.format(price)}</h5>
      </div>
      <div>
        <AddToCart el={props.el.item} dropdown={false}/>
      </div>
      <div className="small">
        <h5>{currencyFormat.format(price*units)}</h5>
      </div>
      <div className="delete" onClick={() => removeItem()}>
        <i className="fal fa-times"></i>
      </div> 
    </div>
  )
}