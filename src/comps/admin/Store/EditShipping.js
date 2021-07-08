import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppInput, AppSelect, AppSwitch, AppTextarea } from '../../common/AppInputs'
import { db } from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import {courrierOpts} from './arrays/arrays'
import AdminBtn from '../common/AdminBtn'
import {countries as countriesOpts} from '../../common/Lists'
import './styles/EditShipping.css'
import AppAccordion from '../../site/common/AppAccordion'

export default function EditShipping(props) {

  const {editShipMode, setEditShipMode} = useContext(StoreContext)
  const {id, name, company, price, value,  isActive, description, countries} = editShipMode&&props.el
  const [shipName, setShipName] = useState(editShipMode?name:'')
  const [shipCompany, setShipCompany] = useState(editShipMode?company:'')
  const [shipPrice, setShipPrice] = useState(editShipMode?price:'')
  const [shipActive, setShipActive] = useState(editShipMode?isActive:'')
  const [shipDescript, setShipDescript] = useState(editShipMode?description:'')
  const [newCountry, setNewCountry] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [countriesArr, setCountriesArr] = useState([])
  const [editIndex, setEditIndex] = useState(-1)
  const location = useLocation()
  const hasCountries = countriesArr.length || (editShipMode&&countries.length)

  const shipObj = {
    id: editShipMode?id:db.collection('coupons').doc().id,
    name: shipName,
    company: shipCompany,
    price: shipPrice,
    isActive: shipActive,
    value: editShipMode?value: shipName.split(' ')[0].toLowerCase(),
    description: shipDescript
  }

  const shipcountriesrow = countriesArr?.map((el,i) => {
    return <div className="inprow" onClick={() => setEditIndex(i)}>
      <AppSelect 
        title="Country" 
        className="inprow" 
        options={countriesOpts} 
        onChange={(e) => setNewCountry(e.target.value)} 
        value={editIndex===i?newCountry:el} 
        namebased 
      />
    </div>
  })

  function createShipping() {
    
  }
  function editShipping() {

  }
  function addCountry() {
    setCountriesArr(prev => [...prev, newCountry])
    setNewCountry('')
  }

  useEffect(() => {
    if(!editShipMode) {
      setShipName('')
      setShipCompany('')
      setShipPrice('')
      setShipActive('')
      setShipDescript('')
    }
    return() => setEditShipMode(false)
  },[editShipMode])

  useEffect(() => {
    if(location.pathname.includes('edit-shipping'))
      setEditShipMode(true)
    else 
      setEditShipMode(false)
  },[location]) 

  useEffect(() => {
    if(!showAdd) {
      setNewCountry('')
    }
  },[showAdd])

  useEffect(() => {
    setShowAdd(false)
  },[editIndex])

  return (
    <div className="editshippingpage">
      <div className="pagecont">
        <h3 className="pagetitle">{editShipMode?"Edit Shipping":"Add Shipping"}</h3>
        <div className="shippingcontent pagemaincontent">
          <AppInput title="Method Name" onChange={(e) => setShipName(e.target.value)} value={shipName}/>
          <AppTextarea title="Description (optional)" onChange={(e) => setShipDescript(e.target.value)} value={shipDescript}/>
          {/*Shipping Country Select*/}
          <h4>Shipping Countries</h4>
          <div className="shipcountriescont">
            <AppAccordion title="Countries" className={`${hasCountries?"show":""} `}>
              {shipcountriesrow}
            </AppAccordion>
            {
              showAdd&&<>
              <AppSelect 
              title="Choose Country" 
              className={`inprow countryselect`} 
              options={[{name:'Choose a Country',value:''},...countriesOpts]} 
              onChange={(e) => setNewCountry(e.target.value)} 
              value={newCountry} 
              namebased
              />
              <AdminBtn title="Add" className="addbtn" disabled={!newCountry} clickEvent onClick={() => addCountry()}/>
              </>
            }
            <br/>
            <AdminBtn title={showAdd?"Hide":"New Country"} className="newcountrybtn" solid clickEvent onClick={() => setShowAdd(prev => !prev)}/>
          </div>
          <h4>Shipping Options</h4>
          <AppSelect title="Courier Company" className="inprow" options={[{name:'Choose one...',value:''},...courrierOpts]} onChange={(e) => setShipCompany(e.target.value)} value={shipCompany}/>
          <AppInput title="Price" className="inprow" type="number" onChange={(e) => setShipPrice(e.target.value)} value={shipPrice}/>
          <AppSwitch title="Activate Method" className="inprow" onChange={(e) => setShipActive(e.target.checked)} checked={shipActive}/> 
          <AdminBtn 
            title={editShipMode?"Edit Shipping":"Create Shipping"} 
            solid 
            className="createbtn"  
            clickEvent
            onClick={() => editShipMode?editShipping():createShipping()}
          />
        </div>
      </div>
    </div>
  )
}