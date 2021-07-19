import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import PageTitle from '../common/PageTitle'
import PageTitlesRow from '../common/PageTitlesRow'
import { transHeaders } from './arrays/arrays'
import {convertDate} from '../../common/UtilityFuncs'

export default function Transactions() {

  const {allTransactions, currencyFormat} = useContext(StoreContext)
  const [showOpts, setShowOpts] = useState(-1)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')

  const headersrow = transHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  })

  const allTransactionsRow = allTransactions?.map((el,i) => {
    return <div className="proditem">
      <h5>#{el.number}</h5>
      <h5>#{el.orderNumber}</h5>
      <h5>{el.customerName}</h5>
      <h5>****{el.cardNumber.slice(-4)}</h5>
      <h5>{currencyFormat.format(el.total)}</h5>
      <h5>{convertDate(el.date.toDate())}</h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div title="Edit Transaction" onClick={() => editTrans(el.id)}><i className="far fa-edit"></i></div>
          <div title="Delete Transaction" onClick={() => deleteTrans(el.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Transaction Info" onClick={() => infoTrans()}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function editTrans(transid) {

  }
  function deleteTrans(transid) {

  }
  function infoTrans() {

  }

  useEffect(() => {
    window.onclick = () => setShowOpts(-1)
  },[])

  return (
    <div className="transactionspage">
      <PageTitle title="Transactions"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Transactions"
          btnTitle="Add Transaction"
          btnUrl="/admin/transactions/add-transaction"
          searchPlaceholder="Find a transaction"
          setKeyword={setKeyword}
        />
        <div className="productstablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allTransactionsRow}
            </div>
            <div className="foot">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}