import React, { useState } from 'react'
import PageTitlesRow from '../common/PageTitlesRow'

export default function Customers() {

  const [keyword, setKeyword] = useState('')

  return (
    <div className="customerspage">
      <div className="pagecont">
        <PageTitlesRow 
          title="Customers"
          btnTitle="New Customer"
          btnUrl="/admin/customers/add-customer"
          searchPlaceholder="Find a Customer"
          setKeyword={setKeyword}
        />
      </div>
    </div>
  )
}