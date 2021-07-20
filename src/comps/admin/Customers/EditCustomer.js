import React, { useContext, useEffect, useState } from 'react'
import { AppInput } from '../../common/AppInputs'
import { db } from '../../common/Fire'
import ProvinceCountry from '../../common/ProvinceCountry'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import './styles/EditCustomer.css'
import genRandomNum from '../../common/genRandomNum'
import { useHistory, useLocation } from 'react-router-dom'

export default function EditCustomer(props) {

  const {editCustMode, setNotifs, setEditCustMode, setSelectedCountry, setSelectedProvince,
  selectedCountry, selectedProvince} = useContext(StoreContext)
  const {id, number, name, email, phone, address, city, provstate, country, moneySpent, countryCode,
  provstateCode} = editCustMode&&props.el
  const [custNum, setCustNum] = useState('')
  const [custName, setCustName] = useState('') 
  const [custEmail, setCustEmail] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')
  const [provinceCountry, setProvinceCountry] = useState({country:'',province:''})
  const allowCreate = !!custNum && !!custName && !!custEmail && !!custPhone && !!custAddress
  const genNewCustId = db.collection('customers').doc().id
  const history = useHistory()
  const location = useLocation()

  const customerObj = {
    id: genNewCustId,
    number: custNum,
    name: custName,
    email: custEmail,
    phone: custPhone,
    address: custAddress,
    city: custCity,
    provstate: provinceCountry.provstate,
    country: provinceCountry.country,
    provStateCode: selectedProvince,
    countryCode: selectedCountry,
    moneySpent: 0,
  }

  function generateNum() {
    setCustNum(genRandomNum()) 
  }
  function createCustomer() {
    if(allowCreate) { 
      db.collection('customers').doc(genNewCustId).set(customerObj).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Customer Created',
          icon: 'fal fa-plus',
          text: `The customer has been successfully created`,
          time: 5000
        }])
        history.push('/admin/customers')
      })
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all fields denoted with a *`,
        time: 5000
      }])
    }
  }
  function editCustomer() {
    if(allowCreate) {
      db.collection('customers').doc(id).update(customerObj)
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Customer Saved',
          icon: 'fal fa-pen',
          text: `The customer has been saved.`,
          time: 5000
        }])
        history.push('/admin/customers')
      })
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all fields denoted with a *`,
        time: 5000
      }])
    }
  }
  function deleteCustomer() {

  }

  useEffect(() => {
    if(location.pathname.includes('/edit-customer')) 
      setEditCustMode(true)
    else
      setEditCustMode(false)
  },[location])

  useEffect(() => {
    setCustNum(editCustMode?number:generateNum())
    setCustName(editCustMode?name:'')
    setCustEmail(editCustMode?email:'')
    setCustPhone(editCustMode?phone:'')
    setCustAddress(editCustMode?address:'')
    setCustCity(editCustMode?city:'')
    setSelectedCountry(editCustMode?countryCode:'')
    setSelectedProvince(editCustMode?provstateCode:'')
  },[editCustMode])

  useEffect(() => {
    setCustNum(genRandomNum())
    return () => setEditCustMode(false)  
  },[])

  return (
    <div className="editcustomerpage">
      <div className="pagecont">
        <h3 className="pagetitle">Add Customer</h3>
        <div className="couponcontent pagemaincontent">
          <div className="generatecont">
            <AppInput title="Customer Number" onChange={(e) => setCustNum(e.target.value)} value={custNum} />
            <AdminBtn title="Generate Number" solid clickEvent onClick={() => generateNum()}/>
          </div>
          <AppInput title="Customer Name" onChange={(e) => setCustName(e.target.value)} value={custName}/>
          <AppInput title="Email" onChange={(e) => setCustEmail(e.target.value)} value={custEmail}/>
          <AppInput title="Phone" onChange={(e) => setCustPhone(e.target.value)} value={custPhone}/>
          <AppInput title="Address" onChange={(e) => setCustAddress(e.target.value)} value={custAddress}/>
          <AppInput title="City" onChange={(e) => setCustCity(e.target.value)} value={custCity}/>
          <ProvinceCountry setState={setProvinceCountry} />
          <AppInput className="inprow show currencyinp" title="Money Spent" disabled type="number" value={moneySpent} />

          <div className="final actionbtns">
            <AdminBtn title={editCustMode?"Edit Customer":"Create Customer"} className={!allowCreate?"disabled":""} solid clickEvent onClick={() => !editCustMode?createCustomer():editCustomer()}/>
            {editCustMode&&<AdminBtn title="Delete Customer" solid className="deletebtn" clickEvent onClick={() => deleteCustomer()}/>}
            <AdminBtn title="Cancel" url="/admin/customers/"/>
          </div>
        </div>
      </div>
    </div>
  )
}