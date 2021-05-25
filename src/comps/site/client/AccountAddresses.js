import React, { useContext, useRef, useState } from 'react'
import AppButton from '../common/AppButton'
import {AppInput, AppSelect} from '../../common/AppInputs'
import {countries} from '../../common/Lists'
import {db} from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'
import AddressBox from './AddressBox'

export default function AccountAddresses()  {

  const {myUser, user, setLocateUser, userLocation} = useContext(StoreContext)
  const myAddresses = myUser?.addresses
  const [showAddCont, setShowAddCont] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [addressDetails, setAddressDetails] = useState({
    id: '',
    fullname: '',
    address: '',
    aptunit: '',
    city: '',
    provstate: '', 
    country: '',
    postcode: '',
    phone: '',
    primary: false
  }) 
  const formRef = useRef()

  const inputsOpts = [
    {title: 'Full Name *', name: 'fullname', value: addressDetails.fullname},
    {title: 'Address *', name: 'address', value: addressDetails.address},
    {title: 'Apt/Unit Number', name: 'aptunit', value: addressDetails.aptunit}, 
    {title: 'City *', name: 'city', value: addressDetails.city},
    {title: 'Province/State *', name: 'provstate', value: addressDetails.provstate},
    {title: 'Country *', options: countries},
    {title: 'Postal Code/ZIP *', name: 'postcode', value: addressDetails.postcode},
    {title: 'Phone', name: 'phone', value: addressDetails.phone},
  ]

  const inputsrow = inputsOpts.map(({title,name,options,value}) => {
    if(!options)
      return <AppInput 
      title={title}
      name={name}
      onChange={(e) => handleChange(e)}
      value={value}
    /> 
    else 
      return <AppSelect 
        title={title}
        options={[{name:'Choose an Option',disabled:true,selected:'selected'},...options]} 
        value={addressDetails.country || userLocation?.country?.toLowerCase()}
        onChange={(e) => setAddressDetails(prev =>({...prev, country:e.target.value}))}
      />
  })
  const addressboxrows = myAddresses?.map(el => {
    return <AddressBox 
      el={el} 
      setAddressDetails={setAddressDetails} 
      setShowAddCont={setShowAddCont} 
      addressDetails={addressDetails}
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
    console.log(addressDetails)
    if(addressDetails.fullname && addressDetails.address && addressDetails.city && addressDetails.provstate
      && addressDetails.country && addressDetails.postcode) {
        if(!myAddresses.find(x => x.address === addressDetails.address)) {
          addressDetails.id = db.collection('users').doc().id
          myAddresses.push(addressDetails)
          db.collection('users').doc(user.uid).update({
            userinfo: myUser
          }).then(res => {
            setShowAddCont(false)
            formRef.current.reset()
          })
        } 
        else {
          window.alert('This address already exists. Please enter a different address.')
        }
    }
    else {
      window.alert('Please fill in all required fields (marked by *)')
    }
  }
  function editAddress() {
    if(addressDetails.fullname && addressDetails.address && addressDetails.city && addressDetails.provstate
      && addressDetails.country && addressDetails.postcode) {
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
          formRef.current.reset()
        }) 
    }
  }
  function addAddressSet() {
    setAddressDetails()
    setEditMode(false)
    setShowAddCont(true)
    setAddressDetails(prev => ({
      ...prev, country: userLocation?.country?.toLowerCase()
    }))
  }

  return (
    <div className="accountaddresspage">
      <h3 className="contenttitle">
        Addresses
        <AppButton 
          title="Add Address" 
          onClick={() => addAddressSet()}
        />
      </h3>
      <div className="addressescont">
        {addressboxrows}
      </div>

      <div className={`addaddresscover ${showAddCont?"show":""}`}>
        <div className="addaddresscont">
          <h4>
            Add An Address
            <i className="fal fa-times" onClick={() => {formRef.current.reset();setShowAddCont(false)}}></i>
          </h4>
          <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
            {inputsrow}
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

