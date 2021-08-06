import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import PageStarter from '../common/PageStarter'
import PageTitle from '../common/PageTitle'
import PageTitlesRow from '../common/PageTitlesRow'
import { custHeaders } from './arrays/arrays'

export default function Customers() {
 
  const {allCustomers, setEditCustMode, currencyFormat, setNotifs} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(-1)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allCustFilter = allCustomers?.filter(x => (pattern.test(x.name) || x.number === keyword
    || pattern.test(x.email) || pattern.test(x.phone)))
  const history = useHistory()
  const reduceMoneySpent = allCustFilter?.reduce((a,b) => a + b.moneySpent, 0)
  const showTable = allCustomers.length?"block":"none"
 
  const headersrow = custHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  const allCustsRow = allCustFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5 title={`Customer Number: ${el.number}`} className="custimg">
        <Link to={`/admin/customer/${el.id}`}><img src={el.profimg} alt=""/></Link>
      </h5>
      <h5><Link to={`/admin/customer/${el.id}`}>{el.name}</Link></h5>
      <h5><a className="hoverable" href={`mailto:${el.email}`}>{el.email}</a></h5>
      <h5>{el.phone}</h5>
      <h5>{el.city}</h5>
      <h5>{el.provState}</h5>
      <h5>{el.country}</h5>
      <h5>{currencyFormat.format(el.moneySpent)}</h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div title="Edit Customer" onClick={() => editCustomer(el.id)}><i className="far fa-edit"></i></div>
          <div title="Delete Customer" onClick={() => deleteCustomer(el.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Customer Info" onClick={() => infoCustomer(el.id)}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function editCustomer(custid) {
    setEditCustMode(true)
    history.push(`/admin/customers/edit-customer/${custid}`)
  }
  function deleteCustomer(custid) {
    let confirm = window.confirm('Are you sure you wish to delete this customer?')
    if(confirm) {
      db.collection('customers').doc(custid).delete()
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Customer Deleted',
          icon: 'fal fa-trash-alt',
          text: `The customer has been saved.`,
          time: 5000
        }])
      })
    }
  }
  function infoCustomer(customerid) {
    history.push(`/admin/customer/${customerid}`)
  }

  useEffect(() => {
    window.onclick = () => setShowOpts(-1)
  },[])

  return (
    <div className="customerspage longidpage">
      <PageTitle title="Customers"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Customers"
          btnTitle="New Customer"
          btnUrl="/admin/customers/add-customer"
          searchPlaceholder="Find a Customer"
          setKeyword={setKeyword}
        />
        <PageStarter 
          subtitle="You have no customers yet."
          title="Create a Customer"
          img="https://i.imgur.com/TpkcDHL.png"
          btnText="Create Customer"
          btnUrl="/admin/customers/add-customer"
          hide={allCustomers.length}
        />
        <div className="customerstablecont" style={{display:showTable}}>
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allCustsRow}
            </div>
            <div className="foot">
              <h5><span>{allCustFilter.length}</span> Customer{allCustFilter.length>1?'s':''}</h5>
              <h5><span>{currencyFormat.format(reduceMoneySpent)}</span> total money spent</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}