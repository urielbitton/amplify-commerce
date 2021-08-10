import React, { useEffect, useState } from 'react'
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
import { useHistory, useLocation } from 'react-router-dom'

export default function StoreSettings() {

  const [tabPos, setTabPos] = useState(0)

  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const location = useLocation()
  const history = useHistory()
  
  const tabsTitles = [
    {name: 'General', url: '/admin/settings/store?general'},
    {name: 'Products', url: '/admin/settings/store?products'},
    {name: 'Payments', url: '/admin/settings/store?payments'},
    {name: 'Accounts & Users', url: '/admin/settings/store?accounts'},
    {name: 'Emails', url: '/admin/settings/store?emails'},
    {name: 'Advanced', url: '/admin/settings/store?advanced'},
  ]

  const tabsheadrow = tabsTitles?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => {setTabPos(i);history.push(el.url)}}
    >{el.name}<hr/></h5>
  })

  useEffect(() => {
    switch(location.search) {
      case '?products': setTabPos(1); break
      case '?payments': setTabPos(2); break
      case '?accounts': setTabPos(3); break
      case '?emails': setTabPos(4); break
      case '?advanced': setTabPos(5); break
      default: setTabPos(0) 
    }
  },[])

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
          <div className="tabsbar">
            <div className="tabstitles"> 
              {tabsheadrow} 
            </div>
            <hr className="tabline"/>
          </div>

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