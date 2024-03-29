import React, { useContext, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import PageTitlesRow from '../common/PageTitlesRow'
import { AppInput } from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import RegionCountry from '../../common/RegionCountry'
import { StoreContext } from '../../common/StoreContext'
import { setDB, updateDB } from '../../common/services/CrudDb'
import Reauth from '../../common/Reauth'
import { db } from '../../common/Fire'

export default function AccountSettings() {
  
  const {myUser, setNotifs, user, accountSettings} = useContext(StoreContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState('')
  const [chatName, setChatName] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [provinceChoices, setProvinceChoices] = useState([])
  const [showReauth, setShowReauth] = useState(false)
  const [allowUpdate, setAllowUpdate] = useState(false)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allowAccess = (myUser.fullname !== name || myUser.phone !== phone || myUser.city !== city
    || myUser.provstate !== region || myUser.country !== country) && (name.length && phone.length && city.length
    && region.length && country.length) 
  const allowAuthUpdate = (myUser.email !== email || myUser.password !== password)
  const updateID = db.collection('updates').doc().id

  function saveSettings() {
    if(!!allowAccess) {
      updateDB('users', myUser.userid, {
        'userinfo.fullname': name,
        'userinfo.phone': phone,
        'userinfo.city': city,
        'userinfo.region': region,
        'userinfo.country': country,
      }).then(() => {
        updateDB('admin', accountSettings, {chatName, name})
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Account Saved',
          icon: 'fal fa-save',
          text: `Your account settings have been successfully saved.`,
          time: 5000
        }])
        setDB('updates', updateID, {
          color: '#0088ff',
          date: new Date(),
          descript: `The admin account settings were updated. View them here.`,
          icon: 'fal fa-user-cog',
          id: updateID,
          read: false,
          title: 'Account Settings Updated',
          url: `/admin/settings/account`
        })
      })
    }
  }
  function saveAuthSettings() {
    updateDB('users', myUser.userid, {
      'userinfo.email': email,
      'userinfo.password': password
    }).then(() => {
      user.updateEmail(email).then(() => {
        user.updatePassword(password).then(() => {
          setNotifs(prev => [...prev, {
            id: Date.now(),
            title: 'Account Saved',
            icon: 'fal fa-save',
            text: `Your password has ben successfully updated.`,
            time: 5000
          }])
        })
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Account Saved',
          icon: 'fal fa-save',
          text: `Your email has been successfully updated.`,
          time: 5000
        }])
      })
    })
  }

  useEffect(() => {
    setName(myUser.fullname)
    setEmail(myUser.email)
    setPhone(myUser.phone)
    setCity(myUser.city)
    setRegion(myUser.region)
    setCountry(myUser.country)
    setPassword(myUser.password)
  },[myUser])

  return (
    <div className="adminaccountsettings">
      <div className="settingspage">
        <UserProfile />
        <div className="pagecont">
          <PageTitlesRow 
            title={<><i className="far fa-user-circle"></i>Account Settings</>}
            searchPlaceholder="Find a setting..."
            setKeyword={setKeyword}
          />
          <section>
            <h4 className="settingstitle">Personal Information</h4>
            <AppInput title="Full Name" onChange={(e) => setName(e.target.value)} value={name} />
            <AppInput title="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
            <AppInput title="City" onChange={(e) => setCity(e.target.value)} value={city} />
            <RegionCountry 
              country={country}
              setCountry={setCountry}
              region={region}
              setRegion={setRegion}
              provinceChoices={provinceChoices}
              setProvinceChoices={setProvinceChoices}
            />
            <AppInput title="Chat Name" onChange={(e) => setChatName(e.target.value)} value={accountSettings.chatName} descriptText="How your name should be displayed to customers you chat with."/>
          </section>
          <div className="actionbtns">
            <AdminBtn title="Save" disabled={!!!allowAccess} solid clickEvent onClick={() => saveSettings()}/>
          </div>
          <section>
            <h4 className="settingstitle">Authentication</h4>
            <AppInput title="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label className="appinput commoninput passinput">
              <h6>Password</h6>
              <input type={showPass?"text":"password"} onChange={(e) => setPassword(e.target.value)} value={password}/>
              <i 
                className={`far ${showPass?"fa-eye-slash":"fa-eye"}`} 
                onClick={() => setShowPass(prev => !prev)}
              ></i>
            </label>
            <small style={{fontSize:12,color:'#777',gridColumn:'1/-1'}}>To update your email and password, you need to re-authenticate yourself.</small>
          </section>
          <div className="actionbtns">
            <AdminBtn title="Authenticate" disabled={!!!allowAuthUpdate || !!allowUpdate} solid clickEvent onClick={() => setShowReauth(true)}/>
            <AdminBtn title="Update" disabled={!!!allowUpdate} solid clickEvent onClick={() => saveAuthSettings()}/>
          </div>
        </div>
      </div>
      <Reauth 
        showReauth={showReauth}
        setShowReauth={setShowReauth}
        setAllowUpdate={setAllowUpdate}
      />
    </div>
  )
} 