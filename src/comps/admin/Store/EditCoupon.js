import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import './styles/EditCoupon.css'
import {AppInput, AppSelect, AppSwitch, AppTextarea} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {db} from '../../common/Fire'
import firebase from 'firebase'
import { useHistory, useLocation } from 'react-router'

export default function EditCoupon(props) {

  const {editCoupMode, setEditCoupMode, allCoupons} = useContext(StoreContext)
  const {id, name, amount, description, type, expiryDate, timesUsed, isActive} = editCoupMode&&props.el 
  let coupongen = Math.random().toString(36).substring(7)
  const [coupName, setCoupName] = useState(editCoupMode?name:coupongen)
  const [coupAmount, setCoupAmount] = useState(editCoupMode?amount:0)
  const [coupType, setCoupType] = useState(editCoupMode?type:'')
  const [coupDescript, setCoupDescript] = useState(editCoupMode?description:'')
  const [coupActive, setCoupActive] = useState(editCoupMode?isActive:true)
  const date = new Date()
  const nowDate = `${date.getFullYear()}-${date.getMonth()<10?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+(date.getDate()):(date.getDate())}`
  const [coupExpiry, setCoupExpiry] = useState(editCoupMode?expiryDate:nowDate)
  const allowAccess = coupName && coupAmount && coupType && coupExpiry
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
    amount: coupAmount,
    description: coupDescript,
    expiryDate: coupExpiry,
    type: coupType,
    timesUsed: editCoupMode?timesUsed:0,
    isActive: coupActive
  }

  function createCoupon() {
    if(allowAccess) {
      db.collection('coupons').doc('allcoupons').update({
        allcoupons: firebase.firestore.FieldValue.arrayUnion(coupObj)
      }).then(() => {
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
      let itemindex = allCoupons?.findIndex(x => x.id === id)
      allCoupons[itemindex] = coupObj
      db.collection('coupons').doc('allcoupons').update({
        allcoupons: allCoupons
      }).then(() => {
        window.alert('Your coupon has been successfully edited.')
        history.push('/admin/store/coupons')
      })
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
      <div className="pagecont">
        <h3 className="pagetitle">{editCoupMode?"Edit Coupon":"Add Coupon"}</h3>
        <div className="couponcontent">
          <div>
            <AppInput title="Coupon Code" className="couponcode" onChange={(e) => setCoupName(e.target.value)} value={coupName} />
            <AdminBtn title="Generate Code" solid nourl onClick={() => setCoupName(coupongen)}/>
          </div>
          <AppTextarea title="Description (Optional)" onChange={(e) => setCoupDescript(e.target.value)} value={coupDescript} />
          <h4>Coupon Data</h4>
          <AppSelect title="Coupon Type" className="inprow" options={coupontypeOpts} onChange={(e) => setCoupType(e.target.value)} value={coupType} namebased />
          <AppInput title="Coupon Amount" className="inprow" onChange={(e) => setCoupAmount(e.target.value)} value={coupAmount} />
          <AppInput title="Expiry Date" className="inprow" type="date" onChange={(e) => setCoupExpiry(e.target.value)} value={coupExpiry} />
          <AppSwitch title="Activate Coupon" className="inprow" onChange={(e) => setCoupActive(e.target.checked)} checked={coupActive}/> 
          <AdminBtn 
            title={editCoupMode?"Edit Coupon":"Create Coupon"} 
            solid 
            className="createbtn" 
            nourl
            onClick={() => editCoupMode?editCoupon():createCoupon()}
          />
      </div>
      </div>
    </div>
  )
}