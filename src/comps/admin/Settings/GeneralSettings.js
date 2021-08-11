import React, { useContext, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import {AppInput, AppSelect} from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import PageTitlesRow from '../common/PageTitlesRow'
import AdminBtn from '../common/AdminBtn'
import { setDB, updateDB } from '../../common/services/CrudDb'
import { db } from '../../common/Fire'

export default function GeneralSettings() {
  
  const {generalSettings, setNotifs} = useContext(StoreContext)
  const [siteTitle, setSiteTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [siteUrl, setSiteUrl] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [newUserRole, setNewUserRole] = useState('')
  const [siteLang, setSiteLang] = useState('')
  const [dateFormat, setDateFormat] = useState('')
  const [timeFormat, setTimeFormat] = useState('')
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const updateID = db.collection('updates').doc().id

  const userRoles = [
    {name: 'Choose a Role', value: ''},
    {name: 'Customer', value: 'customer'},
    {name: 'Seller', value: 'seller'},
    {name: 'Editor', value: 'editor'},
    {name: 'Admin', value: 'admin'},
  ]
  const languages = [
    {name: 'Choose a Language', value: ''},
    {name: 'English (Canada)', value: 'english'},
    {name: 'Francais (Canada)', value: 'french'}
  ]

  function saveSettings() {
    updateDB(
      'admin', 
      'generalSettings', 
      {siteTitle, tagline, siteUrl, adminEmail, newUserRole, siteLang, dateFormat, timeFormat}
    ).then(() => {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: `General Settings Saved`,
        icon: 'fal fa-save',
        text: `Your general settings have been successfully saved.`,
        time: 5000
      }])
      setDB('updates', updateID, {
        color: '#0088ff',
        date: new Date(),
        descript: `The admin general settings were updated. View them here.`,
        icon: 'fal fa-user-cog',
        id: updateID,
        read: false,
        title: 'General Settings Updated',
        url: `/admin/settings/general`
      })
    })
  }

  useEffect(() => {
    setSiteTitle(generalSettings.siteTitle)
    setTagline(generalSettings.tagline)
    setSiteUrl(generalSettings.siteUrl)
    setAdminEmail(generalSettings.adminEmail)
    setNewUserRole(generalSettings.newUserRole)
    setSiteLang(generalSettings.siteLang)
    setDateFormat(generalSettings.dateFormat)
    setTimeFormat(generalSettings.timeFormat)
  },[generalSettings])

  return (
    <div className="admingeneralsettings">
      <div className="settingspage">
        <UserProfile />
        <div className="pagecont">
          <PageTitlesRow 
            title={<><i className="far fa-sliders-h"></i>General Settings</>}
            searchPlaceholder="Find a setting..."
            setKeyword={setKeyword}
          />
          <section>
            <h4 className="settingstitle">Site</h4>
            <AppInput title="Site Title" onChange={(e) => setSiteTitle(e.target.value)} value={siteTitle} />
            <AppInput title="Tagline" onChange={(e) => setTagline(e.target.value)} value={tagline} descript descriptText="Your site tagline that appears on browser tabs & searches."/>
            <AppInput title="Site URL" onChange={(e) => setSiteUrl(e.target.value)} value={siteUrl} />
            <AppInput title="Admin Email Address" onChange={(e) => setAdminEmail(e.target.value)} value={adminEmail} descript descriptText="Email we use for security and administrator purposes"/>
            <AppSelect title="New User Default Role" onChange={(e) => setNewUserRole(e.target.value)} options={userRoles} value={newUserRole} namebased/>
          </section>
          <section>
            <h4 className="settingstitle">Date & Languages</h4>
            <AppSelect title="Site Language" options={languages} onChange={(e) => setSiteLang(e.target.value)} value={siteLang} namebased/>
            <AppSelect title="Date Format" options={[{name:'Jan 01 1970'}]} onChange={(e) => setDateFormat(e.target.value)} value={dateFormat} namebased/>
            <AppSelect title="Time Format" options={[{name:'12:00:00'}]} onChange={(e) => setTimeFormat(e.target.value)} value={timeFormat} namebased />
          </section>
          <div className="actionbtns">
            <AdminBtn title="Save" solid clickEvent onClick={() => saveSettings()}/>
          </div>
        </div>
      </div>
    </div>
  )
}