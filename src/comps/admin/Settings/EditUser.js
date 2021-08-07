import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AppInput, AppSwitch } from '../../common/AppInputs'
import { db } from '../../common/Fire'
import firebase from 'firebase'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import PageTitle from '../common/PageTitle'
import RegionCountry from '../../common/RegionCountry'
import genRandomNum from '../../common/genRandomNum'
import { convertCountryCode, convertProvinceCode } from '../../common/UtilityFuncs'

export default function EditUser(props) {

  const {editUserMode, setEditUserMode, setNotifs} = useContext(StoreContext)
  const {userid, name, email, phone, address, city, provState, country,
    profimg, isActive, dateCreated} = editUserMode&&props
  const [userID, setUserID] = useState('')
  const [userImg, setUserImg] = useState('')
  const [userName, setUserName] = useState('')  
  const [userEmail, setUserEmail] = useState('')
  const [userPassword1, setUserPassword1] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userRegion, setUserRegion] = useState('')
  const [userCountry, setUserCountry] = useState('')
  const [provinceChoices, setProvinceChoices] = useState([])
  const [isUserActive, setIsUserActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const loadingRef = useRef()
  const genNewUserId = db.collection('users').doc().id
  const userId = editUserMode? userid : genNewUserId
  const location = useLocation()
  const pagetitle = editUserMode?"Edit User":"Add User"
  const allowCreate = userId && userName && userEmail && userPhone && userAddress && userCity && userRegion && userCountry
  const history = useHistory()

  const userObj = {
    userid: userId,
    isAdmin: false,
    fullname: userName,
    email: userEmail,
    password: userPassword2,
    phone: userPhone,
    address: userAddress,
    city: userCity,
    region: userRegion,
    country: userCountry,
    regionCode: convertProvinceCode(provinceChoices, userRegion)??'',
    countryCode: convertCountryCode(userCountry)??'',
    profimg: url,
    isActive: isUserActive,
    dateCreated: new Date(),
    addresses: [],
    cart: [],
    payments: [],
    savedlater: [],
    settings: {},
    wishlist: []
  }
  const customerObj = {
    id: userId,
    number: genRandomNum(),
    name: userName,
    email: userEmail,
    phone: userPhone,
    address: userAddress,
    city: userCity,
    region: userRegion,
    country: userCountry,
    regionCode: convertProvinceCode(provinceChoices, userRegion)??'',
    countryCode: convertCountryCode(userCountry)??'',
    moneySpent: 0,
    profimg: url,
    userRating: 0,
    isActive: isUserActive,
    dateCreated: new Date()
  }

  function createUser() {
    if(!!allowCreate) {
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword2).catch(err => {
        switch(err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            window.alert('Please enter a valid email address.')
          break
          case "auth/weak-password":
            window.alert(err.message)
          break
          default: 
        }
      }).then(() => {
        db.collection('users').doc(genNewUserId).set({userinfo:userObj})
        .then(() => {
          db.collection('customers').doc(genNewUserId).set(customerObj)
          .then(() => {
            setNotifs(prev => [...prev, {
              id: Date.now(),
              title: `New User Created`,
              icon: 'fal fa-plus',
              text: `New user has been successfully created and added to your store.`,
              time: 5000
            }])
          })
        })
      })
    }
  }
  function editUser() {

  }
  function deleteUser() {

  }

  useEffect(() => {
    if(location.pathname.includes('/edit-user')) 
    setEditUserMode(true)
    else
    setEditUserMode(false)
    return () => setEditUserMode(false) 
  },[location])

  return (
    <div className="edituserpage">
      <PageTitle title={pagetitle} />
      <div className="pagecont">
        <h3 className="pagetitle">{pagetitle}</h3>
        <div className="pagemaincontent">
          <div className="profilecont">
            <div className="profimgcont">
              <label>
                <input  
                  style={{display:'none'}} 
                  type="file" 
                />
                <img src={userImg.length?userImg:url.length?url:'https://i.imgur.com/1OKoctC.jpg'} alt=""/>
                <div className="iconcont">
                  <i className="fas fa-camera"></i>
                </div>
                <div className={`loadertube ${loading?"show":""}`}>
                  <div className="prog" ref={loadingRef}></div>
                </div>
              </label>
            </div>
          </div>
          <div className="generatecont">
            <AppInput title="User ID" onChange={(e) => setUserID(e.target.value)} value={userID} />
            <AdminBtn title="Generate Number" solid clickEvent />
          </div>
          <AppInput title="Full Name" onChange={(e) => setUserName(e.target.value)} value={userName}/>
          <AppInput title="Email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail}/>
          <AppInput title="Password" onChange={(e) => setUserPassword1(e.target.value)} value={userPassword1}/>
          <AppInput title="Confirm Password" onChange={(e) => setUserPassword2(e.target.value)} value={userPassword2}/>
          <AppInput title="Phone" onChange={(e) => setUserPhone(e.target.value)} value={userPhone}/>
          <AppInput title="Address" onChange={(e) => setUserAddress(e.target.value)} value={userAddress}/>
          <AppInput title="City" onChange={(e) => setUserCity(e.target.value)} value={userCity}/>
          <RegionCountry 
            country={userCountry}
            setCountry={setUserCountry}
            region={userRegion}
            setRegion={setUserRegion}
            provinceChoices={provinceChoices} 
            setProvinceChoices={setProvinceChoices}
          />
          <AppSwitch className="inprow show" title="Active" onChange={(e) => setIsUserActive(e.target.checked)} checked={isUserActive}/>
          <small>Upon successfull user creation, a customer will be created and automatically linked to the new user</small>
          <div className="final actionbtns">
            <AdminBtn title={editUserMode?"Edit User":"Create User"} className={!!!allowCreate?"disabled":""} solid clickEvent onClick={() => !editUserMode?createUser():editUser()}/>
            {editUserMode&&<AdminBtn title="Delete Customer" solid className="deletebtn" clickEvent onClick={() => deleteUser()}/>}
            <AdminBtn title="Cancel" url="/admin/users/"/>
          </div>
        </div>
      </div>
    </div>
  )
}