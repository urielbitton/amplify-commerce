import React, { useContext } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/Wishlist.css'
import {StoreContext} from '../../common/StoreContext'
import AppButton from '../common/AppButton'
import Subscribe from '../common/SubscribeComp'
import WishItem from './WishItem'
import {db} from '../../common/Fire'
import referProduct from '../../common/referProduct'

export default function Wishlist() { 

  const {myUser, user, allProducts} = useContext(StoreContext)
  let wishlist = myUser?.wishlist
  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}) 
  const wishtotal = currencyFormat.format(wishlist?.reduce((a,b) => a + referProduct(allProducts,b).price,0))

  const wishlistrow = wishlist?.map(el => {
    return <WishItem el={el} wishlist={wishlist} user={user} myUser={myUser} />
  })
  function clearWishlist() {
    const confirm = window.confirm('Are you sure you want to remove all items from your wishlist?')
    if(confirm) {
      myUser.wishlist = []
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      })
    }
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
            <div className="wishlisttable producttable">
              <div className="header">
                <h5 className="small">Product</h5>
                <h5>Product Name</h5>
                <h5>Price</h5> 
                <h5>Stock Status</h5>
                <h5>Actions</h5>
              </div>
              <div className="content">
                {wishlistrow}
              </div>
            </div>
            <div className="wishlistinfo">
              <h6><span>Wishlist Items: </span><span>{wishlist?.length}</span></h6>
              <h6><span>Items Total: </span><span>{wishtotal}</span></h6>
              <small onClick={() => clearWishlist()}>Clear List</small> 
              <h6>Share Wishlist</h6>
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