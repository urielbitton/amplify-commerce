import React, { useContext } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/CartPage.css'
import {StoreContext} from '../../common/StoreContext'
import CartItem from './CartItem'

export default function CartPage() {

  const {myUser} = useContext(StoreContext)
  const cart = myUser?.cart

  const cartitemsrow = cart?.map(el => {
    return <CartItem el={el} />
  })

  return (
    <div className="cartpage">
      <PageBanner 
        title="Cart"
      />
      <div className="grid xgrid">
        <div className="carttable producttable">
          <div className="header">
            <h5>Product</h5>
            <h5>Product Name</h5>
            <h5>Unit Price</h5>
            <h5>Quantity</h5>
            <h5>Total</h5>
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
    </div>
  )
}