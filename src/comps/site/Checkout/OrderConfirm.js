import React, { useContext } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/OrderConfirm.css'
import '../../common/styles/ProductTable.css'
import AppButton from '../common/AppButton'
import {StoreContext} from '../../common/StoreContext'
import Loader from '../../common/Loader'
import refProd from '../../common/referProduct'
import { convertDate } from '../../common/UtilityFuncs'

export default function OrderConfirm(props) {

  const {myOrders, currencyFormat, allProducts} = useContext(StoreContext)
  const {orderid, products, orderNumber, paymentDetails, orderDateCreated,
    shippingMethod, taxRate, orderSubtotal, orderTotal, billingDetails} = props.el
  
  const productsrow = products?.map(el => {
    return <div className="proditem">
      <div className="small"><img src={refProd(allProducts, el.id).imgs[0]} alt=""/></div>
      <div><h5>{refProd(allProducts, el.id).name}</h5></div>
      <div><h5>{currencyFormat.format(refProd(allProducts, el.id).price)}</h5></div>
      <div className="small"><h5>{el.units}</h5></div>
      <div><h5>{convertDate(orderDateCreated?.toDate())}</h5></div>
      <div><h5>{currencyFormat.format(el.units*refProd(allProducts, el.id).price)}</h5></div>
      </div>
  }) 

  return (
    <div className="orderconfirmpage">
      <PageBanner 
        title="Order Confirmation"
      /> 
      {
        myOrders.length?
        <div className="grid xgrid">
        <div className="titles">
          <h3>Thank you for your order.</h3>
          <p>Here is your order summary.</p>
          <small>Order # {orderNumber}</small>
        </div>
        <div className="orderconfirmcont">
          <div className="producttable">
            <div className="header">
              <h5 className="small">Product Image</h5>
              <h5>Product Name</h5>
              <h5>Unit Price</h5>
              <h5 className="small">Quantity</h5>
              <h5>Date Purchased</h5>
              <h5>Subtotal</h5>
            </div>
            <div className="content">
              {productsrow}
            </div>
          </div>
          <div className="recapcont">
            <div><h6>Order Number</h6><span>{orderNumber}</span></div>
            <div><h6>Order Created Date</h6><span>{convertDate(orderDateCreated?.toDate())}</span></div>
            <div><h6>Payment Method</h6><span>{paymentDetails?.method}</span></div>
            <div><h6>Products</h6><span>{products?.length}</span></div>
            <div><h6>Shipping Method</h6><span>{shippingMethod?.name} - {currencyFormat.format(shippingMethod?.cost)}</span></div>
            <div><h6>Taxes</h6><span>{currencyFormat.format(taxRate*orderSubtotal)}</span></div>
            <div><h6>Order Subtotal</h6><span>{currencyFormat.format(orderSubtotal)}</span></div>
            <div className="large"><h6>Order Total</h6><span>{currencyFormat.format(orderTotal)}</span></div>
          </div>
          <div className="notification">
            <div className="notifbar">
              <i className="fal fa-envelope"></i>
              <p>A copy of your order has been sent to your email ({billingDetails?.email})</p>
            </div>
          </div>
          <div className="endcont">
            <h4>Thank you for shopping with Amplify.</h4>
            <div className="btnscont">
              <AppButton 
                title="Return to Homepage"
                url="/"
              />
              <AppButton 
                title="My Orders"
                url="/my-account/orders/"
              />
            </div>
          </div>
        </div>
      </div>:
      <Loader />
      }
    </div>
  )
}