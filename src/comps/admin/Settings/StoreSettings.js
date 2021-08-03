import React, { useContext, useEffect, useState } from 'react'
import PageTitlesRow from '../common/PageTitlesRow'
import UserProfile from './UserProfile'
import './styles/Store.css'
import { AppInput, AppSelect, AppSwitch } from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import TabsBar from '../common/TabsBar'

export default function StoreSettings() {

  const {storeSettings, percentFormat} = useContext(StoreContext)
  const [taxRate, setTaxRate] = useState(0)
  const [enableTaxes, setEnableTaxes] = useState(true)
  const [currency, setCurrency] = useState('')
  const [numDecimals, setNumDecimals] = useState(2)
  const [tabPos, setTabPos] = useState(0)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  
  const tabsTitles = ['General', 'Products', 'Payments', 'Emails', 'Advanced']

  const currencies = [
    {name: 'Choose a Currency', value: '', symbol: ''},
    {name: 'Canadian Dollar', value: 'cad', symbol: '&dollar;'},
    {name: 'US Dollar', value: 'usd', symbol: '&dollar;'},
    {name: 'Euro', value: 'eur', symbol: '&euro;'},
    {name: 'Japanese Yen', value: 'jpy', symbol: '&yen;'},
    {name: 'British Pound', value: 'gbp', symbol: '&pound;'},
    {name: 'Swiss Franc', value: 'eur', symbol: '&curren;'}
  ]

  useEffect(() => {
    setTaxRate(storeSettings.adminTaxRate)
    setEnableTaxes(storeSettings.enableTaxes)
    setCurrency(storeSettings.currency.value)
    setNumDecimals(storeSettings.numDecimals)
  },[storeSettings])

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
          <section>
            <h4 className="settingstitle">Taxes & Formats</h4>
            <AppInput title={`Tax Rate (${percentFormat.format(taxRate)})`} type="number" onChange={(e) => setTaxRate(e.target.value)} value={taxRate} descript descriptText="Set the global tax rate for your store"/>
            <AppSwitch title={`Enable Taxes (${currency.symbol})`} onChange={(e) => setEnableTaxes(e.target.checked)} checked={enableTaxes} />
            <AppSelect title="Currency" options={currencies} onChange={(e) => setCurrency(e.target.value)} value={currency} namebased/>
            <AppInput title="Number of Decimals" onChange={(e) => setNumDecimals(e.target.value)} value={numDecimals} />
          </section>
          <section>
            <h4 className="settingstitle">Store Address</h4>
          </section>
          <section>
            <h4 className="settingstitle">Software</h4>
            <div className="infocont">
              <div><p>Theme</p><span>Amplify Commerce &trade;</span></div>
              <div><p>Version</p><span>2.3.0</span></div>
              <div><p>Author Site</p><span>Atomics Digital</span></div>
              <div><p>Author URL</p><span><a href="https://atomicsdigital.com" target="_blank" rel="noreferrer">www.atomicsdigital.com</a></span></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}