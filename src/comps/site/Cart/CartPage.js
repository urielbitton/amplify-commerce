import React, { useContext, useEffect, useState } from "react"
import PageBanner from "../common/PageBanner"
import "./styles/CartPage.css"
import { StoreContext } from "../../common/StoreContext"
import CartItem from "./CartItem"
import { AppInput, AppSelect } from "../../common/AppInputs"
import AppButton from "../common/AppButton"
import {db} from "../../common/Fire"
import SaveLaterItem from "./SaveLaterItem"
import {sizeConverter, colorConverter} from '../../common/UtilityFuncs'
 
export default function CartPage() {
  const {myUser, user, cartSubtotal, shippingMethods, currencyFormat, showCart, setShowCart,
    editProduct, showEditProd, setShowEditProd
  } = useContext(StoreContext)
  const cart = myUser?.cart
  const savedlater = myUser?.savedlater
  const [chosenShipping, setChosenShipping] = useState({name: "regular",cost: 3.99})
  const [couponCode, setCouponCode] = useState("")
  const [chosenSize, setChosenSize] = useState(editProduct?.chosenSize)
  const [chosenColor, setChosenColor] = useState(editProduct?.chosenColor)
  const allcolors = []

  const cartitemsrow = cart?.map(el => {
    return <CartItem el={el} key={el.subid} />
  })
  const savedlateritemsrow = savedlater?.map(el => {
    return <SaveLaterItem el={el} key={el.subid} />
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
  const sizesoptions = editProduct?.sizes?.map(el => {
    return {name: sizeConverter(el.name), value: el.name}
  })
  editProduct?.sizes && editProduct?.sizes[editProduct?.sizes?.findIndex(x => x.name===chosenSize)]?.colors.forEach(el => {
    allcolors.push(el)
  })
  const coloroptions = allcolors.map(el => {
    return {name: colorConverter(el), value: el} 
  })
   
  function clearCart() {
    let confirm = window.confirm("Are you sure you want to remove all the items from your cart?")
    if (confirm) {
      myUser.cart = []
      db.collection("users").doc(user.uid).update({
        userinfo: myUser
      })
    } 
  }
  function saveProduct() {
    let currentProd = cart?.find(x => x.subid === editProduct?.subid)
    if(!currentProd) {
      currentProd.chosenSize = chosenSize
      currentProd.chosenColor = chosenColor
      currentProd.subid = chosenSize+chosenColor
    }
    else {
      //add units from both products together and delete one product
    }
    db.collection('users').doc(user.uid).update({ 
      userinfo: myUser
    }).then(res => setShowEditProd(false))
  }

  useEffect(() => {
    showCart && setShowCart(false);
  }, [])
  useEffect(() => {
    setChosenSize(editProduct?.chosenSize)
    setChosenColor(editProduct?.chosenColor)
  },[showEditProd])
  useEffect(() => {
    setChosenColor(editProduct?.sizes[editProduct?.sizes?.findIndex(x => x.name===chosenSize)]?.colors[0])
  },[chosenSize])

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
      <div className={`editprodcover ${showEditProd?"show":""}`}>
        <div className="editprodcont">
          <h3>
            Edit Product
            <i className="fal fa-times closeicon" onClick={() => setShowEditProd(false)}></i>
          </h3>
          <div className="productrow">
            <div className="infodiv">
              <img src={editProduct?.img} alt=""/>
              <div>
                <h4>{editProduct?.name}</h4>
                <small>Units: {editProduct?.units}</small>
              </div>
            </div>
            <div>
              <AppSelect 
                title="Size"
                options={[...sizesoptions]}
                onChange={(e) => setChosenSize(e.target.value)}   
                value={chosenSize}   
                namebased
              /> 
              <AppSelect 
                title="Color"
                options={[...coloroptions]} 
                onChange={(e) => setChosenColor(e.target.value)}
                value={chosenColor}  
              />
              <AppButton 
                title="Save"
                onClick={() => saveProduct()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
