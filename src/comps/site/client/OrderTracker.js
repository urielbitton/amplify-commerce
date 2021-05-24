import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import OrderProgress from '../common/OrderProgress'
import './styles/OrderTracker.css'

export default function OrderTracker(props) {

  const {showTrackCont, setShowTrackCont} = useContext(StoreContext)

  return (
    <div className={`ordertrackercover ${showTrackCont?"show":""}`} onClick={() => setShowTrackCont(false)}>
      <div className="ordertrackercont" onClick={(e) => e.preventDefault()}>
        <div  className="tracktitles">
          <h3>
            <i></i>
            Tracking Details
            <i className="fal fa-times closecont" onClick={() => setShowTrackCont(false)}></i>
          </h3>
        </div>
        <div className="trackingdetails">
          <img src="" alt=""/>
          <div className="infocont">
            <h6>Tracking number <span>nn</span></h6>
            <h6>Products: <span>nn</span></h6>
            <h6>Estimated delivery: <span>nn</span></h6>
            <h6>Carrier: <span>nn</span></h6>
            <h6>Shipping Method: <span>nn</span></h6>
          </div>
        </div>
        <OrderProgress tubeHeight={35} iconsize={20}/>
      </div>
    </div>
  )
}