import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'

export default function SaveLater(props) {

  const {user, myUser} = useContext(StoreContext)
  const {savedlater} = props
  const {id, chosenColor, chosenSize, units} = props.el

  function saveForLater() {
    savedlater.push({
      units,
      chosenColor,
      chosenSize,
      id
    })
    myUser.cart.forEach(el => {
      if(el.id===id) {
        let itemindex = myUser?.cart.indexOf(el)
        myUser.cart.splice(itemindex,1)
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