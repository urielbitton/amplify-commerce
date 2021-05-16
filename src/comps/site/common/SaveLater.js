import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'

export default function SaveLater(props) {

  const {user, myUser} = useContext(StoreContext)
  const {cart, savedlater} = props
  const {item, chosenColor, chosenSize, units} = props.el

  function saveForLater() {
    savedlater.push({
      units,
      chosenColor,
      chosenSize,
      item
    })
    cart.forEach(el => {
      if(el.item.id===item.id) {
        let itemindex = cart.indexOf(el)
        cart.splice(itemindex,1)
      } 
    })
    db.collection('users').doc(user.uid).update({
      userinfo: myUser
    })
  }

  return (
    <h6 onClick={() => saveForLater()}>Save For Later</h6>
  )
}