import React, { useContext } from 'react'
import {db} from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'

export default function AddressBox(props) {

  const {fullname, address, aptunit, city, provstate, country, postcode,phone,primary} = props.el
  const {setAddressDetails, setShowAddCont, setEditMode} = props
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
      fullname,
      address,
      aptunit,
      city,
      provstate,
      country,
      postcode,
      phone
    })
    setShowAddCont(true)
  }
  function deleteAddress() {
    
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
        <small onClick={() => editAddressSet()}>Edit</small>
        <small onClick={() => deleteAddress()}>Delete</small>
        <small 
          className={primary?"primary":""} 
          onClick={() => !primary&&setPrimaryAddress()}
        >{!primary?"Make Default":"Default"}</small>
      </div>
    </div>
  )
}