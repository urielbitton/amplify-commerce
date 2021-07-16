import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {AppInput, AppSelect, AppSwitch, AppTextarea} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {db} from '../../common/Fire'
import firebase from 'firebase'
import { useHistory, useLocation } from 'react-router'
import PageTitle from '../common/PageTitle'
import { nowDate } from '../../common/UtilityFuncs'
 
export default function EditCoupon(props) { 
 
  const {editCoupMode, setEditCoupMode, allCoupons} = useContext(StoreContext)
  const {id, name, amount, description, type, expiryDate, timesUsed, isActive} = editCoupMode&&props.el 
  let coupongen = Math.random().toString(36).substring(7)
  const [coupName, setCoupName] = useState(editCoupMode?name:coupongen)
  const [coupAmount, setCoupAmount] = useState(editCoupMode?amount:0)
  const [coupType, setCoupType] = useState(editCoupMode?type:'')
  const [coupDescript, setCoupDescript] = useState(editCoupMode?description:'')
  const [coupActive, setCoupActive] = useState(editCoupMode?isActive:true)
  const [coupExpiry, setCoupExpiry] = useState(editCoupMode?expiryDate:nowDate)
  const allowAccess = coupName && coupAmount && coupType && coupExpiry
  const genNewId = db.collection('coupons').doc().id
  const history = useHistory()
  const location = useLocation()

  const coupontypeOpts = [
    {name: 'Choose An Option', value: ''},
    {name: 'Flat Amount', value: 'flat'},
    {name: 'Percentage', value: 'percent'},
  ]

  const coupObj = {
    id: editCoupMode?id:db.collection('coupons').doc().id,
    name: coupName,
    amount: +coupAmount,
    description: coupDescript,
    expiryDate: coupExpiry,
    type: coupType,
    timesUsed: editCoupMode?timesUsed:0,
    isActive: coupActive
  }

  function createCoupon() {
    if(allowAccess) {
      db.collection('coupons').doc(genNewId).set(
        coupObj
      ).then(() => {
        window.alert('Your coupon has been created successfully.')
        history.push('/admin/store/coupons')
      })
    }
    else {
      window.alert('Please fill in all fields to create a coupon.')
    }
  }
  function editCoupon() {
    if(allowAccess) {
      
    }
  }
  
  useEffect(() => {
    if(location.pathname.includes('edit-coupon'))
      setEditCoupMode(true)
    else 
      setEditCoupMode(false)
  },[location]) 

  useEffect(() => {
    if(!editCoupMode) {
      setCoupName(coupongen)
      setCoupAmount('')
      setCoupType('')
      setCoupDescript('')
      setCoupExpiry(nowDate)
      setCoupActive(true)
    }
    return() => setEditCoupMode(false)
  },[editCoupMode])

  return (
    <div className="addcouponpage">
      <PageTitle title={editCoupMode?"Edit A Coupon":"Create A Coupon"}/>
      <div className="pagecont">
        <h3 className="pagetitle">{editCoupMode?"Edit Coupon":"Add Coupon"}</h3>
        <div className="couponcontent pagemaincontent">
          <div className="generatecont">
            <AppInput title="Coupon Code" className="couponcode" onChange={(e) => setCoupName(e.target.value)} value={coupName} />
            <AdminBtn title="Generate Code" solid clickEvent onClick={() => setCoupName(coupongen)}/>
          </div>
          <AppTextarea title="Description (Optional)" onChange={(e) => setCoupDescript(e.target.value)} value={coupDescript} />
          <h4>Coupon Options</h4>
          <AppSelect title="Coupon Type" className="inprow" options={coupontypeOpts} onChange={(e) => setCoupType(e.target.value)} value={coupType} namebased />
          <AppInput title="Coupon Amount" className="inprow" onChange={(e) => setCoupAmount(e.target.value)} value={coupAmount} />
          <AppInput title="Expiry Date" className="inprow" type="date" onChange={(e) => setCoupExpiry(e.target.value)} value={coupExpiry} />
          <AppSwitch title="Activate Coupon" className="inprow" onChange={(e) => setCoupActive(e.target.checked)} checked={coupActive}/> 
          <AdminBtn 
            title={editCoupMode?"Save Coupon":"Create Coupon"} 
            solid 
            className="createbtn" 
            clickEvent
            onClick={() => editCoupMode?editCoupon():createCoupon()}
          />
        </div>
      </div>
    </div>
  )
}