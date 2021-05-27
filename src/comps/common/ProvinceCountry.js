import React, { useContext, useEffect } from 'react'
import { AppSelect } from './AppInputs'
import { StoreContext } from './StoreContext'
import {countries} from './Lists'

export default function ProvinceCountry(props) {

  const {setState} = props
  const {provinceChoices, selectedCountry, setSelectedCountry, setSelectedProvince, userLocation, 
    selectedProvince, setLocateUser} = useContext(StoreContext)
 
  const countriesOpts = countries?.map(({name,code}) => {
    return {name:name, value:code, selected: userLocation?.countryCode===code} 
  })
  const provincesOpts = provinceChoices?.map(({name,isoCode}) => {
    return {name:name, value:isoCode,selected:false} 
  })

  useEffect(() => {
    setSelectedCountry(selectedCountry || userLocation.countryCode)
    return() => setSelectedCountry('')
  },[userLocation,provinceChoices,selectedCountry])
  useEffect(() => {
    setState(prev => ({...prev,provstate:''}))
    setSelectedProvince('')
  },[selectedCountry])
  useEffect(() => {
    setLocateUser(true)
    setState({
      country: userLocation?.country 
    })
    return () => {
      setLocateUser(false)
    }
  }, [userLocation]) 
  console.log(selectedCountry)

  return ( 
    <>
      <AppSelect 
        title="Country" 
        options={countriesOpts} 
        onChange={(e) => {
          setSelectedCountry(e.target.value)
          setState(prev => ({...prev,country:countries.find(x => x.code===e.target.value || x.name===e.target.value).name}))}
        } 
        namebased
      />
      {
        provinceChoices.length?
        <AppSelect 
          title="Province/State" 
          options={[{name:'Select a Province/State',value:'',disabled:true},...provincesOpts]} 
          value={selectedProvince}
          defaultValue={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value)
            setState(prev => ({...prev,provstate:provinceChoices.find(x => x.isoCode===e.target.value).name}))}
          }
          namebased
        />:""
      }
    </>
  )
}