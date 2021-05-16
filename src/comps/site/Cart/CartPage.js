import React, { useContext, useEffect, useState } from "react"
import PageBanner from "../common/PageBanner"
import "./styles/CartPage.css"
import { StoreContext } from "../../common/StoreContext"
import CartItem from "./CartItem"
import { AppInput } from "../../common/AppInputs"
import AppButton from "../common/AppButton"
import {db} from "../../common/Fire"
import SaveLaterItem from "./SaveLaterItem"
 
export default function CartPage() {
  const {myUser, user, cartSubtotal, shippingMethods, currencyFormat, showCart, setShowCart} = useContext(StoreContext)
  const cart = myUser?.cart
  const savedlater = myUser?.savedlater
  const [chosenShipping, setChosenShipping] = useState({name: "regular",cost: 3.99})
  const [couponCode, setCouponCode] = useState("")

  const cartitemsrow = cart?.map(el => {
    return <CartItem el={el} key={el.id} />
  })
  const savedlateritemsrow = savedlater?.map((el) => {
    return <SaveLaterItem el={el} key={el.id} />
  })
  const shipoptions = shippingMethods?.map(({name,price,value,defaultvalue}, i) => {
      return (
        <AppInput
          type="radio"
          title={<>{name} <span>{`(${currencyFormat.format(price)})`}</span></>}
          name="shippingmethod"
          onChange={() => setChosenShipping({ name: value, cost: price })}
          value={chosenShipping}
          defaultChecked={defaultvalue}
        />
      )
    }
  )
  function clearCart() {
    let confirm = window.confirm("Are you sure you want to remove all the items from your cart?")
    if (confirm) {
      myUser.cart = []
      db.collection("users").doc(user.uid).update({
        userinfo: myUser
      })
    } 
  }

  useEffect(() => {
    showCart && setShowCart(false);
  }, [])

  return (
    <div className="cartpage">
      <PageBanner title="Cart" />
      { cart?.length?
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
              <div className="content">{cartitemsrow}</div>
            </div>
            <div className="cartactions">
              <div>
                <div className="couponcont">
                  <AppInput
                    placeholder="Enter coupon code"
                    maxlength={7}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <AppButton title="Apply Coupon" />
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
              <h6>
                <span>Subtotal</span>
                <span>{currencyFormat.format(cartSubtotal)}</span>
              </h6>
            </div>
            <div className="shipping">
              <h6>
                <span>Shipping</span>
              </h6>
              <div className="shipoptions">{shipoptions}</div>
            </div>
            <div>
              <h6>Total before taxes
                <small>{currencyFormat.format(cartSubtotal + chosenShipping.cost)}</small>
              </h6>
            </div>
            <AppButton title="Proceed To Checkout" url="/checkout" />
          </div>
        </div>:
        <div className="emptycartcont">
          <div className="grid xgrid">
            <h5>Your cart is currently empty.</h5>
            <AppButton title="Add Items" url="/shop"/>
          </div>
        </div>
      }
      <div className="grid xgrid">
        { savedlater?.length?
          <div className="savedlatercont">
            <h3>Saved For Later</h3>
            <div className="savedlatertable producttable">
              <div className="header">
                <h5 className="small">Product</h5>
                <h5>Product Name</h5>
                <h5 className="small">Unit Price</h5>
                <h5>Quantity</h5>
                <h5 className="small">Total</h5>
                <h5>Actions</h5>
              </div>
              <div className="content">
                {savedlateritemsrow}
              </div>
            </div>
          </div>:
          <div className="emptycartcont">
          <div className="grid xgrid">
            <h5>You have no saved items yet.</h5>
            <small>Saved items show up here when you choose 'save for later' from your cart</small>
          </div>
        </div>
        }
      </div>
    </div>
  )
}
