import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppInput, AppSwitch } from '../../common/AppInputs'
import { db } from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import './styles/EditCustomer.css'
import genRandomNum from '../../common/genRandomNum'
import { useHistory, useLocation } from 'react-router-dom'
import RegionCountry from '../../common/RegionCountry'
import { convertCountryCode, convertProvinceCode } from '../../common/UtilityFuncs'
import PageTitle from '../common/PageTitle'
import UploadImg from '../../common/UploadImg'
import {validateEmail} from '../../common/UtilityFuncs'
import {setDB} from '../../common/services/CrudDb'
 
export default function EditCustomer(props) {
 
  const {editCustMode, setNotifs, setEditCustMode} = useContext(StoreContext)
  const {id, number, name, email, phone, address, city, provState, country, moneySpent, profimg,
    userRating, isActive, dateCreated} = editCustMode&&props.el
  const [custImg, setCustImg] = useState('')
  const [custNum, setCustNum] = useState('')
  const [custName, setCustName] = useState('')  
  const [custEmail, setCustEmail] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')
  const [custRegion, setCustRegion] = useState('')
  const [custCountry, setCustCountry] = useState('')
  const [provinceChoices, setProvinceChoices] = useState([])
  const [isCustActive, setIsCustActive] = useState(true)
  const allowCreate = custNum && custName && validateEmail(custEmail) && custPhone && custAddress && custCity && custRegion && custCountry
  const genNewCustId = db.collection('customers').doc().id
  const history = useHistory()
  const location = useLocation()
  const pagetitle = editCustMode?"Edit Customer":"Add Customer"
  const genUserId = editCustMode? id : genNewCustId
  const updateID = db.collection('updates').doc().id

  const customerObj = {
    id: genUserId,
    number: custNum,
    name: custName,
    email: custEmail,
    phone: custPhone,
    address: custAddress,
    city: custCity,
    provState: custRegion,
    country: custCountry,
    provStateCode: convertProvinceCode(provinceChoices, custRegion)??'',
    countryCode: convertCountryCode(custCountry)??'',
    moneySpent: 0,
    profimg: custImg,
    userRating: editCustMode?userRating:0,
    isActive: isCustActive,
    dateCreated: editCustMode?dateCreated:new Date()
  }

  function generateNum() {
    setCustNum(genRandomNum()) 
  }
  function createCustomer() {
    if(!!allowCreate) { 
      db.collection('customers').doc(genNewCustId).set(customerObj).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Customer Created',
          icon: 'fal fa-plus',
          text: `The customer has been successfully created`,
          time: 5000
        }])
        setDB('updates', updateID, {
          color: '#0088ff',
          date: new Date(),
          descript: `Customer ${custName} has been created and added to your store.`,
          icon: 'fal fa-user-tag',
          id: updateID,
          read: false,
          title: 'Customer Created',
          url: `/admin/customer/${id}`
        })
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
    if(!!allowCreate) {
      db.collection('customers').doc(id).update(customerObj)
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Customer Saved',
          icon: 'fal fa-save',
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
    let confirm = window.confirm('Are you sure you wish to delete this customer?')
    if(confirm) {
      db.collection('customers').doc(id).delete()
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Customer Deleted',
          icon: 'fal fa-trash-alt',
          text: `The customer has been deleted.`,
          time: 5000
        }])
        setDB('updates', updateID, {
          color: '#0088ff',
          date: new Date(),
          descript: `Customer ${custName} has been deleted from your store.`,
          icon: 'fal fa-user-tag',
          id: updateID,
          read: false,
          title: 'Customer Deleted',
          url: `/admin/customers`
        })
        history.push('/admin/customers')
      })
    }
  }

  useEffect(() => {
    if(location.pathname.includes('/edit-customer')) 
      setEditCustMode(true)
    else
      setEditCustMode(false)
    return () => setEditCustMode(false) 
  },[location])

  useEffect(() => {
    setCustImg(editCustMode?profimg:'')
    setCustNum(editCustMode?number:generateNum())
    setCustName(editCustMode?name:'')
    setCustEmail(editCustMode?email:'')
    setCustPhone(editCustMode?phone:'')
    setCustAddress(editCustMode?address:'')
    setCustCity(editCustMode?city:'')
    setCustRegion(editCustMode?provState:"")
    setCustCountry(editCustMode?country:"")
    setIsCustActive(editCustMode?isActive:true)
  },[editCustMode])

  useEffect(() => {
    setCustNum(genRandomNum()) 
  },[])

  return (
    <div className="editcustomerpage">
      <PageTitle title={pagetitle} />
      <div className="pagecont">
        <h3 className="pagetitle">{pagetitle}</h3>
        <div className="pagemaincontent">
          <div className="profilecont">
            <UploadImg 
              img={custImg} 
              setImg={setCustImg} 
              storagePath={`/${genUserId}/images/profilepic`} 
              className="profimgcont"
            />
          </div> 
          <div className="generatecont">
            <AppInput title="Customer Number" onChange={(e) => setCustNum(e.target.value)} value={custNum} />
            <AdminBtn title="Generate Number" solid clickEvent onClick={() => generateNum()}/>
          </div>
          <AppInput title="Customer Name" onChange={(e) => setCustName(e.target.value)} value={custName}/>
          <AppInput title="Email" onChange={(e) => setCustEmail(e.target.value)} value={custEmail}/>
          <AppInput title="Phone" onChange={(e) => setCustPhone(e.target.value)} value={custPhone}/>
          <AppInput title="Address" onChange={(e) => setCustAddress(e.target.value)} value={custAddress}/>
          <AppInput title="City" onChange={(e) => setCustCity(e.target.value)} value={custCity}/>
          <RegionCountry 
            country={custCountry}
            setCountry={setCustCountry}
            region={custRegion}
            setRegion={setCustRegion}
            provinceChoices={provinceChoices} 
            setProvinceChoices={setProvinceChoices}
          />
          <AppInput className="inprow show currencyinp" title="Money Spent" disabled type="number" value={moneySpent} />
          <AppSwitch className="inprow show" title="Active" onChange={(e) => setIsCustActive(e.target.checked)} checked={isCustActive}/>

          <div className="final actionbtns">
            <AdminBtn title={editCustMode?"Edit Customer":"Create Customer"} className={!!!allowCreate?"disabled":""} solid clickEvent onClick={() => !editCustMode?createCustomer():editCustomer()}/>
            {editCustMode&&<AdminBtn title="Delete Customer" solid className="deletebtn" clickEvent onClick={() => deleteCustomer()}/>}
            <AdminBtn title="Cancel" url="/admin/customers/"/>
          </div>
        </div>
      </div>
    </div>
  )
}