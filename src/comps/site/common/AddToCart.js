import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import firebase from 'firebase'
import {db} from '../../common/Fire'
import './styles/AddToCart.css'

export default function AddToCart(props) {
  
  const {myUser, setShowCart} = useContext(StoreContext)
  const {id, instock, stock, className, small} = props.el
  const cart = myUser?.cart
  const user = firebase.auth().currentUser
  const productunits = cart?.filter(el => el?.item?.id===id)[0]?.units
   
  function addToCart() {
    if(!cart?.find(el => el.item.id === id)) {
      cart.push({
        units: 1,  
        item: props.el
      }) 
      db.collection('users').doc(user.uid).update({ 
        userinfo: myUser
      }).then(res => setShowCart(true))
    }
  }
  function addUnits() {
    let cartitem = cart?.filter(el => el.item.id===id)
    if(cartitem[0].units < stock) {
      cartitem[0].units = cartitem[0].units + 1
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => setShowCart(true))
    }
  }
  function subUnits() {
    let cartitem = cart?.filter(el => el.item.id===id)
    if(cartitem[0].units <= 1) { 
      cart.forEach(el => {
        if(el.item.id===id) {
          let itemindex = cart.indexOf(el)
          cart.splice(itemindex,1)
        } 
      })
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => setShowCart(true))
    }
    else if(cartitem[0].units > 0) {
      cartitem[0].units = cartitem[0].units - 1
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => setShowCart(true))
    }
  }

  return (
    !cart?.find(el => el.item.id === id)?
    <div 
      className={`addtocartbtn ${!instock&&"disabled"} ${className}`}
      onClick={(e) => {instock&&addToCart();e.stopPropagation()}}
    >
      <small>
        {!small?"Add to Cart":<i className="fal fa-shopping-cart"></i>}
      </small>
    </div>:
    <div className="produnitcontrol" onClick={(e) => e.stopPropagation()}>
      <div onClick={() => subUnits()}><i className="fal fa-minus"></i></div>
      <div className="productunits">{productunits}</div>
      <div onClick={() => addUnits()}><i className="fal fa-plus"></i></div>
    </div>
  )
}