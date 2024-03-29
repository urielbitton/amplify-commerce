import React, { useContext } from 'react'
import {db} from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'
import './styles/AddressBox.css'

export default function AddressBox(props) {

  const {id, fname, lname, address, aptunit, city, region, country, postcode,phone,primary} = props.el
  const {setAddressDetails, setShowAddCont, setEditMode, showActions=false} = props
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
  function editAddressSet() {
    setEditMode(true)
    setAddressDetails({
      id,
      fname,
      lname,
      address,
      aptunit: aptunit??"",
      city,
      region,
      country,
      postcode,
      phone: phone??"",
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

  return (
    <div className={`addressbox ${primary?"primary":""}`}>
      <div className="infocont">
        <h6 className="name">{fname} {lname}</h6>
        <h6>{address}</h6>
        {aptunit?.length?<h6>Apt. {aptunit}</h6>:""}
        <h6>{city}, {region} {postcode}</h6>
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