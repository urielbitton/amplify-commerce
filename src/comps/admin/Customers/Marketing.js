import React, { useContext, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import PageStarter from '../common/PageStarter'
import PageTitlesRow from '../common/PageTitlesRow'
import CampaignCard from './CampaignCard'
import './styles/Marketing.css'

export default function Marketing() {

  const {allCampaigns} = useContext(StoreContext)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allCampaignsFilter = allCampaigns?.filter(x => pattern.test(x.name) || pattern.test(x.duration))

  const campaignBox = allCampaignsFilter?.map(el => {
    return <CampaignCard el={el} />
  })

  return (
    <div className="marketingpage">
      <div className="pagecont">
        <PageTitlesRow 
          title="Campaigns" 
          searchPlaceholder="Find a campaign" 
          btnTitle="New Campaign" 
          btnUrl="/admin/customers/marketing/create-campaign"
          setKeyword={setKeyword}
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