import React, { useContext, useEffect, useState } from 'react'
import { AppInput, AppSelect, AppSwitch } from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import PageTitlesRow from '../common/PageTitlesRow'
import UserProfile from './UserProfile'
import {updateDB} from '../../common/services/CrudDb'

export default function AppearanceSettings() {
  
  const {darkMode, setDarkMode, themeColor, setThemeColor, setNotifs, appearSettings} = useContext(StoreContext)
  const [keyword, setKeyword] = useState('')
  const [appTheme, setAppTheme] = useState('atomics')
  const [fontFamily, setFontFamily] = useState('poppins')
  const [pFontSize, setPFontSize] = useState(15)
  const [hFontSize, setHFontSize] = useState(24)
  const [siteGridWidth, setSieGridWidth] = useState(1320)
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')

  const fontsList = [
    {name: 'Arial'},
    {name: 'Helvetica'},
    {name: 'Montserrat '},
    {name: 'Poppins'},
    {name: 'Verdana'},
    {name: 'Tahoma'},
    {name: 'Trebuchet MS '},
    {name: 'Times New Roman'},
  ]
  const themesList = [
    {name: 'Atomics'}
  ]

  function saveSettings() {
    document.documentElement.style.setProperty('--admincolor', themeColor)
    document.documentElement.style.setProperty('--light', themeColor+'2b')
    updateDB('admin', 'appearanceSettings', {
      fontFamily,
      hFontSize,
      pFontSize,
      siteGridWidth
    }).then(() => {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: `Settings Saved`,
        icon: 'fal fa-save',
        text: `Appearance Settings have been successfully saved.`,
        time: 5000
      }])
    })
    
  }
  function resetDefaults() {
    document.documentElement.style.setProperty('--admincolor', '#0088ff')
    document.documentElement.style.setProperty('--color', '#3bc1ff')
    document.documentElement.style.setProperty('--light', '#badeff4b')
    setThemeColor('#0088ff')
    setDarkMode(false)
  }

  useEffect(() => {
    setFontFamily(appearSettings.fontFamily)
    setPFontSize(appearSettings.pFontSize)
    setHFontSize(appearSettings.hFontSize)
    setSieGridWidth(appearSettings.siteGridWidth)
  },[])

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
            <AppSelect title="App Theme" options={themesList} value={appTheme}/>
            <AppSwitch title="Dark Mode" onChange={(e) => setDarkMode(e.target.checked)} checked={darkMode}/>
            <AppInput title="Admin Theme Color" className="themepicker" type="color" onChange={(e) => setThemeColor(e.target.value)} value={themeColor}/>
            <AppInput title="Website Theme Color" className="themepicker" type="color" value="#3bc1ff"/>
          </section>
          <section>
            <h4 className="settingstitle">Fonts Styling</h4> 
            <AppSelect title="Font Family" options={fontsList} onChange={(e) => setFontFamily(e.target.value)} value={fontFamily}/>
            <AppInput title="Paragraph Text Font Size (px)" type="number"  onChange={(e) => setPFontSize(e.target.value)} value={pFontSize}/>
            <AppInput title="Title Text Font Size (px)" type="number"  onChange={(e) => setHFontSize(e.target.value)} value={hFontSize}/>
          </section>
          <section>
            <h4 className="settingstitle">Site Styling</h4>
            <AppInput title="Website grid width (px)" onChange={(e) => setSieGridWidth(e.target.value)} value={siteGridWidth} descriptText="The width of the grid for the website's content"/>
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