import React, {useContext, useEffect, useState} from 'react'
import {StoreContext} from '../../common/StoreContext'
import {couponHeaders} from './arrays/arrays' 
import { useHistory } from 'react-router'
import {db} from '../../common/Fire'
import PageTitle from '../common/PageTitle'
import PageTitlesRow from '../common/PageTitlesRow'
import PageStarter from '../common/PageStarter'
import { deleteDB, setDB } from '../../common/services/CrudDb'
import { Link } from 'react-router-dom'

export default function Coupons() {

  const {setEditCoupMode, allCoupons, currencyFormat, percentFormat, setNotifs} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(false)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allCouponsFilter = allCoupons?.filter(x => (pattern.test((x.name)) || pattern.test((x.amount)) || pattern.test((x.type))))
  const reducedAmounts = allCouponsFilter.reduce((a,b) => a + (b.type==='flat'&& +b.amount),0)
  const reduceActive = allCouponsFilter.reduce((a,b) => a + (b.isActive?1:0),0)
  const history = useHistory()
  const showTable = allCoupons.length?"block":"none"
  const updateID = db.collection('updates').doc().id

  const headersrow = couponHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==6&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  const allcouponsrow = allCouponsFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5>{i+1}</h5>
      <h5 className="boxed"><Link to={`/admin/store/edit-coupon/${el.id}`}><span>{el.name}</span></Link></h5>
      <h5>{el.type}</h5>
      <h5>{el.type==='flat'?currencyFormat.format(el.amount):percentFormat.format(el.amount/100)}</h5>
      <h5>{el.isActive?"Active":"Not Active"}</h5>
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
    history.push(`/admin/store/edit-coupon/${couponid}`)
  }
  function deleteCoupon(couponid) {
    const confirm = window.confirm('Are you sure you want to remove this coupon?')
    if(confirm) {
      deleteDB('coupons', couponid)
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Coupon Deleted',
          icon: 'fal fa-trash-alt',
          text: `The coupon has been deleted.`,
          time: 5000
        }])
        setDB('updates', updateID, {
          color: '#0088ff',
          date: new Date(),
          descript: `The coupon has been deleted.`,
          icon: 'fal fa-money-bill',
          id: updateID,
          read: false,
          title: 'Coupon Deleted',
          url: `/admin/store/coupons`
        })
      })
    }
  }
  function infoCoupon() {
    
  }

  useEffect(() => {
    window.onclick = () => setShowOpts(0)
  },[])

  return (
    <div className="couponspage">
      <PageTitle title="Coupons"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Coupons"
          btnTitle="New Coupon"
          btnUrl="/admin/store/add-coupon"
          searchPlaceholder="Find a Coupon"
          setKeyword={setKeyword}
        />
        <PageStarter 
          subtitle="You have no coupons yet."
          title="Create a Coupon"
          img="https://i.imgur.com/9wA6xFa.png"
          btnText="Create Coupon"
          btnUrl="/admin/store/add-coupon"
          hide={allCoupons.length}
        />
        <div className="coupontablecont" style={{display:showTable}}>
          <div className="producttable">
            <div className="header couponsheaders">
              {headersrow}
            </div>
            <div className="content">
              {allcouponsrow}
            </div>
            <div className="foot">
              <h5><span>{allCouponsFilter.length}</span> Total coupon{allCouponsFilter.length>1?"s":""}</h5>
              <h5><span>{currencyFormat.format(reducedAmounts)}</span> Total Coupons Amount</h5>
              <h5><span>{reduceActive}</span> Active Coupons</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}