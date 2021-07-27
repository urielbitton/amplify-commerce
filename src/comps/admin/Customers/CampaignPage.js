import React from 'react'

export default function CampaignPage(props) {

  const {name, description, duration, ad, customers, email, featuredProjects, id, dateCreated} = props

  return (
    <div className="campaignpage">
      <div className="pagecont">
        <div className="titles">
          <i className="fal fa-mail-bulk"></i>
          <h4>{name}</h4>
        </div>
      </div>
    </div> 
  )
}