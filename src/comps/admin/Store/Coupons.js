import React, {useContext, useState} from 'react'
import AdminBtn from '../common/AdminBtn'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import {couponHeaders} from './arrays/arrays'
import convertDate from '../utilities/convertDate'
import { useHistory } from 'react-router'
import {db} from '../../common/Fire'

export default function Coupons() {

  const {setEditCoupMode, allCoupons, currencyFormat, percentFormat} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(false)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allCouponsFilter = allCoupons?.filter(x => (pattern.test((x.name)) || pattern.test((x.amount)) || pattern.test((x.type))))
  const reducedAmounts = allCouponsFilter.reduce((a,b) => a + (b.type==='flat'&& +b.amount),0)
  const history = useHistory()

  const headersrow = couponHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""} onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>
      {el.name}
      {i!==5&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  const allcouponsrow = allCouponsFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5>{i+1}</h5>
      <h5 className="boxed"><span>{el.name}</span></h5>
      <h5>{el.type}</h5>
      <h5>{el.type==='flat'?currencyFormat.format(el.amount):percentFormat.format(el.amount/100)}</h5>
      <h5 className="expdate">{el.expiryDate}</h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===el.id?0:el.id);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${el.id===showOpts?"show":""}`}> 
          <div title="Edit Product" onClick={() => editCoupon(el.id)}><i className="far fa-edit"></i></div>
          <div title="Delete Product" onClick={() => deleteCoupon(el.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Product Info" onClick={() => infoCoupon()}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function editCoupon(couponid) {
    setEditCoupMode(true)
    history.push(`/admin/store/edit-product/${couponid}`)
  }
  function deleteCoupon(couponid) {
    const confirm = window.confirm('Are you sure you want to remove this coupon?')
    if(confirm) {
      let itemindex = allCoupons.findIndex(x => x.id === couponid)
      allCoupons.splice(itemindex,1)
      db.collection('coupons').doc('allcoupons').update({
        allcoupons: allCoupons
      }).then(() => window.confirm('The coupon was successfully deleted from your store.'))
    }
  }
  function infoCoupon() {
    
  }

  return (
    <div className="couponspage">
      <div className="pagecont">
        <div className="titlesrow">
          <h4>Coupons</h4>
          <div className="flex">
            <AdminBtn title="New Coupon" url="/admin/store/add-coupon" onClick={() => setEditCoupMode(false)}/>
            <AppInput 
              placeholder="Find a Coupon" 
              iconclass="fal fa-search" 
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className="coupontablecont">
          <div className="producttable">
            <div className="header couponsheaders">
              {headersrow}
            </div>
            <div className="content">
              {allcouponsrow}
            </div>
            <div className="foot">
              <h5><span>{allCouponsFilter.length}</span> Coupon{allCouponsFilter.length>1?"s":""}</h5>
              <h5><span>{currencyFormat.format(reducedAmounts)}</span> Total Coupons Amount</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}