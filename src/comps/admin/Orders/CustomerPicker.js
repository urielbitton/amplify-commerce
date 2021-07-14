import React, {useContext, useState} from 'react'
import { AppInput } from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'

export default function CustomerPicker(props) {

  const {allCustomers} = useContext(StoreContext)
  const {showCustomerPicker, setShowCustomerPicker, selectCustIndex, setSelectCustIndex} = props
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  const pattern = new RegExp('\\b' + clean(keyword), 'i')

  const headers = ['Name','ID','Email','Phone','Select']

  const headersRow = headers?.map(el => {
    return <h5>{el}</h5>
  })

  const allCustomersRow = allCustomers?.map((el,i) => {
    return <div className="customerrow">
      <h6>{el.name}</h6>
      <h6 title={el.id}>{el.id.slice(0,8)}...</h6>
      <h6>{el.email}</h6>
      <h6>{el.phone}</h6>
      <div className="btncont">
        <AdminBtn title={selectCustIndex===i?<i className="fal fa-check"></i>:"Select"} solid clickEvent onClick={() => setSelectCustIndex(selectCustIndex===i?-1:i)}/>
      </div>
    </div>
  })

  return (
    <div className={`customerpickercover ${showCustomerPicker?"show":""}`} onClick={() => setShowCustomerPicker(false)}>
      <div className="customerpickercont" onClick={(e) => e.stopPropagation()}>
          <div className="titles">
            <h5>Find a Customer</h5>
            <i className="fal fa-times" onClick={() => setShowCustomerPicker(false)}></i>
          </div>
          <AppInput title="" iconclass="fal fa-search" placeholder="Search by customer's name, email, phone..."/>
          <div className="resultscont">
            <div className="headersrow">
              {headersRow}
            </div>
            {allCustomersRow}
          </div>
          <div className="actionscont">
            <AdminBtn title="Choose" solid/>
            <AdminBtn title="Cancel" clickEvent onClick={() => setShowCustomerPicker(false)}/>
          </div>
      </div>
    </div>
  )
}