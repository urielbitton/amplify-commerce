import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {db} from '../../common/Fire'

export default function AddToWish(props) {

  const {myUser, user} = useContext(StoreContext)
  const {id} = props.el
  const wishlist = myUser?.wishlist
  const prodwished = wishlist?.find(el => el.id === id)

  function addRemWishlist() {
    if(!prodwished) {
      wishlist.push(props.el)
    } 
    else {
      wishlist.forEach(el => {
        if(el.id===id) {
          let itemindex = wishlist.indexOf(el)
          wishlist.splice(itemindex,1)
        } 
      }) 
    }
    db.collection('users').doc(user.uid).update({ 
      userinfo: myUser
    })
  }  

  return (
    <div className="addtowishbtn" onClick={() => addRemWishlist()} title="Add to Wishlist">
      <i className={`${prodwished?"fas":"far"} fa-heart`}></i>
    </div>
  )
}