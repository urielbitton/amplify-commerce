import React, {useContext, useState} from 'react'
import { AppInput } from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'

export default function CustomerPicker(props) {

  const {allCustomers, setSelectedProvince, setSelectedCountry} = useContext(StoreContext)
  const {showCustomerPicker, setShowCustomerPicker, selectCustIndex, setSelectCustIndex,
    setCustomerId, setCustName, setCustEmail, setCustPhone, setCustCity, setCustProvinceCountry} = props
  const [customerInfo, setCustomerInfo] = useState({})
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  const pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allCustomersFilter = allCustomers?.filter(x => (pattern.test(x.name) || x.id === keyword
    || pattern.test(x.email) || pattern.test(x.phone)))

  const headers = ['Name','ID','Email','Phone','Select']

  const headersRow = headers?.map(el => {
    return <h5>{el}</h5>
  })

  const allCustomersRow = allCustomersFilter?.map((el,i) => {
    return <div className="customerrow">
      <h6>{el.name}</h6>
      <h6 title={el.id}>{el.id.slice(0,8)}...</h6>
      <h6>{el.email}</h6>
      <h6>{el.phone}</h6>
      <div className="btncont">
        <AdminBtn 
          title={selectCustIndex===i?<i className="fal fa-check"></i>:"Select"} 
          solid clickEvent 
          onClick={() => selectAction(i, el)}/>
      </div>
    </div>
  })

  function selectAction(i, el) {
    setSelectCustIndex(selectCustIndex===i?-1:i)
    setCustomerInfo(selectCustIndex===i?{}:el)
  }
  function initCustomer() {
    setCustomerId(customerInfo.id)
    setCustName(customerInfo.name)
    setCustEmail(customerInfo.email)
    setCustPhone(customerInfo.phone)
    setCustCity(customerInfo.city)
    setCustProvinceCountry({
      country: customerInfo.country,
      provstate: customerInfo.provstate
    })
    setSelectedCountry(customerInfo.countryCode)
    setSelectedProvince(customerInfo.provstateCode)
    setShowCustomerPicker(false)
  }

  return (
    <div className={`customerpickercover ${showCustomerPicker?"show":""}`} onClick={() => setShowCustomerPicker(false)}>
      <div className="customerpickercont" onClick={(e) => e.stopPropagation()}>
          <div className="titles">
            <h5><i className="far fa-user-tag"></i>Find a Customer</h5>
            <i className="fal fa-times" onClick={() => setShowCustomerPicker(false)}></i>
          </div>
          <AppInput 
            title="" 
            iconclass="fal fa-search" 
            placeholder="Search by customer's name, id, email, phone..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="resultscont">
            <div className="headersrow">
              {headersRow}
            </div>
            <div className="customerscontent">
              {allCustomersRow}
            </div>
          </div>
          <div className="actionscont">
            <AdminBtn title="Choose" disabled={!customerInfo.id} solid clickEvent onClick={() => initCustomer()}/>
            <AdminBtn title="Cancel" clickEvent onClick={() => setShowCustomerPicker(false)}/>
          </div>
      </div>
    </div>
  )
}