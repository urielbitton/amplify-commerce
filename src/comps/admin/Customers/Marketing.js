import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import PageStarter from '../common/PageStarter'
import PageTitlesRow from '../common/PageTitlesRow'
import './styles/Marketing.css'

export default function Marketing() {

  const {allCampaigns} = useContext(StoreContext)

  const campaignBox = allCampaigns?.map(el => {
    return <div className="campaignbox">
      <div className="titles">
        <i className="fal fa-mail-bulk mainicon"></i>
        <h4>{el.name}</h4>
      </div>
      <small>{el.description.slice(0,70)}...</small>
      <div className="actionscont">
        <AdminBtn title="Edit" url={`/admin/customers/marketing/edit-campaign/${el.id}`}/>
        <AdminBtn title="View" solid url={`/admin/customers/marketing/campaign/${el.id}`}/>
      </div>
    </div>
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