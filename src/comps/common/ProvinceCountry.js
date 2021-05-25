import React from 'react'
import { AppSelect } from './AppInputs'

export default function ProvinceCountry(props) {

  const {} = props

  return (
    <>
      <AppSelect title="Province/State" options={[]} onChange={(e) => null} />
      <AppSelect title="Country" options={[]} onChange={(e) => null} />
    </>
  )
}