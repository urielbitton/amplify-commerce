import React, { useContext, useEffect, useState } from 'react'
import './styles/Orders.css'
import {StoreContext} from '../../common/StoreContext'
import {AppInput, AppSelect} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {db} from '../../common/Fire'
import refProd from '../../common/referProduct'
import {sizeConverter, colorConverter} from '../../common/UtilityFuncs'

export default function EditOrder(props) {

  const {editOrdMode, allProducts, sizesOpts, colorsOpts, currencyFormat} = useContext(StoreContext)
  const {orderid} = editOrdMode&&props.el
  const date = new Date()
  const nowDateTime = `${date.getFullYear()}-${date.getMonth()<10?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+(date.getDate()):(date.getDate())}T${date.getHours()<10?"0"+date.getHours():date.getHours()}:${date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()}`
  const [tabPos, setTabPos] = useState(0)
  const [genNum, setGenNum] = useState('') 
  const [orderDate, setOrderDate] = useState(nowDateTime)
  const [ordTotal, setOrdTotal] = useState(0)
  const [ordStatus, setOrdStatus] = useState('')
  const [ordProducts, setOrdProducts] = useState([])
  const [chosenProd, setChosenProd] = useState('')
  const [chosenSize, setChosenSize] = useState('')
  const [chosenColor, setChosenColor] = useState('')
  const [chosenQty, setChosenQty] = useState(1)
  const allowAddNew = chosenProd && chosenSize && chosenColor && chosenQty>0

  const tabshead = ['General', 'Products', 'Customer', 'Billing & Payment', 'Shipping']
  const statusOpts = [
    {name:'Received'},{name:'Processing'},{name:'Shipped'},{name:'Delivered'},{name:'Delayed'}
  ]

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
    return <div className="prodsrow">
      <img src={refProd(allProducts,el.id).imgs[0]} alt=""/>
      <h6>{refProd(allProducts,el.id).name}</h6>
      <span>(Size: {sizeConverter(el.chosenSize)}, Color: {colorConverter(el.chosenColor)})</span>
      <span>Qty: {el.units}</span>
      <span className="actionsrow">
        <AdminBtn title={<i className="fal fa-edit"></i>} className="iconbtn" />
        <AdminBtn title={<i className="fal fa-trash-alt"></i>} className="iconbtn delete" />
      </span>
    </div>
  })

  function generateId(amount1, amount2) {
    setGenNum(`${db.collection('orders').doc().id.slice(0,amount1)}-${db.collection('orders').doc().id.slice(0,amount2)}`)
  }
  function addNewProduct() {
    if(allowAddNew) {
      if(!ordProducts.filter(x => x.subid.includes(chosenProd+chosenSize+chosenColor))) {
        setOrdProducts(prev => [...prev, {
          id:chosenProd,
          subid:chosenProd+chosenSize+chosenColor,
          chosenSize,
          chosenColor,
          units:chosenQty
        }])
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

  useEffect(() => {
    generateId(3,7)
  },[])

  useEffect(() => {
    setChosenSize('')
    setChosenColor('')
    setChosenQty(1)
  },[chosenProd])
 
  return (
    <div className="editorderspage">
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
              <AppInput title="Order Date" type="datetime-local" onChange={(e) => setOrderDate(e.target.value)} value={orderDate}/>
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
                <AdminBtn title="Add Product" disabled={!allowAddNew} clickEvent onClick={() => addNewProduct()}/>
              </div>
              <div className={`savedprodscont ${ordProducts.length?"show":"hide"}`}>
                <h4>Products in your Order:</h4>
                {productsrow}
              </div>
            </div>
            <div className={`editsection ${tabPos===2?"show":""}`}>
              <h4>Customer Info</h4>
              <AppInput title="Name"/>
            </div>
            <div className={`editsection ${tabPos===3?"show":""}`}>
              <h4>Billing & Payment</h4>
              <AppInput title="Name"/>
            </div>
            <div className={`editsection ${tabPos===4?"show":""}`}>
              <h4>Shipping Details</h4>
              <AppInput title="Tracking Number" type="number"/>
            </div>

            <div className="final actionbtns">
              <AdminBtn title="Create Order" solid/>
              <AdminBtn title="Cancel"/>
            </div>
          </div>
          <div className="ordercontent-details">
            <div className="detailscontent">
              <h4>Order Details</h4>
              <h5><span>Order Number</span><span className="ordernuminp">#{genNum}</span></h5>
              <h5><span>Order Date</span><span>{orderDate.replace('T',' ')}</span></h5>
              <h5><span>Products</span><span>{ordProducts.length}</span></h5>
              <h5><span>Order Total</span><span>{currencyFormat.format(ordTotal)}</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}