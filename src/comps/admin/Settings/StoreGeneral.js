import React, { useContext, useEffect, useState } from 'react'
import { AppInput, AppSelect, AppSwitch } from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import RegionCountry from '../../common/RegionCountry'
import AdminBtn from '../common/AdminBtn'

export default function StoreGeneral() {

  const {storeSettings, percentFormat} = useContext(StoreContext)
  const [taxRate, setTaxRate] = useState(0)
  const [enableTaxes, setEnableTaxes] = useState(true)
  const [calcTax, setCalcTax] = useState('')
  const [currency, setCurrency] = useState('')
  const [numDecimals, setNumDecimals] = useState(2)
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [provinceChoices, setProvinceChoices] = useState([])

  const currencies = [
    {name: 'Choose a Currency', value: '', symbol: ''},
    {name: 'Canadian Dollar', value: 'cad', symbol: '&dollar;'},
    {name: 'US Dollar', value: 'usd', symbol: '&dollar;'},
    {name: 'Euro', value: 'eur', symbol: '&euro;'},
    {name: 'Japanese Yen', value: 'jpy', symbol: '&yen;'},
    {name: 'British Pound', value: 'gbp', symbol: '&pound;'},
    {name: 'Swiss Franc', value: 'eur', symbol: '&curren;'}
  ]
  const calcBase = [
    {name: 'Customer shipping address', value: 'shipaddress'},
    {name: 'Customer billing address', value: 'billaddress'},
    {name: 'Store base address', value: 'storeaddress'},
  ]

  function saveSettings() {

  }

  useEffect(() => {
    setTaxRate(storeSettings.adminTaxRate)
    setEnableTaxes(storeSettings.enableTaxes)
    setCurrency(storeSettings.currency.value)
    setNumDecimals(storeSettings.numDecimals)
    setLine1(storeSettings.address.line1)
    setLine2(storeSettings.address.line2)
    setCity(storeSettings.address.city)
    setRegion(storeSettings.address.region)
    setCountry(storeSettings.address.country)
    setPhone(storeSettings.address.phone)
  },[storeSettings])

  return (
    <>
      <section>
        <h4 className="settingstitle">Taxes & Formats</h4>
        <AppInput title={`Tax Rate (${percentFormat.format(taxRate)})`} type="number" onChange={(e) => setTaxRate(e.target.value)} value={taxRate} descript descriptText="Set the global tax rate for your store"/>
        <AppSwitch title="Enable Taxes" onChange={(e) => setEnableTaxes(e.target.checked)} checked={enableTaxes} />
        <AppSelect title="Calculate tax rate based on" options={calcBase} onChange={(e) => setCalcTax(e.target.value)} value={calcTax}/>
        <AppSelect title="Currency" options={currencies} onChange={(e) => setCurrency(e.target.value)} value={currency} namebased/>
        <AppInput title="Number of Decimals" onChange={(e) => setNumDecimals(e.target.value)} value={numDecimals} />
      </section>
      <section>
        <h4 className="settingstitle">Store Address</h4>
        <AppInput title="Address Line 1" onChange={(e) => setLine1(e.target.value)} value={line1}/>
        <AppInput title="Address Line 2" onChange={(e) => setLine2(e.target.value)} value={line2}/>
        <AppInput title="City" onChange={(e) => setCity(e.target.value)} value={city}/>
        <RegionCountry 
          region={region}
          setRegion={setRegion}
          country={country}
          setCountry={setCountry}
          provinceChoices={provinceChoices}
          setProvinceChoices={setProvinceChoices}
        />
        <AppInput title="Phone Number" onChange={(e) => setPhone(e.target.value)} value={phone} />
        
      </section>
      <section>
        <h4 className="settingstitle">Software</h4>
        <div className="infocont">
          <div><p>Theme</p><span>Amplify Commerce &trade;</span></div>
          <div><p>Version</p><span>2.3.0</span></div>
          <div><p>Author Site</p><span>Atomics Digital</span></div>
          <div><p>Author URL</p><span><a href="https://atomicsdigital.com" target="_blank" rel="noreferrer">www.atomicsdigital.com</a></span></div>
          <div><p>Last Update</p><span>August 05 2021</span></div>
        </div>
      </section>
      <div className="actionbtns">
        <AdminBtn title="Save" solid clickEvent onClick={() => saveSettings()}/>
      </div>
    </>
  )
}