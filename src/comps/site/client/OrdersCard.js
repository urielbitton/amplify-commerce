import React, { useContext } from 'react'
import './styles/OrdersCard.css'
import AppButton from '../common/AppButton'
import { StoreContext } from '../../common/StoreContext'
import refProd from '../../common/referProduct'
import { Link } from 'react-router-dom'

export default function OrdersCard(props) {
  
  const {currencyFormat, allProducts} = useContext(StoreContext)
  const {orderStatus, orderid, orderDateCreated, orderTotal, shippingDetails, products,
    
  } = props.order
  let orderDate = orderDateCreated.toDate().toString().split(' ')
  const productsmore = products.length>1?products.length-1:0

  return (
    <div className="orderscard">
      <div className="topbar">
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
            <span>View Invoice</span>
          </div>
        </div>
      </div>
      <div className="cardcontent">
        <div className="infocont">
          <h4>{orderStatus==='delivered'?"Delivered on:":"Arriving:"} </h4>
          <div className="packagedetails">
            <img src={refProd(allProducts,products[0].id).imgs} alt=""/>
            <h6>
              <Link to="" className="prodtitle">{refProd(allProducts,products[0].id).name} x {products[0].units}</Link>
              {productsmore>0&&<Link to=""><small>+ {productsmore} more product{productsmore>1?"s":""}</small></Link>}
              <AppButton title="Buy Again" url=""/>
            </h6>
          </div>
        </div>
        <div className="btnscont">
          <AppButton 
            title="Track Package"
            className={`show ${orderStatus==='delivered'?"":"highlight"}`}
            onClick={() => null}
          />
          <AppButton 
            title="Change Shipping"
            className={(orderStatus==='delivered' || orderStatus==='shipped')?"":"show"} 
            onClick={() => null}
          />
          <AppButton 
            title="View/Edit Order"
            className="show"
            onClick={() => null}
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
        </div>
      </div>
    </div>
  )
}