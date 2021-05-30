import React, { useContext, useState } from 'react'
import './styles/OrdersCard.css'
import AppButton from '../common/AppButton'
import { StoreContext } from '../../common/StoreContext'
import refProd from '../../common/referProduct'
import { Link } from 'react-router-dom'

export default function OrdersCard(props) {
  
  const {currencyFormat, allProducts, setShowTrackCont, setTrackingDetails} = useContext(StoreContext)
  const {orderStatus, orderid, orderDateCreated, orderTotal, shippingDetails, products,
    shippingMethod, updates
  } = props.order
  const {topbar=true, vieworderbtn=true, prodindex=0, showmore=false} = props
  const [showActions, setShowActions] = useState(-1)
  let orderDate = orderDateCreated.toDate().toString().split(' ')
  const productsmore = products.length>1?products.length-1:0

  function trackOrder() {
    setShowTrackCont(true)
    setTrackingDetails({
      img: refProd(allProducts,products[0].id).imgs[0],
      trackingNum: 'N/A',
      products,
      estDelivery: 'N/A',
      carrier: 'N/A',
      shippingMethod,
      updates,
      orderStatus
    })
  }

  return (
    <div className="orderscard">
      <div className={`topbar ${topbar?"show":""}`}>
        <div className="left">
          <div>
            <h5>Order Placed</h5>
            <span>{`${orderDate[1]} ${orderDate[2]} ${orderDate[3]}`}</span>
          </div>
          <div>
            <h5>Total</h5>
            <span>{currencyFormat.format(orderTotal)}</span>
          </div>
          <div>
            <h5>Ship to</h5>
            <span>{shippingDetails.address}</span>
          </div>
          <div>
            <h5>Order Status</h5>
            <span>{orderStatus}</span>
          </div>
        </div>
        <div className="right">
          <div>
            <h5>Order #{orderid}</h5>
            <div className="orderlinks">
              <small>View Invoice</small>
              <small>View order details</small>
            </div>
          </div>
        </div>
      </div>
      <div className="cardcontent">
        <div className="infocont">
          <h4>{orderStatus==='delivered'?"Delivered on:":"Arriving:"} </h4>
          <div className="packagedetails">
            <img src={refProd(allProducts,products[prodindex].id).imgs} alt=""/>
            <h6>
              <Link to={`/product/${products[prodindex].id}`} className="prodtitle">{refProd(allProducts,products[prodindex].id).name} x {products[prodindex].units}</Link>
              {showmore&&productsmore>0&&<small>+ {productsmore} more product{productsmore>1?"s":""}</small>}
              <small>{currencyFormat.format(refProd(allProducts,products[prodindex].id).price)}</small>
              <small>Brand: {refProd(allProducts,products[prodindex].id).brand}</small>
              <AppButton title="Buy Again" url={`/product/${products[prodindex].id}`}/>
            </h6>
          </div>
        </div>
        <div className="btnscont">
          <AppButton 
            title="Track Order"
            className={`show ${orderStatus==='delivered'?"":"highlight"}`}
            onClick={() => trackOrder()}
          />
          <AppButton 
            title="Change Shipping"
            className={(orderStatus==='delivered' || orderStatus==='shipped')?"":"show"} 
            onClick={() => null}
          />
          <AppButton 
            title="View/Edit Order"
            className={`${vieworderbtn?"show":""}`}
            url={`/my-account/order-details/${orderid}/`}
          />
          <AppButton 
            title="Cancel Items"
            className={(orderStatus==='delivered' || orderStatus==='shipped')?"":"show"} 
            onClick={() => null}
          />
          <AppButton 
            title="Write Product Review"
            className={orderStatus==='delivered'?"show highlight":""}
            onClick={() => null}
          />
          <AppButton 
            title="Return Items"
            className={orderStatus==='delivered'?"show":""}
            onClick={() => null}
          />
          {
            !vieworderbtn&&
            <h6 className="shippingmethod">
              Shipping Method:
              <small> {shippingMethod.name}</small>
            </h6>
          }
        </div>
      </div>

      <div className="actionscover">
        
      </div>
    </div>
  )
}