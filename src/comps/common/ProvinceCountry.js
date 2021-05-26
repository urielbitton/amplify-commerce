import React, { useContext, useEffect } from 'react'
import { AppSelect } from './AppInputs'
import { StoreContext } from './StoreContext'
import {countries} from './Lists'

export default function ProvinceCountry(props) {

  const {setBillingState} = props
  const {provinceChoices, selectedCountry, setSelectedCountry, setSelectedProvince, userLocation} = useContext(StoreContext)
 
  const countriesOpts = countries?.map(({name,code}) => {
    return {name:name, value:code, selected: userLocation.countryCode===code} 
  })
  const provincesOpts = provinceChoices?.map(({name,isoCode}) => {
    return {name:name, value:isoCode, selected: userLocation.region===name}
  })

  useEffect(() => {
    setSelectedCountry(selectedCountry || userLocation.countryCode)
    setSelectedProvince(provinceChoices?.find(x => x.name===userLocation.region)?.isoCode)
  },[userLocation,provinceChoices,selectedCountry])

  return ( 
    <>
      <AppSelect 
        title="Country" 
        options={countriesOpts} 
        onChange={(e) => {setSelectedCountry(e.target.value);setBillingState(prev => ({...prev,country:e.target.value}))}} 
        namebased
      />
      <AppSelect 
        title="Province/State" 
        options={[{name:'Select a Province/State',disabled:true,selected:true},...provincesOpts]} 
        onChange={(e) => {setSelectedProvince(e.target.value);setBillingState(prev => ({...prev,provstate:e.target.value}))}}
        namebased
      />
    </>
  )
}