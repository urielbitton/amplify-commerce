import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'
import './styles/AddToCart.css'
import refProd from '../../common/referProduct'

export default function AddToCart(props) {  
  
  const {myUser, setShowCart, user, allProducts} = useContext(StoreContext)
  const {id} = refProd(allProducts,props.el.id)
  const {stocksLeft, subid, chosenColor, chosenSize, className, small, dropdown=true} = props
  const cart = myUser?.cart
  const productunits = cart?.find(el => el.subid === subid)?.units
  const cartitem = cart?.find(el => el.subid === subid) 
   
  function addToCart() {
    if(!cart?.find(el => el.subid === subid)) {
      cart.push({ 
        units: 1,  
        chosenColor,
        chosenSize,
        id,
        subid: id+chosenSize+chosenColor
      }) 
      db.collection('users').doc(user.uid).update({ 
        userinfo: myUser
      }).then(res => dropdown&&setShowCart(true))
    }
  }
  function addUnits() {
    if(cartitem.units < stocksLeft) {
      cartitem.units = cartitem.units + 1
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => dropdown&&setShowCart(true))
    }
  }
  function subUnits() {
    if(cartitem.units <= 1) { 
      cart.forEach(el => {
        if(el.subid===subid) {
          let itemindex = cart.indexOf(el)
          cart.splice(itemindex,1)
        } 
      })
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => dropdown&&setShowCart(true))
    }
    else if(cartitem.units > 0) {
      cartitem.units = cartitem.units - 1
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => dropdown&&setShowCart(true))
    }
  }

  return (
    !cart?.find(el => el.subid === subid)?
    <div 
      className={`addtocartbtn ${stocksLeft<1?"disabled":""} ${className}`}
      onClick={(e) => {stocksLeft>0&&addToCart();e.stopPropagation()}}
    >
      <small className={stocksLeft<1?"disabled":""}> 
        {!small?"Add to Cart":<i className="fal fa-shopping-cart"></i>}
      </small>
    </div>:
    <div className="produnitcontrol" onClick={(e) => e.stopPropagation()}>
      <div onClick={() => subUnits()} title="Remove 1 unit"><i className="fal fa-minus"></i></div>
      <div className="productunits">{productunits}</div>
      <div onClick={() => addUnits()} title="Add 1 unit"><i className="fal fa-plus"></i></div>
    </div>
  )
}