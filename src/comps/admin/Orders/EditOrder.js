import React, { useContext, useEffect, useState } from 'react'
import './styles/Orders.css'
import {StoreContext} from '../../common/StoreContext'
import {AppInput, AppSelect, AppSwitch} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import firebase from 'firebase'
import {db} from '../../common/Fire'
import refProd from '../../common/referProduct'
import {sizeConverter, colorConverter, getCustomerById} from '../../common/UtilityFuncs'
import BillingShippingFields from './BillingShippingFields'
import { Link, useHistory, useLocation } from 'react-router-dom'
import PageTitle from '../common/PageTitle'
import OrderUpdates from './OrderUpdates'
import CustomerPicker from './CustomerPicker'
import {convertDate} from '../../common/UtilityFuncs'
import genRandomNum from '../../common/genRandomNum'
import RegionCountry from '../../common/RegionCountry'
 
export default function EditOrder(props) { 

  const {editOrdMode, setEditOrdMode, allProducts, allShipping, sizesOpts, colorsOpts, currencyFormat, 
    setEditShipMode, billingState, setBillingState, shippingState, setShippingState, taxRate, allCustomers, 
  allOrders, percentFormat, setNotifs} = useContext(StoreContext)
  const {orderid, orderNumber, orderDateCreated, products, customer, orderTaxRate, trackingNum, shippingDetails,
     billingDetails, shippingMethod, paymentDetails, updates, trackingReturn, orderSubtotal} = editOrdMode&&props.el
  const [tabPos, setTabPos] = useState(0)
  const [orderNum, setOrderNum] = useState('')  
  const [ordTaxRate, setOrdTaxRate] = useState(taxRate)
  const [ordSubTotal, setOrdSubTotal] = useState(0) 
  const [ordProducts, setOrdProducts] = useState([])
  const [chosenProd, setChosenProd] = useState('')
  const [chosenSize, setChosenSize] = useState('')
  const [chosenColor, setChosenColor] = useState('')
  const [chosenQty, setChosenQty] = useState(1)
  const [chosenSubId, setChosenSubId] = useState('')
  const allowAddNew = !!chosenProd && !!chosenSize && !!chosenColor && !!chosenQty>0
  const newSubId = chosenProd+chosenSize+chosenColor
  const [editStyleMode, setEditStyleMode] = useState(false)
  const [customerId, setCustomerId] = useState('')
  const [custName, setCustName] = useState('')
  const [custEmail, setCustEmail] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custCity, setCustCity] = useState('')
  const [custRegion, setCustRegion] = useState('')
  const [custCountry, setCustCountry] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackReturn, setTrackReturn] = useState('')
  const [sameAsShipping, setSameAsShipping] = useState(false)
  const [selectedShip, setSelectedShip] = useState(-1)
  const [billRegion, setBillRegion] = useState('')
  const [billCountry, setBillCountry] = useState('')
  const [shipRegion, setShipRegion] = useState('')
  const [shipCountry, setShipCountry] = useState('')
  const [ordUpdates, setOrdUpdates] = useState([])
  const [paypalOn, setPaypalOn] = useState(false)
  const [payCardNum, setPayCardNum] = useState('')
  const [payMethod, setPayMethod] = useState('')
  const [payEmail, setPayEmail] = useState('')
  const [showCustomerPicker, setShowCustomerPicker] = useState(false)
  const [selectCustIndex, setSelectCustIndex] = useState(-1)
  const [custProvinceChoices, setCustProvinceChoices] = useState([])
  const [billProvinceChoices, setBillProvinceChoices] = useState([])
  const [shipProvinceChoices, setShipProvinceChoices] = useState([])
  const allowCreate = orderNum && ordProducts.length && payEmail && (customerId.length > 0 || (custName.length > 0 && custEmail.length > 0))
  const history = useHistory()
  const location = useLocation()
  const genNewOrderId = db.collection('orders').doc().id
  const pagetitle = editOrdMode?"Edit An Order":"Create An Order"
   
  const tabshead = ['General', 'Products', 'Customer', 'Shipping', 'Billing & Payment', 'Updates']
  const statusOpts = [
    {name:'Received'},{name:'Processing'},{name:'Shipped'},{name:'Delivered'},{name:'Delayed'}
  ]
  const payMethodOpts = [
    {name:'PayPal'},{name:'Visa'},{name:'Master Card'},{name:'Debit'},{name:'American Express'}
  ]
  
  const entireOrder = { 
    orderid: editOrdMode?orderid:genNewOrderId,
    orderNumber: orderNum,
    orderDateCreated: new Date(),
    orderSubtotal: ordSubTotal,
    orderTotal: (ordSubTotal + (ordSubTotal*ordTaxRate)),
    orderTaxRate: ordTaxRate,
    trackingNum: trackingNumber,
    trackingReturn: editOrdMode?trackingReturn:'',
    products: ordProducts,
    updates: ordUpdates,
    customer: { 
      id: customerId.length?customerId:db.collection('customers').doc().id,
      name: custName??getCustomerById(allCustomers, customerId)?.name??"",
      email: custEmail??getCustomerById(allCustomers, customerId)?.email??"",
      phone: custPhone??getCustomerById(allCustomers, customerId)?.phone??"",
      profimg: 'https://i.imgur.com/1OKoctC.jpg',
      city: custCity??getCustomerById(allCustomers, customerId).city??getCustomerById(allCustomers, customerId)?.city??"",
      provState: custRegion??getCustomerById(allCustomers, customerId)?.provState??"",
      country: custCountry??getCustomerById(allCustomers, customerId)?.country??"",
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

  const newProdObj = {
    id:chosenProd,
    subid:newSubId,
    chosenSize,
    chosenColor,
    units: +chosenQty
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
          {selectedShip === i && <small className="activebadge">Active</small>}
        </h4>
      </div>
      <div>
        <h6><span>Fee:</span> {currencyFormat.format(el.price)}</h6>
        <h6 className="upper"><span>Courrier:</span> {el.company}</h6>
        <h6><span>Ships to:</span> {el.countries.length > 2 ? <small className="morecountries" title={el.countries.join(', ')}>{el.countries.slice(0, 2).join(', ') + " + " + (el.countries.length - 2) + " more"}</small> : el.countries.join(', ')}</h6>
      </div>
      <div>
        <AdminBtn title={selectedShip !== i ? "Select" : "Unselect"} solid clickEvent onClick={() => selectedShip !== i ? setSelectedShip(i) : setSelectedShip(-1)} />
      </div>
    </div>
  })

  function generateId() {
    setOrderNum(genRandomNum())
  }
  function addNewProduct() {
    if(allowAddNew) { 
      if(ordProducts.findIndex(x => x.subid.includes(newSubId)) < 0) {
        setOrdProducts(prev => [...prev, newProdObj])
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
    ordProducts[itemindex] = newProdObj
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
      }, {merge:true}).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Order Created',
          icon: 'fal fa-plus',
          text: `The order has been successfully created`,
          time: 5000
        }])
        history.push('/admin/orders')
      })
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all fields denoted with a *`,
        time: 5000
      }])
    }
  }

  function editOrder() {
    if(allowCreate) {
      let itemindex = allOrders.findIndex(x => x.orderid === orderid)
      allOrders[itemindex] = entireOrder
      db.collection('orders').doc(customerId).update({
        allorders: allOrders
      }).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Order Saved',
          icon: 'fal fa-save',
          text: `The order has been saved`,
          time: 5000
        }])
        history.push('/admin/orders')
      })
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all fields denoted with a *`,
        time: 5000
      }])
    }
  }
  function deleteOrder() {
    let confirm = window.confirm('Are you sure you wish to delete this order?')
    if(confirm) {
      let itemindex = allOrders.findIndex(x => x.orderid === orderid)
      allOrders.splice(itemindex, 1)
      db.collection('orders').doc(customerId).update({
        allorders: allOrders
      })
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Order Deleted',
          icon: 'fal fa-trash-alt',
          text: `The order has been deleted from your store`,
          time: 5000
        }])
        history.push('/admin/orders')
      })
    }
  }

  useEffect(() => {
    setOrderNum(editOrdMode?orderNumber:generateId())
    setOrdSubTotal(editOrdMode?orderSubtotal:"")
    setOrdTaxRate(editOrdMode?orderTaxRate:taxRate)
    setOrdProducts(editOrdMode?products:[])
    setCustomerId(editOrdMode?customer.id:"")
    setCustName(editOrdMode?customer.name:'')
    setCustEmail(editOrdMode?customer.email:'')
    setCustPhone(editOrdMode?customer.phone:'') 
    setCustCity(editOrdMode?customer.city:'')
    setCustRegion(editOrdMode?customer.provState:"")
    setCustCountry(editOrdMode?customer.country:"")
    setTrackingNumber(editOrdMode?trackingNum:"")
    setTrackReturn(editOrdMode?trackingReturn:"") 
    setSameAsShipping(editOrdMode?shippingDetails.address===billingDetails.address:"")
    setSelectedShip(editOrdMode?allShipping.findIndex(x => x.name===shippingMethod.name):-1)
    setOrdUpdates(editOrdMode?updates:[])
    setPaypalOn(editOrdMode?paymentDetails.method==='PayPal':false)
    setPayCardNum(editOrdMode?paymentDetails.cardnumber:'')
    setPayMethod(editOrdMode?paymentDetails.method:'')
    setPayEmail(editOrdMode?paymentDetails.email:'')
  },[editOrdMode])

  useEffect(() => {
    setOrdTaxRate(editOrdMode?orderTaxRate:taxRate)
  },[taxRate])

  useEffect(() => {
    !editOrdMode&&generateId(3,7) 
    return () => setEditOrdMode(false)  
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
      setPayMethod(paypalOn?'PayPal':'')
      setPayCardNum('')
  },[paypalOn])
  useEffect(() => {
    !editOrdMode&&setPaypalOn(payMethod==='PayPal')
  },[payMethod])

  return (
    <div className="editorderspage">
      <PageTitle title={pagetitle}/>
      <div className="pagecont">
        <h3 className="pagetitle">{pagetitle}</h3>
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
                <AppInput title="Order Number" className="ordernuminp" placeholder="#123456" onChange={(e) => setOrderNum(e.target.value)} value={orderNum}/>
                <AdminBtn title="Generate" className="genbtn" solid clickEvent onClick={() => generateId()}/>
              </div>
              <AppInput title="Order Date" disabled value={editOrdMode?convertDate(orderDateCreated.seconds?orderDateCreated.toDate():orderDateCreated):convertDate(new Date())}/>            
              <AppInput title="Order Tax Rate" onChange={(e) => setOrdTaxRate(e.target.value)} value={ordTaxRate} type="number" />
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
              <RegionCountry 
                setCountry={setCustCountry} 
                setRegion={setCustRegion} 
                country={custCountry} 
                region={custRegion} 
                provinceChoices={custProvinceChoices} 
                setProvinceChoices={setCustProvinceChoices} 
              />
            </div>
            <div className={`editsection ${tabPos===3?"show":""}`}>
              <h4>Shipping Address</h4>
              <BillingShippingFields 
                setBillShipState={setShippingState} 
                region={shipRegion} 
                setRegion={setShipRegion} 
                country={shipCountry}
                setCountry={setShipCountry}
                provinceChoices={billProvinceChoices} 
                setProvinceChoices={setBillProvinceChoices}
                formDetails={shippingDetails} 
              />
              <h4>Shipping Methods</h4>
              <div className="shippingmethods">
                {shippingMethodOpts}
                <Link to="/admin/store/add-shipping/" onClick={() => setEditShipMode(false)}>Create More Shipping Method Here</Link>
              </div>
              <h4>Tracking</h4>
              <AppInput title="Tracking Number *" onChange={(e) => setTrackingNumber(e.target.value)} value={trackingNumber}/>
              <AppInput title="Tracking Return Code" onChange={(e) => setTrackReturn(e.target.value)} value={trackReturn} />
            </div>
            <div className={`editsection ${tabPos===4?"show":""}`}>
              <h4>Billing Details</h4>
              <AppSwitch title="Same As Shipping Details?" className="inprow show" onChange={(e) => setSameAsShipping(e.target.checked)} checked={sameAsShipping}/>
              { !sameAsShipping?
                <BillingShippingFields 
                  setBillShipState={setBillingState} 
                  region={billRegion} 
                  setRegion={setBillRegion} 
                  country={billCountry}
                  setCountry={setBillCountry} 
                  provinceChoices={shipProvinceChoices} 
                  setProvinceChoices={setShipProvinceChoices}
                  formDetails={billingDetails}
                />:
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
              <AdminBtn title={editOrdMode?"Edit Order":"Create Order"} className={!allowCreate?"disabled":""} solid clickEvent onClick={() => !editOrdMode?createOrder():editOrder()}/>
              {editOrdMode&&<AdminBtn title="Delete Order" solid className="deletebtn" clickEvent onClick={() => deleteOrder()}/>}
              <AdminBtn title="Cancel" url="/admin/orders"/>
            </div>
          </div>
          <div className="ordercontent-details">
            <div className="detailscontent">
              <h4>Order Details</h4> 
              <h5><span>Order Number</span><span className="ordernuminp">#{orderNum}</span></h5>
              <h5><span>Order Date</span><span>{editOrdMode?convertDate(orderDateCreated.seconds?orderDateCreated.toDate():orderDateCreated):convertDate(new Date())}</span></h5>
              <h5><span>Products</span><span>{ordProducts.length}</span></h5>
              <h5><span>Order Subtotal</span><span>{currencyFormat.format(ordSubTotal)}</span></h5>
              <h5><span>Order Tax Rate</span>{percentFormat.format(ordTaxRate)}</h5>
              <h5><span>Order Total</span><span>{currencyFormat.format((ordSubTotal+(ordSubTotal*ordTaxRate)))}</span></h5>
              <h5><span>Shipping</span>{allShipping[selectedShip<0?0:selectedShip].name} ({currencyFormat.format(allShipping[selectedShip<0?0:selectedShip].price)})</h5>
              <h5><span>Order Updates</span>{ordUpdates.length}</h5>
              <h5><span>Customer</span>{custName}</h5>
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
        setCustRegion={setCustRegion}
        setCustCountry={setCustCountry}
      />
    </div>
  )
}