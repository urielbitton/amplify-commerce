import React, { useContext, useEffect, useState } from 'react'
import './styles/Orders.css'
import {StoreContext} from '../../common/StoreContext'
import {AppInput, AppSelect, AppSwitch} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {db} from '../../common/Fire'
import firebase from 'firebase'
import refProd from '../../common/referProduct'
import {sizeConverter, colorConverter, getCustomerById} from '../../common/UtilityFuncs'
import ProvinceCountry from '../../common/ProvinceCountry'
import BillingShippingFields from './BillingShippingFields'
import { Link, useHistory, useLocation } from 'react-router-dom'
import PageTitle from '../common/PageTitle'
import OrderUpdates from './OrderUpdates'
import CustomerPicker from './CustomerPicker'
import convertDate from '../utilities/convertDate'

export default function EditOrder(props) {

  const {editOrdMode, setEditOrdMode, allProducts, allShipping, sizesOpts, colorsOpts, currencyFormat, setEditShipMode,
    billingState, setBillingState, shippingState, setShippingState, taxRate, allCustomers} = useContext(StoreContext)
  const {orderid, orderNumber, orderDateCreated, orderStatus, products, customer,
    trackingNum} = editOrdMode&&props.el
  const [tabPos, setTabPos] = useState(0)
  const [genNum, setGenNum] = useState(editOrdMode?orderNumber:'')  
  const [orderDate, setOrderDate] = useState(editOrdMode?convertDate(orderDateCreated, true):new Date())  
  const [ordSubTotal, setOrdSubTotal] = useState(0)
  const [ordTotal, setOrdTotal] = useState(0)
  const [ordStatus, setOrdStatus] = useState(editOrdMode?orderStatus:"")
  const [ordProducts, setOrdProducts] = useState(editOrdMode?products:[])
  const [chosenProd, setChosenProd] = useState('')
  const [chosenSize, setChosenSize] = useState('')
  const [chosenColor, setChosenColor] = useState('')
  const [chosenQty, setChosenQty] = useState(1)
  const [chosenSubId, setChosenSubId] = useState('')
  const allowAddNew = !!chosenProd && !!chosenSize && !!chosenColor && !!chosenQty>0
  const newSubId = chosenProd+chosenSize+chosenColor
  const [editStyleMode, setEditStyleMode] = useState(false)
  const [customerId, setCustomerId] = useState(editOrdMode?customer.id:'')
  const [custName, setCustName] = useState(editOrdMode?customer.name:'')
  const [custEmail, setCustEmail] = useState(editOrdMode?customer.email:'')
  const [custPhone, setCustPhone] = useState(editOrdMode?customer.phone:'')
  const [custCity, setCustCity] = useState(editOrdMode?customer.city:'')
  const [custProvinceCountry, setCustProvinceCountry] = useState({})
  const [trackingNumber, setTrackingNumber] = useState(editOrdMode?trackingNum:'')
  const [sameAsShipping, setSameAsShipping] = useState(false)
  const [selectedShip, setSelectedShip] = useState(-1)
  const [ordUpdates, setOrdUpdates] = useState([])
  const [paypalOn, setPaypalOn] = useState(false)
  const [payCardNum, setPayCardNum] = useState('')
  const [payMethod, setPayMethod] = useState('')
  const [payEmail, setPayEmail] = useState('')
  const [showCustomerPicker, setShowCustomerPicker] = useState(false)
  const [selectCustIndex, setSelectCustIndex] = useState(-1)
  const [changeType, setChangeType] = useState(false)
  const allowCreate = genNum && orderDate && ordProducts.length && payEmail
  const history = useHistory()
  const location = useLocation()
   
  const tabshead = ['General', 'Products', 'Customer', 'Shipping', 'Billing & Payment', 'Updates']
  const statusOpts = [
    {name:'Received'},{name:'Processing'},{name:'Shipped'},{name:'Delivered'},{name:'Delayed'}
  ]
  const payMethodOpts = [
    {name:'PayPal'},{name:'Visa'},{name:'Master Card'},{name:'Debit'},{name:'American Express'}
  ]
  
  const entireOrder = {
    orderid: editOrdMode?orderid:db.collection('orders').doc().id,
    orderNumber: genNum,
    orderDateCreated: orderDate,
    orderTotal: ordTotal,
    orderStatus: ordStatus, 
    taxAmount: 0.15,
    trackingNum: trackingNumber,
    products: ordProducts,
    updates: ordUpdates,
    customer: {
      id: customerId.length?customerId:db.collection('users').doc().id,
      name: custName??getCustomerById(allCustomers, customerId)?.name??"",
      email: custEmail??getCustomerById(allCustomers, customerId)?.email??"",
      phone: custPhone??getCustomerById(allCustomers, customerId)?.phone??"",
      profimg: 'https://i.imgur.com/1OKoctC.jpg',
      city: custCity??getCustomerById(allCustomers, customerId).city??getCustomerById(allCustomers, customerId)?.city??"",
      provstate: custProvinceCountry.provstate??getCustomerById(allCustomers, customerId)?.provstate??"",
      country: custProvinceCountry.country??getCustomerById(allCustomers, customerId)?.country??"",
    },
    shippingDetails: shippingState,
    billingDetails: sameAsShipping ? shippingState : billingState,
    paymentDetails: {
      cardnumber: payCardNum??"",
      email: payEmail,
      method: payMethod,
      paymentId: db.collection('orders').doc().id
    },
    shippingMethod: allShipping[selectedShip<0?0:selectedShip]
  }

  const newOrdObj = {
    id:chosenProd,
    subid:newSubId,
    chosenSize,
    chosenColor,
    units:chosenQty
  }

  const orderProductsOpts = allProducts?.map(el => {
    return {name:el.name, value: el.id}
  })
  const tabsheadrow = tabshead?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => setTabPos(i)}
    >{el}<hr/></h5>
  })
  const productsrow = ordProducts?.map((el) => {
    return <div className={`prodsrow ${chosenSubId===(el.id+el.chosenSize+el.chosenColor) && editStyleMode?"active":""}`}>
      <div className="left">
        <img src={refProd(allProducts,el.id).imgs[0]} alt=""/>
        <h6>{refProd(allProducts,el.id).name}</h6>
        <span>(Size: {sizeConverter(el.chosenSize)}, Color: {colorConverter(el.chosenColor)})</span>
        <span>Qty: {el.units}</span>
      </div>
      <span className="actionsrow">
        <AdminBtn title={<i className="fal fa-edit"></i>} className="iconbtn" clickEvent onClick={() => editStyle(el)} />
        <AdminBtn title={<i className="fal fa-trash-alt"></i>} className="iconbtn delete" clickEvent onClick={() => deleteStyle(el)} />
      </span>
    </div>
  })

  const shippingMethodOpts = allShipping?.map((el,i) => {
    return <div className={`shippingoptbox ${selectedShip===i?"active":""}`}>
      <div>
        <h4>
        {el.name} 
        {selectedShip===i&&<small className="activebadge">Active</small>}
        </h4>
      </div>
      <div>
        <h6><span>Fee:</span> {currencyFormat.format(el.price)}</h6>
        <h6 className="upper"><span>Courrier:</span> {el.company}</h6>
        <h6><span>Ships to:</span> {el.countries.length>2?<small className="morecountries" title={el.countries.join(', ')}>{el.countries.slice(0,2).join(', ')+" + "+(el.countries.length-2)+" more"}</small>:el.countries.join(', ')}</h6>
      </div>
      <div>
        <AdminBtn title={selectedShip!==i?"Select":"Unselect"} solid clickEvent onClick={() => selectedShip!==i?setSelectedShip(i):setSelectedShip(-1)}/>
      </div>
    </div>
  })

  function generateId(amount1, amount2) {
    setGenNum(`${db.collection('orders').doc().id.slice(0,amount1)}-${db.collection('orders').doc().id.slice(0,amount2)}`)
  }
  function addNewProduct() {
    if(allowAddNew) { 
      if(ordProducts.findIndex(x => x.subid.includes(newSubId)) < 0) {
        setOrdProducts(prev => [...prev, newOrdObj])
        setChosenProd('')
        setChosenSize('')
        setChosenColor('')
        setChosenQty(1)
      }
      else 
        window.alert('You have already added this product style. Please add a different product choice or edit your selections.')
    }
    else 
      window.alert('Please fill in all required fields before adding a product to an order.')
  }
  function editNewProduct() {
    let itemindex = ordProducts.findIndex(x => x.subid === chosenSubId)
    ordProducts[itemindex] = newOrdObj
    setOrdProducts(prev => [...prev])
    setEditStyleMode(false)
    setChosenProd('')
    setChosenSubId('')
  }
  function deleteStyle(el) {
    const confirm = window.confirm('Are you sure you want to delete this product?')
    if(confirm) {
      let itemindex = ordProducts.findIndex(x => x.subid === el.subid)
      ordProducts.splice(itemindex, 1)
      setOrdProducts(prev => [...prev])
    }
  }
  function editStyle(el) {
    setEditStyleMode(true)
    setChosenSubId(el.id+el.chosenSize+el.chosenColor)
    setChosenProd(el.id)
    setChosenSize(el.chosenSize)
    setChosenColor(el.chosenColor)
    setChosenQty(el.units)
  }
  function cancelChoose() {
    setChosenProd('')
    setEditStyleMode(false)
  }
  function createOrder() {
    if(allowCreate) {
      db.collection('orders').doc(customerId).set({
        allorders: firebase.firestore.FieldValue.arrayUnion(entireOrder)
      },{merge:true}).then(() => {
        window.alert('The order has been successfully created.')
        history.push('/admin/orders')
      })
    }
    else {
      window.alert('Please fill in all the required fields (denoted by *)')
    }
  }
  function editOrder() {

  }
  function simpleDateConvert(date) {
    return `${date.toString().split(' ')[1]}
    ${date.toString().split(' ')[2]}
    ${date.toString().split(' ')[3]}`
  }

  useEffect(() => {
    !editOrdMode&&generateId(3,7) 
  },[])
  useEffect(() => {
    if(location.pathname.includes('/edit-order')) 
      setEditOrdMode(true)
    else
      setEditOrdMode(false)
  },[location])
  useEffect(() => {
    if(!editStyleMode) {
      setChosenSize('')
      setChosenColor('')
      setChosenQty(1) 
    }
  },[chosenProd])

  useEffect(() => {
    setOrdSubTotal(ordProducts?.reduce((a,b) => a + (refProd(allProducts, b.id).price * b.units),0))
  },[ordProducts])
  useEffect(() => {
    setOrdTotal(ordSubTotal + (ordSubTotal*taxRate))
  },[ordSubTotal])

  useEffect(() => {
      setPayMethod(paypalOn?'PayPal':'')
      setPayCardNum('')
  },[paypalOn])
  useEffect(() => {
    setPaypalOn(payMethod==='PayPal')
  },[payMethod])

  return (
    <div className="editorderspage">
      <PageTitle title={editOrdMode?"Edit An Order":"Create An Order"}/>
      <div className="pagecont">
        <h3 className="pagetitle">{editOrdMode?"Edit Order":"Create Order"}</h3>
        <div className="tabsbar">
          <div className="tabstitles"> 
            {tabsheadrow} 
          </div>
          <hr className="tabline"/>
        </div>
        <div className="ordercontent pagemaincontent">
          <div className="ordercontent-form">
            <div className={`editsection ${tabPos===0?"show":""}`}>
              <div>
                <AppInput title="Order Number" className="ordernuminp" placeholder="#123456" onChange={(e) => setGenNum(e.target.value)} value={genNum}/>
                <AdminBtn title="Generate" className="genbtn" solid clickEvent onClick={() => generateId(3,7)}/>
              </div>
              <AppInput title="Order Date" onFocus={() => setChangeType(true)} onBlur={() => setChangeType(false)} type={editOrdMode&&!changeType?"":"datetime-local"} onChange={(e) => setOrderDate(e.target.value)} value={orderDate.replace(/\s\s+/g, ' ')}/>
              <AppSelect title="Order Status" options={[{name:'Choose a Status',value:''},...statusOpts]} onChange={(e) => setOrdStatus(e.target.value)} value={ordStatus} namebased />
            </div>
            <div className={`editsection ${tabPos===1?"show":""}`}>
              <h4>Order Products</h4>
              <AppSelect 
                title="Available Products" 
                options={[{name:'Choose a product',value:''},...orderProductsOpts]} 
                onChange={(e) => setChosenProd(e.target.value)}
                value={chosenProd}
                namebased
              />
              <div className={`inprow ${chosenProd?"show":""}`}>
                <AppSelect title="Size" options={[{name:'Choose a Size',value:''},...sizesOpts]} onChange={(e) => setChosenSize(e.target.value)} value={chosenSize} namebased />
                <AppSelect title="Color" options={[{name:'Choose a Color',value:''},...colorsOpts]} onChange={(e) => setChosenColor(e.target.value)} value={chosenColor} namebased />
                <AppInput title="Quantity" type="number" min={0} onChange={(e) => setChosenQty(e.target.value)} value={chosenQty<0?0:chosenQty} />
              </div>
              <div className="actionbtns">
                <AdminBtn title={editStyleMode?"Edit Product":"Add Product"} disabled={!allowAddNew} clickEvent onClick={() => editStyleMode?editNewProduct():addNewProduct()}/>
                <AdminBtn title="Cancel" disabled={!chosenProd.length} clickEvent onClick={() => cancelChoose()}/>
              </div>
              <div className={`savedprodscont ${ordProducts.length?"show":"hide"}`}>
                <h4>Products in your Order:</h4>
                {productsrow}
              </div>
            </div>
            <div className={`editsection ${tabPos===2?"show":""}`}>
              <h4>Customer Info</h4>
              <AdminBtn title="Find Customer" solid clickEvent onClick={() => setShowCustomerPicker(prev => !prev)}/>
              <h5 style={{color: '#777'}}>-OR-</h5>
              <h6 className="cusidmsg">Manually enter a customer's information (a customer ID will automatically be assigned.)</h6>
              <AppInput title="Full Name" onChange={(e) => setCustName(e.target.value)} value={custName} />
              <AppInput title="Email" onChange={(e) => setCustEmail(e.target.value)} value={custEmail}/>
              <AppInput title="Phone" onChange={(e) => setCustPhone(e.target.value)} value={custPhone}/>
              <AppInput title="City" onChange={(e) => setCustCity(e.target.value)} value={custCity}/>
              <ProvinceCountry setState={setCustProvinceCountry} />
            </div>
            <div className={`editsection ${tabPos===3?"show":""}`}>
              <h4>Shipping Address</h4>
              <BillingShippingFields setBillShipState={setShippingState} />
              <h4>Shipping Methods</h4>
              <div className="shippingmethods">
                {shippingMethodOpts}
                <Link to="/admin/store/add-shipping/" onClick={() => setEditShipMode(false)}>Create More Shipping Method Here</Link>
              </div>
              <h4>Tracking</h4>
              <AppInput title="Tracking Number *" onChange={(e) => setTrackingNumber(e.target.value)} value={trackingNumber}/>
              <AppInput title="Tracking Return Code" onChange={(e) => null} />
            </div>
            <div className={`editsection ${tabPos===4?"show":""}`}>
              <h4>Billing Details</h4>
              <AppSwitch title="Same As Shipping Details?" className="inprow show" onChange={(e) => setSameAsShipping(e.target.checked)}/>
              { !sameAsShipping?
                <BillingShippingFields setBillShipState={setBillingState} />:
                <h5 className="note">Billing Details: Same as shipping details</h5>
              }
              <h4>Payment Information</h4>
              <div className="ordpaymentsform">
                <AppSwitch title="PayPal" onChange={(e) => setPaypalOn(e.target.checked)} checked={paypalOn}/>
                <AppInput title="Card Number" className="cardnum" disabled={paypalOn} onChange={(e) => setPayCardNum(e.target.value)} value={payCardNum}/>
                <AppSelect title="Payment Method" options={[{name:'Choose a Method',value:''},...payMethodOpts]} onChange={(e) => setPayMethod(e.target.value)} value={payMethod} namebased/>
                <AppInput title="Email" onChange={(e) => setPayEmail(e.target.value)} value={payEmail} />
              </div>
            </div>
            <div className={`editsection ${tabPos===5?"show":""}`}>
              <OrderUpdates statusOpts={statusOpts} ordUpdates={ordUpdates} setOrdUpdates={setOrdUpdates} />
            </div>
            <div className="final actionbtns">
              <AdminBtn title={editOrdMode?"Edit Order":"Create Order"} disabled={!allowCreate} solid clickEvent onClick={() => !editOrdMode?createOrder():editOrder()}/>
              <AdminBtn title="Cancel" url="/admin/orders"/>
            </div>
          </div>
          <div className="ordercontent-details">
            <div className="detailscontent">
              <h4>Order Details</h4> 
              <h5><span>Order Number</span><span className="ordernuminp">#{genNum}</span></h5>
              <h5><span>Order Date</span><span>{typeof orderDate === 'object'?simpleDateConvert(orderDate):orderDate.split('T')[0]}</span></h5>
              <h5><span>Products</span><span>{ordProducts.length}</span></h5>
              <h5><span>Order Subtotal</span><span>{currencyFormat.format(ordSubTotal)}</span></h5>
              <h5><span>Order Total</span><span>{currencyFormat.format(ordTotal)}</span></h5>
              <h5><span>Shipping</span>{allShipping[selectedShip<0?0:selectedShip].name} ({currencyFormat.format(allShipping[selectedShip<0?0:selectedShip].price)})</h5>
              <h5><span>Order Updates</span>{ordUpdates.length}</h5>
            </div>
          </div>
        </div> 
      </div>
      <CustomerPicker 
        setShowCustomerPicker={setShowCustomerPicker} 
        showCustomerPicker={showCustomerPicker} 
        selectCustIndex={selectCustIndex}
        setSelectCustIndex={setSelectCustIndex}
        setCustomerId={setCustomerId}
        setCustName={setCustName}
        setCustEmail={setCustEmail}
        setCustPhone={setCustPhone}
        setCustCity={setCustCity}
        setCustProvinceCountry={setCustProvinceCountry}
      />
    </div>
  )
}