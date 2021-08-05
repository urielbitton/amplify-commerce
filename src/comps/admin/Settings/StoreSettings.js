import React, { useState } from 'react'
import PageTitlesRow from '../common/PageTitlesRow'
import UserProfile from './UserProfile'
import './styles/StoreSettings.css'
import TabsBar from '../common/TabsBar'
import StoreGeneral from './StoreGeneral'
import StoreProducts from './StoreProducts'
import StorePayments from './StorePayments'
import StoreAccounts from './StoreAccounts'
import StoreEmails from './StoreEmails'
import StoreAdvanced from './StoreAdvanced'

export default function StoreSettings() {

  const [tabPos, setTabPos] = useState(0)

  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  
  const tabsTitles = ['General', 'Products', 'Payments', 'Accounts & Users', 'Emails', 'Advanced']

  return (
    <div className="storesettingspage">
      <div className="settingspage">
        <UserProfile />
        <div className="pagecont">
          <PageTitlesRow 
            title={<><i className="far fa-store-alt"></i>Store Settings</>}
            searchPlaceholder="Find a setting..."
            setKeyword={setKeyword}
          />
          <TabsBar tabsTitles={tabsTitles} tabPos={tabPos} setTabPos={setTabPos}/>

          <div className={`tabsection ${tabPos===0?"show":""}`}>
            <StoreGeneral />
          </div>
          <div className={`tabsection ${tabPos===1?"show":""}`}>
            <StoreProducts />
          </div>
          <div className={`tabsection ${tabPos===2?"show":""}`}>
            <StorePayments />
          </div>
          <div className={`tabsection ${tabPos===3?"show":""}`}>
            <StoreAccounts />
          </div>
          <div className={`tabsection ${tabPos===4?"show":""}`}>
            <StoreEmails />
          </div>
          <div className={`tabsection ${tabPos===5?"show":""}`}>
            <StoreAdvanced />
          </div>
        </div>
      </div>
    </div>
  )
}