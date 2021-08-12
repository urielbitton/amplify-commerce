import React, { useContext, useEffect } from 'react'
import { AppInput } from '../../common/AppInputs'
import RegionCountry from '../../common/RegionCountry'
import { StoreContext } from '../../common/StoreContext'

export default function BillingShippingFields(props) {

  const {editOrdMode} = useContext(StoreContext)
  const {setBillShipState, formDetails, region, setRegion, country, setCountry,
    provinceChoices, setProvinceChoices} = props

  const billingarr = [ 
    { title: "First Name *", name: "fname", editVal: formDetails?.fname},
    { title: "Last Name *", name: "lname", editVal: formDetails?.lname},
    { title: "Email Address *", name: "email", editVal: formDetails?.email},
    { title: "Phone Number *", name: "phone", editVal: formDetails?.phone},
    { title: "Street Address *", name: "address", editVal: formDetails?.address},
    { title: "Apartment/Unit", name: "aptunit", editVal: formDetails?.aptunit},
    { title: "City *", name: "city", editVal: formDetails?.city},
    { title: "Postal Code/ZIP *", name: "postcode", editVal: formDetails?.postcode},
    { title: "Company Name", name: "company", editVal: formDetails?.company},
  ];

  const billingInputs = billingarr.map(({title, name, editVal}) => {
    return (
      <AppInput
        title={title}
        name={name}
        onChange={(e) => handleChange(e)}
        value={editOrdMode?editVal:undefined}
      />
    );
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setBillShipState((prev) => ({
      ...prev,
      [name]: value,
    }));
  } 

  useEffect(() => {
    setBillShipState(prev => ({
      ...prev,
      country: country
    }))
  },[country])
  useEffect(() => {
    setBillShipState(prev => ({
      ...prev,
      provState: region
    }))
  },[region])

  return (
    <>
      {billingInputs.slice(0, 6)}
      <RegionCountry 
        country={country} 
        region={region} 
        setCountry={setCountry} 
        setRegion={setRegion} 
        provinceChoices={provinceChoices} 
        setProvinceChoices={setProvinceChoices} 
      />
      {billingInputs.slice(6)}
    </>
  )
}