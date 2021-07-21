import React, { useContext, useEffect } from 'react'
import { AppSelect } from './AppInputs'
import { countries } from './Lists'
import { convertCountryCode } from './UtilityFuncs'
import csc from 'country-state-city'
import {StoreContext} from './StoreContext'

export default function RegionCountry(props) {

  const {setLocateUser, locateUser, userLocation} = useContext(StoreContext)
  const {country, setCountry, region, setRegion, provinceChoices, setProvinceChoices} = props

  useEffect(() => {
    setLocateUser(true)
  },[])
  useEffect(() => { 
    setProvinceChoices(csc.getStatesOfCountry(convertCountryCode(country)))
  },[country]) 

  useEffect(() => {
    setCountry(userLocation.country??'')
    setRegion(userLocation.region??'')
  },[userLocation, locateUser])

  return (
    <>
      <AppSelect 
        title="Country" 
        options={[{name:'Choose a Country',value:''},...countries]} 
        onChange={(e) => setCountry(e.target.value)} 
        value={country} 
        namebased
      />
      <AppSelect 
        title="Region" 
        options={[{name:'Choose a Region',value:''},...provinceChoices]} 
        onChange={(e) => setRegion(e.target.value)} 
        value={region} 
        namebased
      />
    </>
  )
}