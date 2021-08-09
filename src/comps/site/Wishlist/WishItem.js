import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {db} from '../../common/Fire'
import referProduct from '../../common/referProduct'
import { StoreContext } from '../../common/StoreContext'
import '../../common/styles/ProductTable.css'
import {updateDB} from '../../common/services/CrudDb'

export default function WishItem(props) {

  const {currencyFormat, allProducts} = useContext(StoreContext)
  const {id, name, imgs, price, sizes} = referProduct(allProducts,props.el)
  const {wishlist, user, myUser} = props
  const [showOpts, setShowOpts] = useState(false)

  function removeItem() {
    wishlist.forEach(el => {
      if(el===id) {
        let itemindex = wishlist.indexOf(el)
        wishlist.splice(itemindex,1)
      } 
    }) 
    updateDB('users', user.uid, {userinfo: myUser})
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
          sizes.some(x => x.colors.some(x => x.stock > 0))?<small>In Stock</small>:<small>Out of Stock</small>
        } 
      </div>
      <div className="actionsbox">
        <div className="optsbox" onClick={() => setShowOpts(prev => !prev)}>
          <i className="far fa-ellipsis-h"></i>
        </div>
        <div className={`optionscont ${showOpts?"show":""}`} onClick={() => setShowOpts(prev => !prev)}>
          <h6 onClick={() => removeItem()}>Delete</h6>
          <h6>Send Item</h6>
        </div>
      </div>
    </div>
  )
}