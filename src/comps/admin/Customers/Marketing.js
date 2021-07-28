import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import PageStarter from '../common/PageStarter'
import PageTitlesRow from '../common/PageTitlesRow'
import CampaignCard from './CampaignCard'
import './styles/Marketing.css'

export default function Marketing() {

  const {allCampaigns} = useContext(StoreContext)

  const campaignBox = allCampaigns?.map(el => {
    return <CampaignCard el={el} />
  })

  return (
    <div className="marketingpage">
      <div className="pagecont">
        <PageTitlesRow 
          title="Marketing" 
          searchPlaceholder="Find a campaign" 
          btnTitle="New Campaign" 
          btnUrl="/admin/customers/marketing/create-campaign"
        />
        <PageStarter 
          subtitle="You have no campaigns yet."
          title="Create a Campaign"
          img="https://i.imgur.com/hL04ubQ.png"
          btnText="Start Now"
          btnUrl=""
          hide={allCampaigns.length}
        />
        <div className="campaignsgrid">
          {campaignBox}
        </div>
      </div>
    </div>
  )
}