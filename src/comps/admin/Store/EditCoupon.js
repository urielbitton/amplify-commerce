import React, { useContext, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import './styles/EditCoupon.css'

export default function EditCoupon(props) {

  const {editCoupMode, setEditCoupMode} = useContext(StoreContext)
  const {id, name, amount, description, type, expiryDate} = editCoupMode&&props.el
  const [coupName, setCoupName] = useState('')
  const [coupAmount, setCoupAmount] = useState('')
  const [coupType, setCoupType] = useState('')
  const [coupDescript, setCoupDescript] = useState('')
  const [coupExpiry, setCoupExpiry] = useState(new Date())

  function generateCode() {
    let coupongen = Math.random().toString(36).substring(7)
    setCoupName(coupongen)
  }

  return (
    <div className="addcouponpage">
      <div className="pagecont">
        <h3 className="pagetitle">{editCoupMode?"Edit Coupon":"Add Coupon"}</h3>
      </div>
    </div>
  )
}