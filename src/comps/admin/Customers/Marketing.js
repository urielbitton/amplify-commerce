import React from 'react'
import PageTitlesRow from '../common/PageTitlesRow'

export default function Marketing() {

  return (
    <div className="marketingpage">
      <div className="pagecont">
        <PageTitlesRow 
          title="Marketing" 
          searchPlaceholder="Find a campaign" 
          btnTitle="New Campaign" 
          btnUrl="/admin/customers/marketing/add-campaign"
        />
      </div>
    </div>
  )
}