import React from 'react'
import AdminBtn from '../common/AdminBtn'
import './styles/CampaignCard.css'

export default function CampaignCard(props) {

  const {name, description, id, customers} = props.el
  const {hideBtns} = props

  return (
    <div className="campaignbox dark-bg-1">
      <div className="titles">
        <i className="fal fa-mail-bulk mainicon"></i>
        <h4>{name}</h4>
      </div>
      <small>{description?.slice(0,70)} {description?.length > 70&&"..."}</small>
      <div className="actionscont">
        <AdminBtn title="Edit" hideBtn={hideBtns} url={`/admin/customers/marketing/edit-campaign/${id}`}/>
        <AdminBtn title="View" hideBtn={hideBtns} solid url={`/admin/customers/marketing/campaign/${id}`}/>
        <small>{customers.length} customers</small>
      </div>
    </div>
  )
}