import React, { useContext, useState } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/CartPage.css'
import {StoreContext} from '../../common/StoreContext'
import CartItem from './CartItem'
import {AppInput} from '../../common/AppInputs'

export default function CartPage() {

  const {myUser, cartSubtotal, shippingMethods, currencyFormat} = useContext(StoreContext)
  const cart = myUser?.cart
  const [chosenShipping, setChosenShipping] = useState('regular')

  const cartitemsrow = cart?.map(el => {
    return <CartItem el={el} />
  })
  const shipoptions = shippingMethods?.map(({name,price,value},i) => {
    return <AppInput 
      type="radio" 
      title={<>{name} <span>{`(${currencyFormat.format(price)})`}</span></>} 
      name="shippingmethod" 
      onChange={(e) => setChosenShipping(e.target.checked)}
      value={chosenShipping}
      />
  })

  return (
    <div className="cartpage">
      <PageBanner 
        title="Cart"
      />
      <div className="grid xgrid cartgrid">
        <div className="maincartcont">
          <div className="carttable producttable">
            <div className="header">
              <h5>Product</h5>
              <h5>Product Name</h5>
              <h5>Unit Price</h5>
              <h5>Quantity</h5>
              <h5 className="small">Total</h5>
              <h5>Actions</h5>
            </div>
            <div className="content">
              {cartitemsrow}
            </div>
          </div>
          <div className="cartactions1 cartactions">

          </div>
          <div className="cartactions2 cartactions">
            
          </div>
        </div>
        <div className="carttotalscont">
          <div>
            <h5>Cart Total</h5>
          </div>
          <div>
            <h6><span>Subtotal</span><small>{cartSubtotal}</small></h6>
          </div>
          <div className="shipping">
            <h6><span>Shipping</span></h6>
            <div className="shipoptions">{shipoptions}</div>
          </div>
          <div>
            <h6>Total<small>{}</small></h6>
          </div>
        </div>
      </div>
    </div>
  )
}