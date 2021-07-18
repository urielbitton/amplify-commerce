import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'
import './styles/AddToCart.css'
import refProd from '../../common/referProduct'
import firebase from 'firebase'

export default function AddToCart(props) {  
  
  const {cart, setCart, setShowCart, user, allProducts} = useContext(StoreContext)
  const {id} = refProd(allProducts,props.el.id)
  const {stocksLeft, subid, chosenColor, chosenSize, className, small, dropdown=true} = props
  const productunits = cart?.find(el => el.subid === subid)?.units
  const cartitem = cart?.find(el => el.subid === subid) 
   
  function addToCart() {
    const cartObj = { 
      units: 1,  
      chosenColor,
      chosenSize,
      id,
      subid: id+chosenSize+chosenColor
    }
    if(!cart?.find(el => el.subid === subid)) {
      if(user) {
        db.collection('users').doc(user.uid).update({ 
          'userinfo.cart': firebase.firestore.FieldValue.arrayUnion(cartObj)
        }).then(res => dropdown&&setShowCart(true))
      }
      else {
        setCart(prev => [...prev,cartObj])
      } 
    }
  } 
  function addUnits() {
    if(cartitem.units < stocksLeft) {
      if(user) {
        cart.forEach(el => {
          if(el.subid === subid) {
            let itemindex = cart.indexOf(el)
            cart[itemindex].units = cartitem.units + 1
          }
        })
        db.collection('users').doc(user.uid).update({
          'userinfo.cart': cart
        }).then(res => dropdown&&setShowCart(true))
      }
      else {
        setCart(prev => prev.map(el => {
          return el.subid === subid? {
            ...el, units: cartitem.units + 1
          }: el
        }))
      }
    }
  } 
  function subUnits() {
    if(cartitem.units <= 1) { 
      if(user) {
        cart.forEach(el => {
          if(el.subid===subid) {
            let itemindex = cart.indexOf(el)
            cart.splice(itemindex,1)
          } 
        })
      }
      else {
        setCart(prev => {
          return prev.filter(x => !(x.subid === subid))
        })
      }
    }
    else if(cartitem.units > 1) {
      if(user) {
        cart.forEach(el => {
          if(el.subid === subid) {
            let itemindex = cart.indexOf(el)
            cart[itemindex].units = cartitem.units - 1
          }
        })
      }
      else {
        setCart(prev => prev.map(el => {
          return el.subid === subid? {
            ...el, units: cartitem.units - 1
          }: el
        }))
      }
    }
    user&&db.collection('users').doc(user.uid).update({
      'userinfo.cart': cart
    }).then(res => dropdown&&setShowCart(true))
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