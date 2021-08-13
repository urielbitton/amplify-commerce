import React, {useContext, useEffect, useState} from 'react'
import {StoreContext} from '../../common/StoreContext'
import {db} from '../../common/Fire'
import refProd from '../../common/referProduct'
import {colorConverter} from '../../common/UtilityFuncs'

export default function SaveLaterItem(props) {

  const {currencyFormat, myUser, user, allProducts} = useContext(StoreContext)
  const {id, name, imgs, price} = refProd(allProducts,props.el.id)
  const {subid, chosenColor, chosenSize, units} = props.el
  const [showOpts, setShowOpts] = useState(false)
  const savedlater = myUser?.savedlater

  function removeItem() {
    savedlater.forEach(el => {
      if(el.id===id) {
        let itemindex = savedlater.indexOf(el)
        savedlater.splice(itemindex,1)
      } 
    })
    db.collection('users').doc(user.uid).update({
      userinfo: myUser
    })
  }
  function addBackToCart() { 
    if(!myUser.cart.find(el => el.subid===subid)) {
      myUser.cart.push({
        units,  
        chosenColor,
        chosenSize,
        id,
        subid: id+chosenSize+chosenColor
      }) 
      removeItem()
    }
    else {
      window.alert('Product is already in your cart.')
    }
  }

  useEffect(() => {
    window.onclick = () => {
      showOpts&&setShowOpts(false)
    }
  },[showOpts])

  return (
    <div className="savedlateritem proditem">
      <div className="small">
        <img src={imgs[0]} alt={name} />
      </div>
      <div className="prodname"> 
        <h5>{name}</h5>
        <h6>Color: {colorConverter(chosenColor) || chosenColor}</h6>
        <h6>Size: {chosenSize.toUpperCase()}</h6>
      </div> 
      <div className="small"> 
        <h5>{currencyFormat.format(price)}</h5>
      </div>
      <div>
        <h5>{units}</h5>
      </div>
      <div className="small">
        <h5>{currencyFormat.format(price*units)}</h5>
      </div>
      <div className="actionsbox">
        <div className="optsbox" onClick={() => setShowOpts(prev => !prev)}>
          <i className="far fa-ellipsis-h"></i>
        </div>
        <div className={`optionscont ${showOpts?"show":""}`} onClick={() => setShowOpts(prev => !prev)}>
          <h6 onClick={() => removeItem()}>Delete</h6>
          <h6 onClick={() => addBackToCart()}>Add to Cart</h6>
        </div>
      </div>
    </div>
  )
}