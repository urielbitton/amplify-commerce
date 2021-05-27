import React, { useContext, useEffect } from 'react'
import {db} from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'
import './styles/AddressBox.css'
import {countries} from '../../common/Lists'
import { useLocation } from 'react-router-dom'

export default function AddressBox(props) {

  const {id, fname, lname, address, aptunit, city, provstate, country, postcode,phone,primary} = props.el
  const {setAddressDetails, setShowAddCont, editMode, setEditMode, showActions=false} = props
  const {myUser, user, selectedCountry, selectedProvince, setSelectedCountry, 
    setSelectedProvince, provinceChoices} = useContext(StoreContext)
  const myAddresses = myUser?.addresses
  const location = useLocation()

  function setPrimaryAddress() {
    myAddresses.forEach(el => {
      el.primary = false
    })
    myAddresses.find(x => x.address === address).primary = true
    db.collection('users').doc(user.uid).update({
      userinfo: myUser 
    })
  }
  function editAddressSet() {
    setEditMode(true)
    setSelectedCountry(countries?.find(x => x.name===country)?.code)
    setAddressDetails({
      id,
      fname,
      lname,
      address,
      aptunit,
      city,
      provstate,
      country,
      postcode,
      phone,
      primary: true
    })
    setShowAddCont(true)
  }
  function deleteAddress() {
    let confirm = window.confirm('Are you sure you want to delete this address?')
    if(confirm) {
      myAddresses.forEach(el => {
        if(el.id === id) {
          let itemindex = myAddresses.indexOf(el)
          myAddresses.splice(itemindex,1)
        }
      }) 
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      })
    }
  }
 
  useEffect(() => {
    if(location.pathname.includes('checkout')) {
      setSelectedCountry(countries?.find(x => x.name===country)?.code)
      setSelectedProvince(provinceChoices?.find(x => x.name===provstate)?.isoCode)
    }
  },[selectedCountry, provinceChoices]) 

  return (
    <div className={`addressbox ${primary?"primary":""}`}>
      <div className="infocont">
        <h6 className="name">{fname} {lname}</h6>
        <h6>{address}</h6>
        {aptunit.length?<h6>Apt. {aptunit}</h6>:""}
        <h6>{city}, {provstate} {postcode}</h6>
        <h6>{country}</h6>
        <h6>Phone: {phone}</h6>
      </div>
      {
        showActions&&
        <div className="actionscont">
          <small onClick={() => editAddressSet()}>Edit</small>
          <small onClick={() => deleteAddress()}>Delete</small>
          <small 
            className={primary?"primary":""} 
            onClick={() => !primary&&setPrimaryAddress()}
          >{!primary?"Make Default":"Default"}</small>
        </div>
      }
    </div>
  )
}