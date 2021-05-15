import React, { useContext, useEffect, useState } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/CartPage.css'
import {StoreContext} from '../../common/StoreContext'
import CartItem from './CartItem'
import {AppInput} from '../../common/AppInputs'
import AppButton from '../common/AppButton'
import { db } from '../../common/Fire'

export default function CartPage() {

  const {myUser, user, cartSubtotal, shippingMethods, currencyFormat, showCart, setShowCart} = useContext(StoreContext)
  const cart = myUser?.cart
  const [chosenShipping, setChosenShipping] = useState({name: 'regular',cost: 3.99})
  const [couponCode, setCouponCode] = useState('')

  const cartitemsrow = cart?.map(el => {
    return <CartItem el={el} />
  })
  const shipoptions = shippingMethods?.map(({name,price,value,defaultvalue},i) => {
    return <AppInput 
      type="radio" 
      title={<>{name} <span>{`(${currencyFormat.format(price)})`}</span></>} 
      name="shippingmethod" 
      onChange={() => setChosenShipping({name:value,cost:price})}
      value={chosenShipping}
      defaultChecked={defaultvalue}
      />
  })
  function clearCart() {
    let confirm = window.confirm('Are you sure you want to remove all the items from your cart?')
    if(confirm) {
      myUser.cart = []
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      })
    }
  }

  useEffect(() => {
    showCart&&setShowCart(false)
  },[]) 

  return (
    <div className="cartpage">
      <PageBanner 
        title="Cart"
      />
      <div className="grid xgrid cartgrid">
        <div className="maincartcont">
          <div className="carttable producttable">
            <div className="header">
              <h5 className="small">Product</h5>
              <h5>Product Name</h5>
              <h5 className="small">Unit Price</h5>
              <h5>Quantity</h5>
              <h5 className="small">Total</h5>
              <h5>Actions</h5>
            </div>
            <div className="content">
              {cartitemsrow}
            </div>
          </div>
          <div className="cartactions">
            <div>
              <div className="couponcont">
                <AppInput 
                  placeholder="Enter coupon code" 
                  maxlength={7} 
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <AppButton title="Apply Coupon"/>
              </div>
            </div>
            <div>
              <AppButton title="Continue Shopping" url="/shop" />
              <AppButton 
                title="Clear Cart" 
                icon="fal fa-times" 
                noanimate 
                onClick={() => clearCart()}
              />
            </div>
          </div>
        </div>
        <div className="carttotalscont">
          <div>
            <h5>Cart Totals</h5>
          </div>
          <div>
            <h6><span>Subtotal</span><span>{currencyFormat.format(cartSubtotal)}</span></h6>
          </div>
          <div className="shipping">
            <h6><span>Shipping</span></h6>
            <div className="shipoptions">{shipoptions}</div>
          </div>
          <div>
            <h6>Total before taxes<small>{currencyFormat.format((cartSubtotal)+(chosenShipping.cost))}</small></h6>
          </div>
          <AppButton title="Proceed To Checkout" url="/checkout"/>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  )
}