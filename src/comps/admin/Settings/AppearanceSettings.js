import React, { useContext, useEffect, useState } from 'react'
import { AppInput, AppSwitch } from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import PageTitlesRow from '../common/PageTitlesRow'
import UserProfile from './UserProfile'

export default function AppearanceSettings() {
  
  const {darkMode, setDarkMode, themeColor, setThemeColor, siteThemeColor, setSiteThemeColor} = useContext(StoreContext)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')

  function saveSettings() {
    document.documentElement.style.setProperty('--admincolor', themeColor)
    document.documentElement.style.setProperty('--color', siteThemeColor)
    document.documentElement.style.setProperty('--light', themeColor+'2b')
  }
  function resetDefaults() {
    document.documentElement.style.setProperty('--admincolor', '#0088ff')
    document.documentElement.style.setProperty('--color', '#3bc1ff')
    document.documentElement.style.setProperty('--light', '#badeff4b')
    setThemeColor('#0088ff')
    setSiteThemeColor('#3bc1ff')
    setDarkMode(false)
  }

  return (
    <div className="adminappearsettings">
      <div className="settingspage">
        <UserProfile />
        <div className="pagecont">
          <PageTitlesRow 
            title={<><i className="far fa-palette"></i>Appearance Settings</>}
            searchPlaceholder="Find a setting..."
            setKeyword={setKeyword}
          />
          <section>
            <h4 className="settingstitle">Site Theme</h4>
            <AppSwitch title="Dark Mode" onChange={(e) => setDarkMode(e.target.checked)} checked={darkMode}/>
            <AppInput title="Admin Theme Color" className="themepicker" type="color" onChange={(e) => setThemeColor(e.target.value)} value={themeColor}/>
            <AppInput title="Website Theme Color" className="themepicker" type="color" onChange={(e) => setSiteThemeColor(e.target.value)} value={siteThemeColor}/>
          </section>
          <div className="actionbtns">
            <AdminBtn title="Save" solid clickEvent onClick={() => saveSettings()}/>
            <AdminBtn title="Reset Defaults" solid clickEvent onClick={() => resetDefaults()}/>
          </div>
        </div>
      </div>
    </div>
  )
}