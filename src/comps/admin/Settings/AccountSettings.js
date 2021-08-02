import React, { useState } from 'react'
import UserProfile from './UserProfile'
import PageTitlesRow from '../common/PageTitlesRow'
import { AppInput } from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import RegionCountry from '../../common/RegionCountry'

export default function AccountSettings() {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState('')
  const [keyword, setKeyword] = useState('')
  const [provinceChoices, setProvinceChoices] = useState([])
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')

  return (
    <div className="adminaccountsettings">
      <div className="settingspage">
        <UserProfile />
        <div className="pagecont">
          <PageTitlesRow 
            title="Account Settings"
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
          </section>
          <div className="actionbtns">
            <AdminBtn title="Save" solid/>
          </div>
        </div>
      </div>
    </div>
  )
} 