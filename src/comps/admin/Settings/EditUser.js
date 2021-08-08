import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AppInput, AppSwitch } from '../../common/AppInputs'
import { db, Fire2 } from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import PageTitle from '../common/PageTitle'
import RegionCountry from '../../common/RegionCountry'
import genRandomNum from '../../common/genRandomNum'
import { convertCountryCode, convertProvinceCode } from '../../common/UtilityFuncs'
import UploadImg from '../../common/UploadImg'
import {validateEmail} from '../../common/UtilityFuncs'

export default function EditUser(props) {

  const {editUserMode, setEditUserMode, setNotifs} = useContext(StoreContext)
  const {userid, fullname, email, phone, address, city, region, provState, country,
    profimg, isActive, password} = editUserMode&&props.el
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
  const genNewUserId = db.collection('users').doc().id
  const userId = editUserMode? userid : genNewUserId
  const location = useLocation()
  const pagetitle = editUserMode?"Edit User":"Add User"
  const allowCreate = userId && userName && validateEmail(userEmail) && userPhone && userAddress && userCity && userRegion 
    && userCountry && (userPassword1 === userPassword2)
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
    profimg: userImg.length?userImg:"https://i.imgur.com/1OKoctC.jpg",
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
    profimg: userImg.length?userImg:"https://i.imgur.com/1OKoctC.jpg",
    userRating: 0,
    isActive: isUserActive,
    dateCreated: new Date()
  }

  function createUser() {
    if(!!allowCreate) {
      Fire2.auth().createUserWithEmailAndPassword(userEmail, userPassword2).catch(err => {
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
        updateUserAndCustomer(false)
      })
    }
  }
  function updateUserAndCustomer(editing) {
    db.collection('users').doc(userId).set({userinfo:userObj}, {merge:true})
    .then(() => {
      db.collection('customers').doc(userId).set(customerObj, {merge:true})
      .then(() => {
        history.push('/admin/settings/users')
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: editing?'User Saved':`New User Created`,
          icon: editing?'fal fa-save':'fal fa-plus',
          text: editing?"User & customer has been successfully saved.":"New user and corresponding customer has been created and added to your store.",
          time: 5000
        }])
      })
    })
  }
  function saveUser() {
    updateUserAndCustomer(true)
  }
  
  function deleteUser() {
    const confirm = window.confirm('Are you sure you want to delete this user & coresponding customer?')
    if(editUserMode && confirm) {
      db.collection('users').doc(userId).delete().then(() => {
        db.collection('customers').doc(userId).delete().then(() => {
          db.collection('chats').doc(userId).delete().then(() => {
            history.push('/admin/settings/users')
            setNotifs(prev => [...prev, {
              id: Date.now(),
              title: 'User Deleted',
              icon: 'fal fa-trash-alt',
              text: "The user & customer has been successfully deleted from your store.",
              time: 5000
            }])
          })
        })
      })
    }
  }
 
  useEffect(() => {
    setUserImg(editUserMode?profimg:"https://i.imgur.com/1OKoctC.jpg")
    setUserName(editUserMode?fullname:"")
    setUserEmail(editUserMode?email:"")
    setUserPassword1(editUserMode?password:"")
    setUserPassword2(editUserMode?password:"")
    setUserPhone(editUserMode?phone:"")
    setUserAddress(editUserMode?address:"")
    setUserCity(editUserMode?city:"")
    setUserRegion(editUserMode?region:"")
    setUserCountry(editUserMode?country:"")
    setIsUserActive(editUserMode?isActive:true)
  },[editUserMode])

  useEffect(() => {
    if(location.pathname.includes('/edit-user')) 
      setEditUserMode(true)
    else
      setEditUserMode(false)
    return () => setEditUserMode(false) 
  },[location])

  useEffect(() => {
    setUserID(genNewUserId)
  },[])

  return (
    <div className="edituserpage">
      <PageTitle title={pagetitle} />
      <div className="pagecont">
        <h3 className="pagetitle">{pagetitle}</h3>
        <div className="pagemaincontent">
          <div className="profilecont">
            <UploadImg 
              img={userImg} 
              setImg={setUserImg} 
              storagePath={`${userId}/images/userimg`} 
              className="profimgcont"
            />
          </div>
          <br/>
          <div className="generatecont">
            <AppInput title="User ID" onChange={(e) => setUserID(e.target.value)} value={userID} />
            <AdminBtn title="Generate Number" solid clickEvent onClick={() => setUserID(genNewUserId)}/>
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
            <AdminBtn title={editUserMode?"Save User":"Create User"} className={!!!allowCreate?"disabled":""} solid clickEvent onClick={() => !editUserMode?createUser():saveUser()}/>
            {editUserMode&&<AdminBtn title="Delete User" solid className="deletebtn" clickEvent onClick={() => deleteUser()}/>}
            <AdminBtn title="Cancel" url="/admin/settings/users/"/>
          </div>
        </div>
      </div>
    </div>
  )
}