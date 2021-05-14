import React, { useContext } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/Wishlist.css'
import {StoreContext} from '../../common/StoreContext'
import AddToCart from '../common/AddToCart'
import {db} from '../../common/Fire'
import { Link } from 'react-router-dom'
import AppButton from '../common/AppButton'
import Subscribe from '../common/SubscribeComp'

export default function Wishlist() { 

  const {myUser, user} = useContext(StoreContext)
  const wishlist = myUser?.wishlist
  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}) 
  const wishtotal = currencyFormat.format(wishlist?.reduce((a,b) => a + b.price,0))

  const wishlistrow = wishlist?.map(el => {
    return <div className="wishitem">
      <div><img src={el.imgs[0]} alt="" /></div>
      <div><Link to={`/product/${el.id}`}><h6>{el.name}</h6></Link></div>
      <div><h6>{currencyFormat.format(el.price)}</h6></div>
      <div className="addcartdiv"><AddToCart el={el} /></div>
      <div className="delete" onClick={() => remWishlist(el.id)}><i className="fal fa-times"></i></div>
    </div>
  })

  function remWishlist(id) {
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

  return (
    <div className="wishlistpage">
      <PageBanner 
        title="My Wishlist"
      />
      <div className="grid xgrid">
        {
          wishlist?.length?
          <>
            <div className="wishlisttable">
              <div className="header">
                <h5>Product</h5>
                <h5>Product Name</h5>
                <h5>Price</h5>
                <h5>Add to Cart</h5>
                <h5>Actions</h5>
              </div>
              <div className="content">
                {wishlistrow}
              </div>
            </div>
            <div className="wishlistinfo">
              <h6><span>Wishlist Items: </span><span>{wishlist?.length}</span></h6>
              <h6><span>Items Total: </span><span>{wishtotal}</span></h6>
            </div>
          </>:
          <div className="emptylist">
            <h4>There are no items in your wishlist</h4>
            <AppButton 
              title="Add Items"
              url="/shop"
            />
          </div>
        }
        <Subscribe />
      </div>
    </div>
  )
}