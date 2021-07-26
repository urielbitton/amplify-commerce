import React, { useContext, useEffect, useRef, useState } from 'react'
import AppButton from '../common/AppButton'
import {AppInput} from '../../common/AppInputs'
import {db} from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'
import AddressBox from './AddressBox'
import RegionCountry from '../../common/RegionCountry'

export default function AccountAddresses()  {

  const {myUser, user, userLocation} = useContext(StoreContext)
  const myAddresses = myUser?.addresses
  const [showAddCont, setShowAddCont] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [addressDetails, setAddressDetails] = useState({
    id: '',
    fname: '',
    lname: '',
    address: '',
    aptunit: '',
    city: '',
    postcode: '',
    phone: '',
    email: '',
    primary: false
  }) 
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState('')
  const [provinceChoices, setProvinceChoices] = useState([])
  const formRef = useRef()
  const allowAccess = addressDetails.fname && addressDetails.lname && addressDetails.address && addressDetails.city
    && region && country && addressDetails.postcode

  const inputsOpts = [
    {title: 'First Name *', name: 'fname', value: addressDetails.fname, halfwidth: true},
    {title: 'Last Name *', name: 'lname', value: addressDetails.lname, halfwidth: true},
    {title: 'Address *', name: 'address', value: addressDetails.address},
    {title: 'Apt/Unit Number', name: 'aptunit', value: addressDetails.aptunit}, 
    {title: 'City *', name: 'city', value: addressDetails.city},
    {title: 'Postal Code/ZIP *', name: 'postcode', value: addressDetails.postcode},
    {title: 'Phone', name: 'phone', value: addressDetails.phone},
    {title: 'Email', name: 'email', value: addressDetails.email},
  ] 

  const inputsrow = inputsOpts.map(({title,name,value}) => {
    return <AppInput 
      title={title}
      name={name}
      onChange={(e) => handleChange(e)}
      value={value}
    /> 
  })
  const addressboxrows = myAddresses?.map(el => {
    return <AddressBox 
      el={el} 
      setAddressDetails={setAddressDetails} 
      showAddCont={showAddCont}
      setShowAddCont={setShowAddCont} 
      addressDetails={addressDetails}
      editMode={editMode}
      setEditMode={setEditMode}
      showActions
    />
  })

  function handleChange(event) {
    const {name, value} = event.target
    setAddressDetails(prev => ({
      ...prev,
      [name]:value
    })) 
  }
  function addAddress() { 
    if(!!allowAccess) {
        if(!myAddresses.find(x => x.address === addressDetails.address)) {
          addressDetails.country = country
          addressDetails.region = region
          addressDetails.primary = false
          addressDetails.id = db.collection('users').doc().id
          myAddresses.push(addressDetails)
          db.collection('users').doc(user.uid).update({
            userinfo: myUser
          }).then(res => setShowAddCont(false))
        } 
        else
          window.alert('This address already exists. Please enter a different address.')
    }
    else
      window.alert('Please fill in all required fields (marked by *)')
  }
  function editAddress() {
    if(!!allowAccess) {
        myAddresses.forEach(el => {
          if(el.id === addressDetails.id) {
            let itemindex = myAddresses.indexOf(el)
            myAddresses[itemindex] = addressDetails
          }
        }) 
        db.collection('users').doc(user.uid).update({
          userinfo: myUser
        }).then(res => {
          setShowAddCont(false)
          //formRef.current.reset()
        }) 
    }
  }
  function addAddressSet() {
    setAddressDetails()
    setEditMode(false)
    setShowAddCont(true)
    setAddressDetails(prev => ({
      ...prev, country: userLocation?.country
    }))
  }

  return (
    <div className="accountaddresspage">
      <h3 className="accounttitle">
        My Addresses
        <AppButton 
          className="userbtn"
          title="Add Address" 
          onClick={() => addAddressSet()}
        />
      </h3>
      <div className="addressescont">
        {addressboxrows}
      </div>

      <div className={`addaddresscover ${showAddCont?"show":""}`}>
        <div className="addaddresscont bluescrollbar">
          <h4>
            Add An Address
            <i className="fal fa-times" onClick={() => {setShowAddCont(false)}}></i>
          </h4>
          <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
            {inputsrow.slice(0,4)}
            <RegionCountry 
              country={country} 
              setCountry={setCountry}
              region={region} 
              setRegion={setRegion}
              provinceChoices={provinceChoices} 
              setProvinceChoices={setProvinceChoices}
            />
            {inputsrow.slice(4,8)}
            <AppButton 
              title={!editMode?"Add Address":"Edit Address"}
              onClick={() => !editMode?addAddress():editAddress()}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

