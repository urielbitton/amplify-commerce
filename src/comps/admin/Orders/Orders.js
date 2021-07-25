import React, {useContext, useEffect, useState} from 'react'
import { StoreContext } from '../../common/StoreContext'
import {ordHeaders} from './arrays/arrays'
import './styles/Orders.css'
import { Link, useHistory } from 'react-router-dom'
import refProd from '../../common/referProduct'
import {convertDate} from '../../common/UtilityFuncs'
import PageTitle from '../common/PageTitle'
import { db } from '../../common/Fire'
import PageTitlesRow from '../common/PageTitlesRow'

export default function Orders() {

  const {allOrders, allProducts, currencyFormat, setEditOrdMode, setNotifs} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(-1)
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

  const allOrdersRow = allOrdersFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5><Link to={`/admin/orders/edit-order/${el.orderid}`}>#{el.orderNumber}</Link></h5>
      <h5>{el.customer.name}</h5>
      <h5 title={el.products.length>1&&`+ ${el.products.length-1} more`}>{refProd(allProducts, el.products[0].id).name}</h5>  
      <h5>#{el.trackingNum}</h5>
      <h5>{convertDate(el.orderDateCreated.toDate())}</h5>
      <h5>{currencyFormat.format(el.orderTotal)}</h5> 
      <h5 className="ordstatus">
        <span title={el.updates[el.updates.length-1].action}>{el.updates[el.updates.length-1].status}</span>
      </h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div title="Edit Order" onClick={() => editOrder(el.orderid)}><i className="far fa-edit"></i></div>
          <div title="Delete Order" onClick={() => deleteOrder(el.orderid, el.customer.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Order Info" onClick={() => infoOrder()}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function editOrder(orderid) {
    setEditOrdMode(true)
    history.push(`/admin/orders/edit-order/${orderid}`)
  }
  function deleteOrder(orderid, customerId) {
    let confirm = window.confirm('Are you sure you wish to delete this order?')
    if(confirm) {
      db.collection('orders').doc(orderid).delete()
      .then(() => setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Order Deleted',
        color: 'var(--red)',
        icon: 'fal fa-shopping-bag',
        text: `The order has been deleted from your store`,
        time: 5000
      }]))
    }
  }
  function infoOrder() {

  } 

  useEffect(() => {
    window.onclick = () => setShowOpts(-1)
  },[])

  return (
    <div className="orderspage longidpage">
      <PageTitle title="Orders"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Orders"
          btnTitle="New Order"
          btnUrl="/admin/orders/add-order"
          searchPlaceholder="Find a Order"
          setKeyword={setKeyword}
        />
        <div className="productstablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allOrdersRow}
            </div>
            <div className="foot">
              <h5><span>{allOrdersFilter.length}</span> total order{allOrdersFilter.length>1?"s":""}</h5>
              <h5><span>{currencyFormat.format(allOrdersFilter.reduce((a,b) => a + b.orderTotal,0))} </span>Order Totals</h5>
              <h5><span>{allOrdersFilter.reduce((a,b) => a + b.products.length,0)} </span>Order Products</h5>
              <h5><span>{allOrdersFilter.reduce((a,b) => a + (b.updates[b.updates.length-1].status==='Delayed'?1:0),0)} </span>Delayed Orders</h5>
              <h5><span>{allOrdersFilter.reduce((a,b) => a + (b.updates[b.updates.length-1].status==='Delivered'?1:0),0)} </span>Delivered Orders</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}