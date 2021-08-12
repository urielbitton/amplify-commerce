import React, { useContext, useEffect, useState } from 'react'
import './styles/CustomerPage.css'
import {convertDate, getOrdersById, getReviewsById, getTransactionsById, getUserArrById, getOrderArrById,
  colorConverter, sizeConverter} from '../../common/UtilityFuncs'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import Ratings from '../../common/Ratings'
import TabsBar from '../common/TabsBar'
import refProd from '../../common/referProduct'
import { custOrdHeaders, custRevsHeaders, custTransHeaders, custCartHeaders, tabsTitles,
  custWishHeaders, custAddressHeaders, custPaymentsHeaders } from './arrays/arrays'
import { Link, useHistory } from 'react-router-dom'
import StartAChat from '../Support/StartAChat'

export default function CustomerPage(props) {

  const {allUsers, currencyFormat, allProducts, allOrders, allChats} = useContext(StoreContext)
  const {id, name, profimg, email, phone, address, postCode, city, provState, country,
    number, moneySpent, userRating} = props.el
  const [tabPos, setTabPos] = useState(0)
  const [userOrders, setUserOrders] = useState([])
  const [userReviews, setUserReviews] = useState([])
  const [userTrans, setUserTrans] = useState([])
  const [userCart, setUserCart] = useState([])
  const [userWish, setUserWish] = useState([])
  const [userAddresses, setUserAddresses] = useState([])
  const [userPayments, setUserPayments] = useState([])
  const [showNewChat, setShowNewChat] = useState(false)
  const [urlCustId, setUrlCustId] = useState(0)
  const reduceStock = (el) => el.sizes?.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.stock,0),0)
  const history = useHistory()

  const myOrdersHeaders = custOrdHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myOrders = userOrders?.map(el => {
    return <div className="customerrow">
      <h6><Link to={`/admin/orders/edit-order/${el.orderid}`}>#{el.orderNumber}</Link></h6>
      <h6 title={el.products.length>1&&`+ ${el.products.length-1} more`}>{refProd(allProducts, el.products[0]?.id)?.name}</h6>
      <h6>{convertDate(el.orderDateCreated.toDate())}</h6>
      <h6>{currencyFormat.format(el.orderTotal)}</h6>
      <h6><span>{el.updates[el.updates.length-1].status}</span></h6>
    </div>
  })
  const myReviewsHeaders = custRevsHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myReviews = userReviews?.map(el => {
    return <div className="customerrow">
      <h6><Link to={`/admin/customers/reviews/${el.id}`}>"{el.title}"</Link></h6>
      <h6>{refProd(allProducts, el.productId).name}</h6>
      <h6>{convertDate(el.dateReviewed.toDate())}</h6>
      <h6>{<Ratings rating={el.rating}/>}</h6>
      <h6>{el.likes}</h6>
    </div>
  })

  const myTransHeaders = custTransHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myTransactions = userTrans?.map(el => {
    return <div className="customerrow">
      <h6>
        <Link to={`/admin/orders/transactions/${el.id}`}>#{el.number}</Link>
      </h6>
      <h6>#{getOrderArrById(allOrders, el.orderId).orderNumber}</h6>
      <h6>****{el.cardNumber.slice(-4)}</h6>
      <h6>{el.method}</h6>
      <h6>{convertDate(el.date.toDate())}</h6>
      <h6>{currencyFormat.format(el.total)}</h6>
    </div>
  })
  const myCartHeaders = custCartHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myCart = userCart?.map(el => {
    return <div className="customerrow custcartrow">
      <h6><Link to={`/admin/store/edit-product/${el.id}`}>
        <img src={refProd(allProducts, el.id).imgs[0]} alt=""/>  
      </Link></h6>
      <h6>
        <Link to={`/admin/store/edit-product/${el.id}`}>{refProd(allProducts, el.id).name}</Link>
      </h6>
      <h6>{sizeConverter(el.chosenSize)}, {colorConverter(el.chosenColor)}</h6>
      <h6>{currencyFormat.format(refProd(allProducts, el.id).price)}</h6>
      <h6>{el.units}</h6>
      <h6>{currencyFormat.format((refProd(allProducts, el.id).price) * el.units)}</h6>
    </div>
  })
  const myWishHeaders = custWishHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myWishlist = userWish?.map(el => {
    return <div className="customerrow custcartrow">
    <h6>
      <Link to={`/admin/store/edit-product/${el}`}><img src={refProd(allProducts, el)?.imgs[0]} alt=""/></Link>
    </h6>
    <h6>{refProd(allProducts, el)?.name}</h6>
    <h6>{refProd(allProducts, el)?.price}</h6>
    <h6>{reduceStock(refProd(allProducts, el))}</h6>
  </div>
  })

  const myAddressHeaders = custAddressHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myAddresses = userAddresses?.map(el => {
    return <div className="customerrow">
    <h6>{el.fname} {el.lname}</h6>
    <h6>{el.address}</h6>
    <h6>{el.postcode}</h6>
    <h6>{el.city}</h6>
    <h6>{el.region}</h6>
    <h6>{el.country}</h6>
    <h6>{el.primary?"Primary":""}</h6>
  </div>
  })

  const myPaymentsHeaders = custPaymentsHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const myPayments = userPayments?.map(el => {
    return <div className="customerrow">
    <h6><img className="cardimg" src={el.cardImg} alt=""/></h6>
    <h6>****{el.cardNumber.slice(-4)}</h6>
    <h6>{el.cardHolder}</h6>
    <h6>{el.expiryMonth}/{el.expiryYear}</h6>
    <h6>{userAddresses.find(x => x.id === el.billingAddress)?.address}</h6>
    <h6>{el.bank.length?el.bank:"N/A"}</h6>
    <h6>{el.primary?"Primary":""}</h6>
  </div>
  })

  const sectionsArr = [
    {header: myOrdersHeaders, content: myOrders},
    {header: myReviewsHeaders, content: myReviews},
    {header: myTransHeaders, content: myTransactions},
    {header: myCartHeaders, content: myCart, className:'custcartrowhead'},
    {header: myWishHeaders, content: myWishlist, className:'custcartrowhead'},
    {header: myAddressHeaders, content: myAddresses},
    {header: myPaymentsHeaders, content: myPayments} 
  ]

  const customerSections = sectionsArr?.map(({header,content,className},i) => {
    return <div className={`tabsection ${tabPos===i?"show":""}`}>
      <div className={`customersheadrow ${className?className:""}`}>
        {header}
      </div>
      {content}
    </div>
  })

  function sendMessage() {
    if(allChats.findIndex(x => x.chatInfo.customerId === id) < 0) {
      setShowNewChat(true)
    }
    else {
      history.push(`/admin/support/customer-support/chat/${id}`)
      setUrlCustId(id)
    }
  }

  useEffect(() => {
    getOrdersById(id, setUserOrders) 
    getReviewsById(id, setUserReviews)
    getTransactionsById(id, setUserTrans)
    setUserCart(getUserArrById(allUsers, id)?.cart)
    setUserWish(getUserArrById(allUsers, id)?.wishlist)
    setUserAddresses(getUserArrById(allUsers, id)?.addresses)
    setUserPayments(getUserArrById(allUsers, id)?.payments)
  },[allUsers]) 

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
              {address}, &nbsp;
              <span className="upper">{postCode}</span></h5>
            <h5>
              <i className="fal fa-globe-americas"></i>
              {city} ({provState}), {country}
            </h5>
          </div>
          <div className="section data">
            <h6>Customer Data</h6>
            <h5><b>Customer Number:</b> #{number}</h5>
            <h5><b>User ID:</b> <span className="id">{id}</span></h5>
            <h5><b>User Type:</b>{getUserArrById(allUsers, id)?.isAdmin?"Admin":"Client"}</h5>
            <h5><b>Money Spent:</b> {currencyFormat.format(moneySpent)}</h5>
          </div>
        </div>
        <div className="right">
          <div className="actions">
            <AdminBtn title="Send Message" icon="fal fa-comment" clickEvent onClick={() => sendMessage()}/>
            <AdminBtn title="Email" icon="fal fa-envelope" clickEvent onClick={() => window.open('mailto:'+email)}/>
            <AdminBtn title="Edit" icon="fal fa-pen" url={`/admin/customers/edit-customer/${id}`}/>
            <AdminBtn title="Ban User" solid icon="fal fa-user-slash"/>
          </div>
          <div className="section">
            <h6>User Rating</h6>
            <div className="userrating">
              <big>{userRating?.toFixed(1)}</big>
              <Ratings rating={userRating}/>
            </div>
          </div>
          <TabsBar 
            tabsTitles={tabsTitles} 
            tabPos={tabPos}
            setTabPos={setTabPos}
          />
          {customerSections}
        </div>
      </div>
      <StartAChat 
        showNewChat={showNewChat}
        setShowNewChat={setShowNewChat}
        setUrlCustId={setUrlCustId}
        tempCustomerId={id}
        hideSearch
      />
    </div>
  )
}