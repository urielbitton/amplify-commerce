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

  const [newOrder, setNewOrder] = useState(true)
  const [newCustomer, setNewCustomer] = useState(true)
  const [delivOrder, setDelivOrder] = useState(true)
  const [refundOrder, setRefundOrder] = useState(true)
  const [delayOrder, setDelayOrder] = useState(true)
  const [deletedAccount, setDeletedAccount] = useState(true)
  const [highSeller, setHighSeller] = useState(false)

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

  const notifications = [
    {name: 'New Customer', state: newOrder, setState:setNewOrder},
    {name: 'New Order', state: newCustomer, setState:setNewCustomer},
    {name: 'Delivered Order', state: delivOrder, setState:setDelivOrder},
    {name: 'Refunded Order', state: refundOrder, setState:setRefundOrder},
    {name: 'Delayed Order', state: delayOrder, setState:setDelayOrder},
    {name: 'Deleted Account', state: deletedAccount, setState:setDeletedAccount},
    {name: 'High Selling Product', state: highSeller, setState:setHighSeller}
  ]

  const notifsRows = notifications?.map(el => {
    return <div className="proditem">
      <h5>{el.name}</h5>
      <AppSwitch type="checkbox" onChange={(e) => el.setState(e.target.checked)} checked={el.state} />
    </div>
  })

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

    setNewOrder(storeSettings.notifs.newOrder)
    setNewCustomer(storeSettings.notifs.newCustomer)
    setDelivOrder(storeSettings.notifs.deliveredOrder)
    setRefundOrder(storeSettings.notifs.refundedOrder)
    setDelayOrder(storeSettings.notifs.delayedOrder)
    setDeletedAccount(storeSettings.notifs.deletedAccount)
    setHighSeller(storeSettings.notifs.highSellingProduct)
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
        <h4 className="settingstitle">Notifications</h4>
        <small>Send me in-app notifications when the following events occur:</small>
        <div className="producttable">
          <div className="header">
            <h5>Event</h5>
            <h5>Action</h5>
          </div>
          <div className="content">
            {notifsRows}
          </div>
        </div>
      </section>
      <div className="actionbtns">
        <AdminBtn title="Save" solid clickEvent onClick={() => saveSettings()}/>
      </div>
    </>
  )
}