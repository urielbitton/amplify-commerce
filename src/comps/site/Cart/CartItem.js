import React, { useContext, useEffect, useState } from 'react'
import '../../common/styles/ProductTable.css'
import AddToCart from '../common/AddToCart'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'
import SaveLater from '../common/SaveLater'
import EditProduct from '../common/EditProduct'
import refProd from '../../common/referProduct'
import {colorConverter} from '../../common/UtilityFuncs'
import { Link } from 'react-router-dom'

export default function CartItem(props) {
  
  const {currencyFormat, myUser, user, allProducts} = useContext(StoreContext)
  const {id, name, imgs, price, sizes} = refProd(allProducts,props.el.id)
  const {subid, chosenColor, chosenSize, units} = props.el
  const [showOpts, setShowOpts] = useState(false)
  const chosenSizeIndex = sizes.findIndex(x => x.name===chosenSize)
  const stocksLeft = sizes[chosenSizeIndex]?.colors[sizes[chosenSizeIndex].colors.findIndex(x => x.name===chosenColor)]?.stock
  const savedlater = myUser?.savedlater

  function removeItem() {
    myUser.cart.forEach(el => {
      if(el.subid===subid) {
        let itemindex = myUser.cart.indexOf(el)
        myUser.cart.splice(itemindex,1)
      } 
    })
    db.collection('users').doc(user.uid).update({
      'userinfo.cart': myUser.cart
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
        <Link to={`/product/${id}`}><h5>{name}</h5></Link>
        <h6>Size: {chosenSize.toUpperCase()}</h6>
        <h6>Color: {colorConverter(chosenColor) || chosenColor}</h6>
      </div> 
      <div className="small"> 
        <h5>{currencyFormat.format(price)}</h5>
      </div>
      <div>
        <AddToCart 
          el={props.el} 
          dropdown={false}
          subid={subid}
          stocksLeft={stocksLeft}
        />
      </div>
      <div className="small">
        <h5>{currencyFormat.format(price*units)}</h5>
      </div>
      <div className="actionsbox">
        <div className="optsbox" onClick={() => setShowOpts(prev => !prev)}>
          <i className="far fa-ellipsis-h"></i>
        </div>
        <div className={`optionscont ${showOpts?"show":""}`} onClick={() => setShowOpts(prev => !prev)}>
          <EditProduct product={props.el} />
          <h6 onClick={() => removeItem()}>Delete</h6>
          <SaveLater el={props.el} cart={myUser?.cart} savedlater={savedlater} />
        </div>
      </div>
    </div>
  )
}