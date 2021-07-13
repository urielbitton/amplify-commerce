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
import firebase from 'firebase'
import PageTitle from '../common/PageTitle'

export default function EditShipping(props) {

  const {editShipMode, setEditShipMode, allShipping} = useContext(StoreContext)
  const {id, name, company, price, value,  isActive, description, countries} = editShipMode&&props.el
  const [shipName, setShipName] = useState(editShipMode?name:'')
  const [shipCompany, setShipCompany] = useState(editShipMode?company:'')
  const [shipPrice, setShipPrice] = useState(editShipMode?price:'')
  const [shipActive, setShipActive] = useState(editShipMode?isActive:'')
  const [shipDescript, setShipDescript] = useState(editShipMode?description:'')
  const [newCountry, setNewCountry] = useState('')
  const [extraCountry, setExtraCountry] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [countriesArr, setCountriesArr] = useState(editShipMode?countries:[])
  const [editIndex, setEditIndex] = useState(-1)
  const [addMode, setAddMode] = useState(false)
  const location = useLocation()
  const history= useHistory()
  const hasCountries = countriesArr.length

  const shipObj = {
    id: editShipMode?id:db.collection('coupons').doc().id,
    name: shipName,
    company: shipCompany,
    companyName: shipCompany,
    price: shipPrice,
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
    db.collection('shipping').doc('allshipping').update({
      allshipping: firebase.firestore.FieldValue.arrayUnion(shipObj)
    }).then(() => {
      window.alert('The shipping method has been successfully added to your store.')
      history.push('/admin/store/shipping')
    })
  }
  function editShipping() {
    const itemindex = allShipping.findIndex(x => x.id === id)
    allShipping[itemindex] = shipObj
    db.collection('shipping').doc('allshipping').update({
      allshipping: allShipping
    }).then(() => {
      window.alert('The shipping method has been successfully saved.')
      history.push('/admin/store/shipping')
    })
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
      <PageTitle title={editShipMode?"Edit A Shipping Method":"Create A Shipping Method"}/>
      <div className="pagecont">
        <h3 className="pagetitle">{editShipMode?"Edit Shipping":"Add Shipping"}</h3>
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
          <AdminBtn 
            title={editShipMode?"Save Shipping":"Create Shipping"} 
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