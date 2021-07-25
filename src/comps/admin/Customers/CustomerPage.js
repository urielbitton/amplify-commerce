import React, { useContext, useEffect, useState } from 'react'
import './styles/CustomerPage.css'
import {convertDate, getOrdersById, getReviewsById, getUserById} from '../../common/UtilityFuncs'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import Ratings from '../../common/Ratings'
import TabsBar from '../common/TabsBar'
import referProduct from '../../common/referProduct'
import { custOrdHeaders } from './arrays/arrays'
import { Link } from 'react-router-dom'

export default function CustomerPage(props) {

  const {allUsers, currencyFormat, allProducts} = useContext(StoreContext)
  const {id, name, profimg, email, phone, address, postCode, city, provState, country,
    number, moneySpent, userRating} = props.el
  const [tabPos, setTabPos] = useState(0)
  const [userOrders, setUserOrders] = useState([])
  const [userReviews, setUserReviews] = useState([])

  const tabsTitles = ['Orders', 'Reviews', 'Transactions', 'About']

  const myOrdersHeaders = custOrdHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myOrders = userOrders?.map(el => {
    return <div className="customerrow">
      <h6><Link to={`/admin/orders/edit-order/${el.orderid}`}>#{el.orderNumber}</Link></h6>
      <h6 title={el.products.length>1&&`+ ${el.products.length-1} more`}>{referProduct(allProducts, el.products[0]?.id)?.name}</h6>
      <h6>{convertDate(el.orderDateCreated.toDate())}</h6>
      <h6>{el.orderTotal}</h6>
      <h6><span>{el.updates[el.updates.length-1].status}</span></h6>
    </div>
  })

  const myReviews = userReviews?.map(el => {
    return <div className="customerrow">
      <h6>{el.title}</h6>
    </div>
  })

  useEffect(() => {
    getOrdersById(id, setUserOrders) 
    getReviewsById(id, setUserReviews)
  },[])

  return (
    <div className="onecustomerpage">
      <div className="pagecont">
        <div className="left">
          <img src={profimg} alt=""/>
          <div className="section">
            <h6>Customer Info</h6>
            <h5 className="name"><i className="fal fa-user"></i><b>{name}</b></h5>
            <h5><i className="fal fa-envelope"></i>{email}</h5>
            <h5><i className="fal fa-phone"></i>{phone}</h5>
            <h5>
              <i className="fal fa-map-marker-alt"></i>
              {address} 
              <span className="upper">{postCode}</span></h5>
            <h5>
              <i className="fal fa-globe-americas"></i>
              {city} ({provState}), {country}
            </h5>
          </div>
          <div className="section data">
            <h6>Customer Data</h6>
            <h5><b>Customer Number:</b> #{number}</h5>
            <h5><b>Customer ID:</b> {id}</h5>
            <h5><b>User Type:</b>{getUserById(allUsers, id)?.isAdmin?"Admin":"Client"}</h5>
            <h5><b>Money Spent:</b> {currencyFormat.format(moneySpent)}</h5>
          </div>
        </div>
        <div className="right">
          <div className="actions">
            <AdminBtn title="Send Message" icon="fal fa-comment"/>
            <AdminBtn title="Email" icon="fal fa-envelope" clickEvent onClick={() => window.open('mailto:'+email)}/>
            <AdminBtn title="Ban User" solid icon="fal fa-user-slash"/>
          </div>
          <div className="section">
            <h6>User Rating</h6>
            <div className="userrating">
              <big>{userRating}</big>
              <Ratings rating={userRating}/>
            </div>
          </div>
          <TabsBar 
            tabsTitles={tabsTitles} 
            tabPos={tabPos}
            setTabPos={setTabPos}
          />
          <div className={`tabsection ${tabPos===0?"show":""}`}>
            <div className="customersheadrow">
              {myOrdersHeaders}
            </div>
            {myOrders}
          </div>
          <div className={`tabsection ${tabPos===1?"show":""}`}>
            <div className="customersheadrow">
              
            </div>
            {myReviews}
          </div>
        </div>
      </div>
    </div>
  )
}