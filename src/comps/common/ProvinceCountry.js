import React, { useContext, useEffect, useState } from 'react'
import { AppSelect } from './AppInputs'
import { StoreContext } from './StoreContext'
import {countries} from './Lists'

export default function ProvinceCountry(props) {

  const {setBillingState} = props
  const {provinceChoices, selectedCountry, setSelectedCountry, setSelectedProvince, userLocation, 
    selectedProvince, setTaxRate} = useContext(StoreContext)
 
  const countriesOpts = countries?.map(({name,code}) => {
    return {name:name, value:code, selected: userLocation.countryCode===code} 
  })
  const provincesOpts = provinceChoices?.map(({name,isoCode}) => {
    return {name:name, value:isoCode,selected:false} 
  })

  useEffect(() => {
    setSelectedCountry(selectedCountry || userLocation.countryCode)
    //setSelectedProvince(provinceChoices?.find(x => x.name===userLocation.region)?.isoCode)
  },[userLocation,provinceChoices,selectedCountry])
  useEffect(() => {
    setBillingState(prev => ({...prev,provstate:''}))
    setSelectedProvince('')
  },[selectedCountry])

  return ( 
    <>
      <AppSelect 
        title="Country" 
        options={countriesOpts} 
        onChange={(e) => {
          setSelectedCountry(e.target.value)
          setBillingState(prev => ({...prev,country:countries.find(x => x.code===e.target.value || x.name===e.target.value).name}))}
        } 
        namebased
      />
      <AppSelect 
        title="Province/State" 
        options={[{name:'Select a Province/State',value:'',disabled:true},...provincesOpts]} 
        value={selectedProvince}
        defaultValue={selectedProvince}
        onChange={(e) => {
          setSelectedProvince(e.target.value)
          setBillingState(prev => ({...prev,provstate:provinceChoices.find(x => x.isoCode===e.target.value).name}))}
        }
        namebased
      />
    </>
  )
}