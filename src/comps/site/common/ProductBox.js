import React, { useContext, useEffect } from 'react'
import './styles/ProductBox.css'
import Ratings from '../../common/Ratings'
import firebase from 'firebase'
import {db} from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import { Link, useHistory } from 'react-router-dom'

export default function ProductBox(props) {

  const {myUser, setShowCart} = useContext(StoreContext)
  const {id, name, price, rating, imgs, instock, colors, stock} = props.el
  const {className, small} = props
  const user = firebase.auth().currentUser
  const productunits = myUser?.cart?.filter(el => el.item.id===id)[0]?.units
  const history = useHistory()

  const colorsrow = colors?.map(el => {
    return <div className="colorcircle" style={{background:el}} key={el}></div>
  })

  function addToCart() {
    if(!myUser?.cart?.find(el => el.item.id === id)) {
      myUser.cart.push({
        units: 1, 
        item: props.el
      })
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => setShowCart(true))
    }
  }
  function addUnits() {
    let cartitem = myUser?.cart?.filter(el => el.item.id===id)
    if(cartitem[0].units < stock) {
      cartitem[0].units = cartitem[0].units + 1
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => setShowCart(true))
    }
  }
  function subUnits() {
    let cartitem = myUser?.cart?.filter(el => el.item.id===id)
    if(cartitem[0].units <= 1) { 
      myUser.cart.forEach(el => {
        if(el.item.id===id) {
          let itemindex = myUser.cart.indexOf(el)
          myUser.cart.splice(itemindex,1)
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
    <div className={`productbox ${className}`}>
      <div 
        className="imgcont" 
        style={{backgroundImage: `url(${imgs[0]})`}}
        onClick={() => history.push(`/product/${id}`)}
      >
        <div className="productactions" onClick={(e) => e.stopPropagation()}>
          <div>
            <i className="fal fa-heart"></i>
          </div>
          {
            !myUser?.cart?.find(el => el.item.id === id)?
            <div className={`addtocartbtn ${!instock&&"disabled"}`}>
              <small onClick={() => instock&&addToCart()}>
                {!small?"Add to Cart":<i className="fal fa-shopping-cart"></i>}
              </small>
            </div>:
            <div className="produnitcontrol">
              <div onClick={() => subUnits()}><i className="fal fa-minus"></i></div>
              <div className="productunits">{productunits}</div>
              <div onClick={() => addUnits()}><i className="fal fa-plus"></i></div>
            </div>
          }
          <div>
            <i className="fal fa-random"></i>
          </div>
        </div>
      </div>
      <div className="infocont">
        <div className="colorsbar">
          {colorsrow}
        </div>
        <div className="titlebar">
          <Link to={`/product/${id}`}><h6>{name}</h6></Link>
          <Ratings rating={rating} />
        </div>
        <div>
          <small>${price?.toFixed(2)}</small>
        </div>
        <div>
          {!instock&&<small className="outofstock">Out of Stock</small>}
        </div>
      </div>
    </div>
  )
}