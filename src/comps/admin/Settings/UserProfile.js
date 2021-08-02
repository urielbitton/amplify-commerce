import React, { useContext, useEffect, useState } from 'react'
import './styles/Settings.css'
import {StoreContext} from '../../common/StoreContext'
import ImgUploader from '../../common/services/ImgUploader'

export default function UserProfile() {

  const {myUser, allProducts, allOrders, allCustomers, allCoupons, allShipping,
    darkMode} = useContext(StoreContext)
  const [url, setUrl] = useState('')
  const [profImg, setProfImg] = useState(myUser.profimg)
  
  useEffect(() => {
    url.length&&setProfImg('')
  },[url])

  return (
    <div className="userprofilecont">
      <div className="profimgcont">
        <label>
          <input  
            style={{display:'none'}} 
            type="file" 
            onChange={(e) => ImgUploader(e, setUrl, 'admin/account/profimg', myUser.userid, 'userinfo.profimg')}
          />
          <img src={profImg.length?profImg:url.length?url:'https://i.imgur.com/1OKoctC.jpg'} alt=""/>
          <div className="iconcont">
            <i className="far fa-camera"></i>
          </div>
        </label>
      </div>
      <h4>{myUser.fullname}</h4>
      <h6>{myUser.provstate}, {myUser.country}</h6>
      <br/>
      <div className="infotab">
        <h4>Account Info</h4>
        <h6><span>ID: </span>{myUser.userid}</h6>
        <h6><span>Email: </span>{myUser.email}</h6>
      </div>
      <div className="infotab">
        <h4>Store Info</h4>
        <h6><span>Products: </span>{allProducts.length}</h6>
        <h6><span>Orders: </span>{allOrders.length}</h6>
        <h6><span>Customers: </span>{allCustomers.length}</h6>
        <h6><span>Coupons: </span>{allCoupons.length}</h6>
        <h6><span>Shipping Methods: </span>{allShipping.length}</h6>
      </div>
      <div className="infotab">
        <h4>Theme</h4>
        <h6><span>Dark Mode</span>{darkMode?"On":"Off"}</h6>
        <h6><span>Color Theme</span></h6>
      </div>
      <div className="infotab">
        <h4>Permissions</h4>
        <h6><span>User Role</span>Administrator</h6>
      </div>
    </div>
  )
}