import React, {useContext, useEffect, useState} from 'react'
import { StoreContext } from '../../common/StoreContext'
import {ordHeaders} from './arrays/arrays'
import AdminBtn from '../common/AdminBtn'
import { AppInput } from '../../common/AppInputs'
import './styles/Orders.css'
import { useHistory } from 'react-router-dom'
import refProd from '../../common/referProduct'
import convertDate from '../utilities/convertDate'

export default function Orders() {

  const {allOrders, allProducts, currencyFormat} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(0)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allOrdersFilter = allOrders?.filter(x => (pattern.test(x.orderTotal) || x.orderid === keyword
    || pattern.test(x.customer.name) || pattern.test(x.orderStatus)))
  const history = useHistory()

  const headersrow = ordHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  function editOrder(orderid) {
    history.push(`/admin/orders/edit-order/${orderid}`)
  }
  function deleteOrder() {

  }
  function infoOrder() {

  }

  const allOrdersRow = allOrdersFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5>#{el.orderid.slice(0,8)}</h5>
      <h5>{el.customer.name}</h5>
      <h5>{refProd(allProducts, el.products[0].id).name} {el.products.length>1&&`+ ${el.products.length-1} more`}</h5>  
      <h5>#{el.trackingNum}</h5>
      <h5>{convertDate(el.orderDateCreated)}</h5>
      <h5>{currencyFormat.format(el.orderTotal)}</h5>
      <h5>{el.orderStatus}</h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===el.id?0:el.id);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${el.id===showOpts?"show":""}`}> 
          <div title="Edit Order" onClick={() => editOrder(el.id)}><i className="far fa-edit"></i></div>
          <div title="Delete Order" onClick={() => deleteOrder(el.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Order Info" onClick={() => infoOrder()}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  }) 

  useEffect(() => {
    window.onclick = () => setShowOpts(0)
  },[])

  return (
    <div className="orderspage">
      <div className="pagecont">
        <div className="titlesrow">
          <h4>Orders</h4>
          <div className="flex">
            <AdminBtn title="New Order" url="/admin/orders/add-order"/>
            <AppInput 
              placeholder="Find an Order" 
              iconclass="fal fa-search" 
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className="productstablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allOrdersRow}
            </div>
            <div className="foot">
              <h5><span>{allOrdersFilter.length}</span> order{allOrdersFilter.length>1?"s":""}</h5>
              <h5><span>{currencyFormat.format(allOrdersFilter.reduce((a,b) => a + b.orderTotal,0))} </span>Order Totals</h5>
              <h5><span>{allOrdersFilter.reduce((a,b) => a + b.products.length,0)} </span>Order Products</h5>
              <h5><span>{allOrdersFilter.reduce((a,b) => a + b.orderStatus&&1,0)} </span>Delivered Orders</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}