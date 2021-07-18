import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {AppInput, AppSelect, AppSwitch, AppTextarea} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {db} from '../../common/Fire'
import { useHistory, useLocation } from 'react-router'
import PageTitle from '../common/PageTitle'
import { nowDate } from '../../common/UtilityFuncs'
 
export default function EditCoupon(props) { 
 
  const {editCoupMode, setEditCoupMode} = useContext(StoreContext)
  const {id, name, amount, description, type, expiryDate, timesUsed, isActive} = editCoupMode&&props.el 
  let coupongen = Math.random().toString(36).substring(7)
  const [coupName, setCoupName] = useState(coupongen)
  const [coupAmount, setCoupAmount] = useState(0)
  const [coupType, setCoupType] = useState('')
  const [coupDescript, setCoupDescript] = useState('')
  const [coupActive, setCoupActive] = useState(true)
  const [coupExpiry, setCoupExpiry] = useState(nowDate)
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
    id: editCoupMode?id:genNewId,
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
      db.collection('coupons').doc(genNewId).set(coupObj)
      .then(() => {
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
      db.collection('coupons').doc(id).update(coupObj)
      .then(res => {
        window.alert('The coupon was successfully saved.')
        history.push('/admin/store/coupons')
      })
      .catch(err => window.alert('An error occured while saving the coupon. Please try again.'))
    }
  }
  function deleteCoupon(couponid) {
    const confirm = window.confirm('Are you sure you want to remove this coupon?')
    if(confirm) {
      db.collection('coupons').doc(couponid).delete()
      .then(() => {
        window.confirm('The coupon was successfully deleted from your store.')
        history.push('/admin/coupons')
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
    setCoupName(editCoupMode?name:coupongen)
    setCoupAmount(editCoupMode?amount:'')
    setCoupType(editCoupMode?type:'')
    setCoupDescript(editCoupMode?description:'')
    setCoupExpiry(editCoupMode?expiryDate:nowDate)
    setCoupActive(editCoupMode?isActive:true)
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
          <div className="actionbtns">
            <AdminBtn 
              title={editCoupMode?"Save Coupon":"Create Coupon"} 
              solid 
              className="createbtn" 
              clickEvent
              onClick={() => editCoupMode?editCoupon():createCoupon()}
            />
            <AdminBtn 
              title="Delete Coupon" 
              solid 
              className="deletebtn" 
              hideBtn={!editCoupMode}
              clickEvent 
              onClick={() => editCoupMode&&deleteCoupon()}
            />
            <AdminBtn title="Cancel" clickEvent onClick={() => history.push('/admin/coupons')}/>
          </div>
        </div>
      </div>
    </div>
  )
}