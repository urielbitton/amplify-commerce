import React, { useContext, useEffect, useState } from 'react'
import './styles/Settings.css'
import {StoreContext} from '../../common/StoreContext'
import { db } from '../../common/Fire'
import firebase from 'firebase'
import { updateDB } from '../../common/services/CrudDb'

export default function UserProfile() {

  const {myUser, allProducts, allOrders, allCustomers, allUsers, allCoupons, allShipping, 
    darkMode, appearSettings} = useContext(StoreContext)
  const [profImg, setProfImg] = useState('')

  function uploadSetImg(e) {
    const file = e.target.files[0]
    if(file) {
      const storageRef = firebase.storage().ref('/admin/account/profimg')
      const task = storageRef.put(file)
      task.on("stat_changes", 
        function complete() {
          storageRef.getDownloadURL().then(url => {
            db.collection('users').doc(myUser.userid).update({
              'userinfo.profimg': url
            }).then(() => updateDB('admin', 'accountSettings', {profimg:url}))
          })
        },
        function error() {
          window.alert('File upload error. Please try again later.')
        }
      )
    }
  }

  useEffect(() => {
    setProfImg(myUser.profimg)
  },[myUser])

  return (
    <div className="userprofilecont">
      <div className="profimgcont imguploadcont">
        <label>
          <input style={{display:'none'}} type="file" onChange={(e) => uploadSetImg(e)}/>
          <img src={profImg.length?profImg:"https://i.imgur.com/1OKoctC.jpg"} alt=""/>
          <div className="iconcont">
            <i className="fas fa-camera"></i>
          </div>
        </label>
      </div>
      <h4>{myUser.fullname}</h4>
      <h6>{myUser.provstate}, {myUser.country}</h6>
      <br/>
      <div className="infotab accinfo">
        <h4>Account Info</h4>
        <h6><span>ID: </span>{myUser.userid}</h6>
        <h6><span>Email: </span>{myUser.email}</h6>
      </div>
      <div className="infotab">
        <h4>Store Info</h4>
        <h6><span>Products: </span>{allProducts.length}</h6>
        <h6><span>Orders: </span>{allOrders.length}</h6>
        <h6><span>Customers: </span>{allCustomers.length}</h6>
        <h6><span>Users: </span>{allUsers.length}</h6>
        <h6><span>Coupons: </span>{allCoupons.length}</h6>
        <h6><span>Shipping Methods: </span>{allShipping.length}</h6>
      </div>
      <div className="infotab">
        <h4>Theme</h4>
        <h6><span>Dark Mode</span>{darkMode?"On":"Off"}</h6>
        <h6><span>App Theme</span>{appearSettings.appTheme}</h6>
      </div>
      <div className="infotab">
        <h4>Permissions</h4>
        <h6><span>User Role</span>Administrator</h6>
      </div>
    </div>
  )
}