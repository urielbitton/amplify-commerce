import React, {useContext, useEffect, useState} from 'react'
import { StoreContext } from '../../common/StoreContext'
import {shipHeaders} from './arrays/arrays'
import { useHistory } from 'react-router-dom'
import { db } from '../../common/Fire'
import PageTitle from '../common/PageTitle'
import PageTitlesRow from '../common/PageTitlesRow'

export default function Shipping() {

  const {setEditShipMode, allShipping, currencyFormat} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(0)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allShippingFilter = allShipping?.filter(x => (pattern.test((x.name)) || pattern.test((x.company)) || pattern.test((x.price))))
  const reduceActive = allShippingFilter.reduce((a,b) => a + (b.isActive?1:0),0)
  const reduceCountries = allShippingFilter.reduce((a,b) => a + b.countries.length,0)
  const reducePrices = allShippingFilter.reduce((a,b) => a + b.price,0)
  const history = useHistory()

  const headersrow = shipHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  })

  const allshippingrows = allShippingFilter
  ?.sort((a,b) => {
    return 
  })
  .map((el,i) => (
    <div className="proditem">
      <h5>{i+1}</h5>
      <h5>{el.name}</h5>
      <h5>{el.companyName}</h5>
      <h5>{currencyFormat.format(el.price)}</h5>
      <h5>{el.countries?.slice(0,2).join(', ')} {el.countries.length>2&&`+ ${(el.countries.length-2)} more`}</h5>
      <h5>{el.isActive?"Active":"Not Active"}</h5>
      <h5> 
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===el.id?0:el.id);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${el.id===showOpts?"show":""}`}> 
          <div title="Edit Product" onClick={() => editShipping(el.id)}><i className="far fa-edit"></i></div>
          <div title="Delete Product" onClick={() => deleteShipping(el.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Product Info" onClick={() => infoShipping()}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  ))

  function editShipping(shipid) {
    setEditShipMode(true)
    history.push(`/admin/store/edit-shipping/${shipid}`)
  } 
  function deleteShipping(shipid) {
    const confirm = window.confirm('Are you sure you want to remove this shipping method?')
    if(confirm) {
      db.collection('shipping').doc(shipid).delete()
      .then(() => window.confirm('The shipping method was successfully deleted from your store.'))
    }
  }
  function infoShipping() {

  }

  useEffect(() => {
    window.onclick = () => setShowOpts(0)
  },[])

  return (
    <div className="shippingpage">
      <PageTitle title="Shipping"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Shipping Methods"
          btnTitle="New Shipping"
          btnUrl="/admin/store/add-shipping"
          searchPlaceholder="Find a Shipping Method"
          setKeyword={setKeyword}
        />
        <div className="shippingtablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allshippingrows}
            </div>
            <div className="foot">
              <h5><span>{reduceActive}</span> Active Shipping Methods</h5>
              <h5><span>{reduceCountries}</span> Shipping Countries</h5>
              <h5><span>{currencyFormat.format(reducePrices)}</span> Shipping Prices Total</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}