import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AppInput, AppSelect, AppSwitch, AppTextarea } from '../../common/AppInputs'
import { db } from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import {courrierOpts} from './arrays/arrays'
import AdminBtn from '../common/AdminBtn'
import {countries as countriesOpts} from '../../common/Lists'
import './styles/EditShipping.css'
import AppAccordion from '../../site/common/AppAccordion'
import PageTitle from '../common/PageTitle'

export default function EditShipping(props) {

  const {editShipMode, setEditShipMode, setNotifs} = useContext(StoreContext)
  const {id, name, company, price, value,  isActive, description, countries} = editShipMode&&props.el
  const [shipName, setShipName] = useState('')
  const [shipCompany, setShipCompany] = useState('')
  const [shipPrice, setShipPrice] = useState('')
  const [shipActive, setShipActive] = useState('')
  const [shipDescript, setShipDescript] = useState('')
  const [newCountry, setNewCountry] = useState('')
  const [extraCountry, setExtraCountry] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [countriesArr, setCountriesArr] = useState([])
  const [editIndex, setEditIndex] = useState(-1)
  const [addMode, setAddMode] = useState(false)
  const location = useLocation()
  const history= useHistory()
  const hasCountries = countriesArr.length
  const genNewId = db.collection('shipping').doc().id
  const allowCreate = shipName && shipCompany && shipPrice
  const pagetitle = editShipMode?"Edit A Shipping Method":"Create A Shipping Method"

  const shipObj = {
    id: editShipMode?id:genNewId,
    name: shipName,
    company: shipCompany,
    companyName: shipCompany,
    price: +shipPrice,
    countries: [...new Set(countriesArr)], //removes duplicates
    isActive: shipActive,
    value: editShipMode ? value: shipName.split(' ')[0].toLowerCase(),
    description: shipDescript
  }

  const shipcountriesrow = countriesArr?.map((el,i) => {
    return <div className="inprow" onClick={(e) => {setEditIndex(i);e.stopPropagation()}}>
      <AppSelect 
        title="Country" 
        className="inprow" 
        options={[{name:'Choose a Country',value:''},...countriesOpts]} 
        onChange={(e) => setNewCountry(e.target.value)} 
        onClick={() => setAddMode(false)}
        value={editIndex===i?newCountry:el} 
        namebased 
      />
      <AdminBtn title={<i className="far fa-trash-alt"></i>} className="deletebtn" clickEvent onClick={(e) => deleteCountry(el, e)}/>
    </div>
  })

  function createShipping() {
    if(allowCreate) {
      db.collection('shipping').doc(genNewId).set(shipObj)
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Method Created',
          icon: 'fal fa-plus',
          text: `The shipping method has been successfully added to your store.`,
          time: 5000
        }])
        window.alert('')
        history.push('/admin/store/shipping')
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
  function editShipping() {
    if(allowCreate) {
      db.collection('shipping').doc(id).update(shipObj).then(res => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Method Saved',
          icon: 'fal fa-save',
          text: `The shipping method has been saved.`,
          time: 5000
        }])
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
  function deleteShipping() {
    const confirm = window.confirm('Are you sure you want to delete this shipping method?')
    if(confirm) {
      db.collection('shipping').doc(id)
      .delete()
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Coupon Deleted',
          icon: 'fal fa-trash-alt',
          text: `The shipping method was successfully deleted from your store.`,
          time: 5000
        }])
        history.push('/admin/store/shipping')
      })
    }
  }
  function addCountry() {
    setCountriesArr(prev => [...prev, extraCountry])
    setExtraCountry('')
  }
  function saveCountry() {
    countriesArr[editIndex] = newCountry
    setCountriesArr(prev => [...prev])
    setNewCountry('')
  }
  function deleteCountry(el, e) {
    e.stopPropagation()
    const itemindex = countriesArr.indexOf(el)
    countriesArr.splice(itemindex,1)
    setCountriesArr(prev => [...prev]) 
  }

  useEffect(() => {
    setShipName(editShipMode?name:'')
    setShipCompany(editShipMode?company:'')
    setShipPrice(editShipMode?price:'')
    setShipActive(editShipMode?isActive:'')
    setShipDescript(editShipMode?description:'')
    setCountriesArr(editShipMode?countries:[])
  },[editShipMode])

  useEffect(() => {
    if(location.pathname.includes('edit-shipping'))
      setEditShipMode(true)
    else 
      setEditShipMode(false)
    return () => setEditShipMode(false)
  },[location]) 

  useEffect(() => {
    if(!showAdd) {
      setNewCountry('')
      setExtraCountry('')
    }
  },[showAdd])

  useEffect(() => {
    window.onclick = () => {
      if(editIndex > -1) {
        setEditIndex(-1)
      }
    }
  },[editIndex])

  return (
    <div className="editshippingpage">
      <PageTitle title={pagetitle}/>
      <div className="pagecont">
        <h3 className="pagetitle">{pagetitle}</h3>
        <div className="shippingcontent pagemaincontent">
          <AppInput title="Method Name" onChange={(e) => setShipName(e.target.value)} value={shipName}/>
          <AppTextarea title="Description (optional)" onChange={(e) => setShipDescript(e.target.value)} value={shipDescript}/>
          {/*Shipping Country Select*/}
          <h4>Shipping Countries</h4>
          <div className="shipcountriescont">
            <AppAccordion title="Countries" className={`${hasCountries?"show":""} ${showAdd?"hidden":""} `}>
              {shipcountriesrow}
              <div className="actionsdiv">
                <AdminBtn title="Save" disabled={!newCountry || addMode} solid clickEvent onClick={() => saveCountry()}/>
              </div>
            </AppAccordion>
            {
              showAdd&&<div className="addrow">
              <AppSelect 
              title="Choose Country" 
              className={`inprow countryselect`} 
              options={[{name:'Choose a Country',value:''},...countriesOpts.filter(x => !countriesArr.includes(x.name))]} 
              onChange={(e) => setExtraCountry(e.target.value)} 
              onClick={() => setAddMode(true)}
              value={extraCountry} 
              namebased
              />
              <AdminBtn title="Add" solid className="addbtn" disabled={!extraCountry} clickEvent onClick={() => addCountry()}/>
              </div>
            }
            <br/>
            <AdminBtn title={showAdd?"Hide":"New Country"} className="newcountrybtn" solid={!showAdd} clickEvent onClick={() => setShowAdd(prev => !prev)}/>
          </div>
          <h4>Shipping Options</h4>
          <AppSelect title="Courier Company" className="inprow" options={[{name:'Choose one...',value:''},...courrierOpts]} onChange={(e) => setShipCompany(e.target.value)} value={shipCompany}/>
          <AppInput title="Price" className="inprow" type="number" onChange={(e) => setShipPrice(e.target.value)} value={shipPrice}/>
          <AppSwitch title="Activate Method" className="inprow" onChange={(e) => setShipActive(e.target.checked)} checked={shipActive}/> 
          <div className="actionbtns">
            <AdminBtn 
              title={editShipMode?"Save Shipping":"Create Shipping"} 
              solid 
              className={`createbtn ${!allowCreate?"disabled":""}`}  
              clickEvent
              onClick={() => editShipMode?editShipping():createShipping()}
            />
            <AdminBtn 
              title="Delete Shipping" 
              solid 
              className="deletebtn" 
              hideBtn={!editShipMode}
              clickEvent 
              onClick={() => editShipMode&&deleteShipping()}
            />
            <AdminBtn title="Cancel" clickEvent onClick={() => history.push('/admin/shipping')}/>
          </div>
        </div>
      </div>
    </div>
  )
}