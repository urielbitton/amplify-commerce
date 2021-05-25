import React, { useContext } from 'react'
import refProd from '../../common/referProduct'
import { StoreContext } from '../../common/StoreContext'
import OrderProgress from '../common/OrderProgress'
import './styles/OrderTracker.css'
import {convertTime} from '../../common/UtilityFuncs'

export default function OrderTracker(props) {

  const {showTrackCont, setShowTrackCont, trackingDetails, allProducts} = useContext(StoreContext)
  const {img, trackingNum, products, estDelivery, carrier, shippingMethod, updates} = trackingDetails

  const updatesrow = updates?.map(({action,date,location}) => {
    return <div className="updaterow">
      <h6>
        {date.toDate().toString().split(' ')[1]}&nbsp;
        {date.toDate().toString().split(' ')[2]}&nbsp;
        {date.toDate().toString().split(' ')[3]}
        <span>{convertTime(date?.toDate().toString().split(' ').slice(4,7)[0])}</span>
      </h6>
      <h6>{location}</h6>
      <h6>{action}</h6>
    </div>
  })

  return (
    <div className={`ordertrackercover ${showTrackCont?"show":""}`} onClick={() => setShowTrackCont(false)}>
      <div className="ordertrackercont" onClick={(e) => e.stopPropagation()}>
        <div  className="tracktitles">
          <h3>
            <i></i>
            Tracking Details
            <i className="fal fa-times closecont" onClick={() => setShowTrackCont(false)}></i>
          </h3>
        </div>
        <div className="trackingdetails">
          <img src={img} alt=""/>
          <div className="infocont">
            <h6>Tracking number <span>{trackingNum}</span></h6>
            <h6>Products: <span>{refProd(allProducts,products[0].id)?.name}</span></h6>
            <h6>Estimated delivery: <span>{estDelivery}</span></h6>
            <h6>Carrier: <span>{carrier}</span></h6>
            <h6>Shipping Method: <span>{shippingMethod.name}</span></h6>
          </div>
        </div>
        <OrderProgress tubeHeight={30} iconsize={20} order={trackingDetails} dateTitles />
        <div className="updatescont">
          <h4>Order Updates</h4>
          <div className="updatestable">
            <div className="header">
              <h5>Date/Time</h5>
              <h5>Location</h5>
              <h5>Event</h5>
            </div>
            <div className="content">
              {
                updates.length?updatesrow:
                <h6 className="noupdates">There are no updates yet. The seller will soon update your order.</h6>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}