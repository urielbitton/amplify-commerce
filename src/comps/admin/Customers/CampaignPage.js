import React from 'react'
import './styles/CampaignPage.css'

export default function CampaignPage(props) {

  const {name, description, duration, ad, customers, email, id, dateCreated, isActive} = props.el

  return (
    <div className="campaignpage">
      <div className="pagecont">
        <div className="titles">
          <i className="fad fa-mail-bulk"></i>
          <h4>{name}</h4>
        </div>
      </div>
    </div> 
  )
}