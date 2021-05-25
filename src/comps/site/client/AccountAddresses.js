import React, { useContext, useRef, useState } from 'react'
import AppButton from '../common/AppButton'
import './styles/AccountAddresses.css'
import {AppInput, AppSelect} from '../../common/AppInputs'
import {countries} from '../../common/Lists'
import {db} from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'

export default function AccountAddresses()  {

  const {myUser, user} = useContext(StoreContext)
  const myAddresses = myUser?.addresses
  const [showAddCont, setShowAddCont] = useState(false)
  const [addressDetails, setAddressDetails] = useState({
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
  console.log(myAddresses)

  const inputsOpts = [
    {title: 'Full Name *', name: 'fullname'},
    {title: 'Address *', name: 'address'},
    {title: 'Apt/Unit Number', name: 'aptunit'},
    {title: 'City *', name: 'city'},
    {title: 'Province/State *', name: 'provstate'},
    {title: 'Country *', options: countries},
    {title: 'Postal Code/ZIP *', name: 'postcode'},
    {title: 'Phone', name: 'phone'},
  ]

  const inputsrow = inputsOpts.map(({title,name,value,options}) => {
    if(!options)
      return <AppInput 
      title={title}
      name={name}
      onChange={(e) => handleChange(e)}
    /> 
    else 
      return <AppSelect 
        title={title}
        options={[{name:'Choose an Option',disabled:true},...options]} 
        onChange={(e) => setAddressDetails(prev =>({...prev, country:e.target.value}))}/>
  })
  const addressboxrows = myAddresses?.map(el => {
    return <AddressBox el={el} />
  })

  function handleChange(event) {
    const {name, value} = event.target
    setAddressDetails(prev => ({
      ...prev,
      [name]:value
    })) 
  }
  function addAddress() {
    if(addressDetails.fullname && addressDetails.address && addressDetails.city && addressDetails.provstate
      && addressDetails.country && addressDetails.postcode) {
        if(!myAddresses.find(x => x.address === addressDetails.address)) {
          myAddresses.push(addressDetails)
          db.collection('users').doc(user.uid).update({
            userinfo: myUser
          }).then(res => setShowAddCont(false))
        } 
    }
    else {
      window.alert('Please fill in all required fields (marked by *)')
    }
  }

  return (
    <div className="accountaddresspage">
      <h3 className="contenttitle">
        Addresses
        <AppButton 
          title="Add Address" 
          onClick={() => setShowAddCont(true)}
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
              title="Add Address"
              onClick={() => addAddress()}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

function AddressBox(props) {

  const {fullname, address, aptunit, city, provstate, country, postcode,phone,primary} = props.el
  const {myUser, user} = useContext(StoreContext)
  const myAddresses = myUser?.addresses

  function setPrimaryAddress() {
    myAddresses.forEach(el => {
      el.primary = false
    })
    myAddresses.find(x => x.address === address).primary = true
    db.collection('users').doc(user.uid).update({
      userinfo: myUser 
    })
  }

  return (
    <div className={`addressbox ${primary?"primary":""}`}>
      <div className="infocont">
        <h6 className="name">{fullname}</h6>
        <h6>{address}</h6>
        <h6>Apt. {aptunit}</h6>
        <h6>{city}, {provstate} {postcode}</h6>
        <h6>{country}</h6>
        <h6>Phone: {phone}</h6>
      </div>
      <div className="actionscont">
        <small>Edit</small>
        <small>Delete</small>
        <small 
          className={primary?"primary":""} 
          onClick={() => !primary&&setPrimaryAddress()}
        >{!primary?"Make Default":"Default"}</small>
      </div>
    </div>
  )
}