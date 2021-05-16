import React, { useContext, useEffect, useState } from 'react'
import '../common/styles/ProductTable.css'
import AddToCart from '../common/AddToCart'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'
import SaveLater from '../common/SaveLater'
import EditProduct from '../common/EditProduct'
import refProd from '../../common/referProduct'

export default function CartItem(props) {
  
  const {currencyFormat, myUser, user, allProducts} = useContext(StoreContext)
  const {id, name, imgs, price} = refProd(allProducts,props.el.id)
  const {chosenColor, chosenSize, units} = props.el
  const [showOpts, setShowOpts] = useState(false)
  const cart = myUser?.cart
  const savedlater = myUser?.savedlater

  function removeItem() {
    cart.forEach(el => {
      if(el.id===id) {
        let itemindex = cart.indexOf(el)
        cart.splice(itemindex,1)
      } 
    })
    db.collection('users').doc(user.uid).update({
      userinfo: myUser
    })
  }

  useEffect(() => {
    window.onclick = () => {
      showOpts&&setShowOpts(false)
    }
  },[showOpts])

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
        <AddToCart el={props.el} dropdown={false}/>
      </div>
      <div className="small">
        <h5>{currencyFormat.format(price*units)}</h5>
      </div>
      <div className="actionsbox">
        <div className="optsbox" onClick={() => setShowOpts(prev => !prev)}>
          <i className="far fa-ellipsis-h"></i>
        </div>
        <div className={`optionscont ${showOpts?"show":""}`} onClick={() => setShowOpts(prev => !prev)}>
          <EditProduct />
          <h6 onClick={() => removeItem()}>Delete</h6>
          <SaveLater el={props.el} cart={cart} savedlater={savedlater} />
        </div>
      </div>
    </div>
  )
}