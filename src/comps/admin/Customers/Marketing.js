import React from 'react'
import PageStarter from '../common/PageStarter'
import PageTitlesRow from '../common/PageTitlesRow'
import './styles/Marketing.css'

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
        <PageStarter 
          subtitle="You have no campaigns yet."
          title="Create a Campaign"
          img="https://i.imgur.com/hL04ubQ.png"
          btnText="Start Now"
          btnUrl=""
        />
      </div>
    </div>
  )
}