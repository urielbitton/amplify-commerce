import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import PageTitle from '../common/PageTitle'
import PageTitlesRow from '../common/PageTitlesRow'
import { transHeaders } from './arrays/arrays'
import {convertDate, getCustomerArrById, getOrderArrById} from '../../common/UtilityFuncs'
import { Link } from 'react-router-dom'
import PageStarter from '../common/PageStarter'

export default function Transactions() {

  const {allTransactions, currencyFormat, allCustomers, allOrders} = useContext(StoreContext)
  const [showOpts, setShowOpts] = useState(-1)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const reduceTotal = allTransactions.reduce((a,b) => a + b.total, 0)
  const showTable = allTransactions.length?"block":"none"

  const headersrow = transHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  })

  const allTransactionsRow = allTransactions?.map((el,i) => {
    return <div className="proditem">
      <h5>#{el.number}</h5>
      <h5><Link to={`/admin/orders/edit-order/${el.orderId}`}>#{getOrderArrById(allOrders, el.orderId)?.orderNumber}</Link></h5>
      <h5>{getCustomerArrById(allCustomers, el.customerId)?.name}</h5>
      <h5>****{el.cardNumber.slice(-4)}</h5>
      <h5>{currencyFormat.format(el.total)}</h5>
      <h5>{convertDate(el.date.toDate())}</h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div title="Edit Order" className="disabled"><i className="far fa-edit"></i></div>
          <div title="Delete Order" className="disabled"><i className="far fa-trash-alt"></i></div>
          <div title="Transaction Info" onClick={() => infoTrans()}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function infoTrans() {

  }

  useEffect(() => {
    window.onclick = () => setShowOpts(-1)
  },[])

  return (
    <div className="transactionspage longidpage">
      <PageTitle title="Transactions"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Transactions"
          searchPlaceholder="Find a transaction"
          setKeyword={setKeyword}
        />
        <PageStarter 
          subtitle="You have no transactions yet."
          title={<>Transactions will show<br/> when users create orders</>}
          img="https://i.imgur.com/eM7Ae5F.png"
          hide={allTransactions.length}
        />
        <div className="productstablecont" style={{display:showTable}}>
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allTransactionsRow}
            </div>
            <div className="foot">
              <h5><span>{allTransactions.length}</span> Transaction{allTransactions.length>1?'s':""}</h5>
              <h5><span>{currencyFormat.format(reduceTotal)}</span> total amount</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}