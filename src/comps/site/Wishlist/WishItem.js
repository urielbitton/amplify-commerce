import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {db} from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import AddToCart from '../common/AddToCart'
import '../common/styles/ProductTable.css'

export default function WishItem(props) {

  const {currencyFormat} = useContext(StoreContext)
  const {id, name, imgs, price, instock} = props.el
  const {wishlist, user, myUser} = props
  const [showOpts, setShowOpts] = useState(false)

  function removeItem() {
    wishlist.forEach(el => {
      if(el.id===id) {
        let itemindex = wishlist.indexOf(el)
        wishlist.splice(itemindex,1)
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
    <div className="wishitem proditem">
      <div className="small"><img src={imgs[0]} alt={name} /></div>
      <div><Link to={`/product/${id}`}><h6>{name}</h6></Link></div>
      <div><h6>{currencyFormat.format(price)}</h6></div>
      <div className="addcartdiv">
        {
          instock?
          <AddToCart el={props.el} />:
          <small>Out of Stock</small>
        }
      </div>
      <div className="actionsbox">
        <div className="optsbox" onClick={() => setShowOpts(prev => !prev)}>
          <i className="far fa-ellipsis-h"></i>
        </div>
        <div className={`optionscont ${showOpts?"show":""}`} onClick={() => setShowOpts(prev => !prev)}>
          <h6 onClick={() => removeItem()}>Delete</h6>
        </div>
      </div>
    </div>
  )
}