import React from 'react'
import { AppInput } from '../../common/AppInputs'
import ProvinceCountry from '../../common/ProvinceCountry'

export default function BillingShippingFields(props) {

  const {setBillShipState} = props

  const billingarr = [
    { title: "First Name *", name: "fname" },
    { title: "Last Name *", name: "lname" },
    { title: "Email Address *", name: "email" },
    { title: "Phone Number *", name: "phone" },
    { title: "Street Address *", name: "address" },
    { title: "Apartment/Unit", name: "aptunit" },
    { title: "City *", name: "city" },
    { title: "Postal Code/ZIP *", name: "postcode" },
    { title: "Company Name", name: "company" },
  ];

  const billingInputs = billingarr.map(({ title, name }) => {
    return (
      <AppInput
        title={title}
        name={name}
        onChange={(e) => handleChange(e)}
      />
    );
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setBillShipState((prev) => ({
      ...prev,
      [name]: value
    }));
  } 

  return (
    <>
      {billingInputs.slice(0, 6)}
      <ProvinceCountry setState={setBillShipState} />
      {billingInputs.slice(6)}
    </>
  )
}