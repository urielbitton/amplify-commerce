import React, { useContext, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import PageTitlesRow from '../common/PageTitlesRow'
import { AppInput } from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import RegionCountry from '../../common/RegionCountry'
import { StoreContext } from '../../common/StoreContext'
import { db } from '../../common/Fire'

export default function AccountSettings() {
  
  const {myUser, setNotifs} = useContext(StoreContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [provinceChoices, setProvinceChoices] = useState([])
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allowAccess = (myUser.fullname !== name || myUser.phone !== phone || myUser.city !== city
    || myUser.provstate !== region || myUser.country !== country) && (name.length && phone.length && city.length
    && region.length && country.length) 

  function saveSettings() {
    if(!!allowAccess) {
      db.collection('users').doc(myUser.userid).update({
        'userinfo.fullname': name,
        'userinfo.phone': phone,
        'userinfo.city': city,
        'userinfo.region': region,
        'userinfo.country': country,
      }).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Settings Saved',
          icon: 'fal fa-save',
          text: `Your account settings have been successfully saved.`,
          time: 5000
        }])
      })
    }
  }

  useEffect(() => {
    setName(myUser.fullname)
    setEmail(myUser.email)
    setPhone(myUser.phone)
    setCity(myUser.city)
    setRegion(myUser.provstate)
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
            <AppInput title="Email" disabled onChange={(e) => setEmail(e.target.value)} value={email} />
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
            <label className="appinput commoninput passinput">
              <h6>Password</h6>
              <input type={showPass?"text":"password"} disabled value={password}/>
              <i 
                className={`far ${showPass?"fa-eye-slash":"fa-eye"}`} 
                onClick={() => setShowPass(prev => !prev)}
              ></i>
            </label>
          </section>
          <div className="actionbtns">
            <AdminBtn title="Save" disabled={!!!allowAccess} solid clickEvent onClick={() => saveSettings()}/>
          </div>
        </div>
      </div>
    </div>
  )
} 