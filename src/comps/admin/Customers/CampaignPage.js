import React from 'react'
import AdminBtn from '../common/AdminBtn'
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
        <div className="info">
          <div>
            <h6>Campaign Description</h6>
            <p>{description}</p>
          </div>
          <div className="row">
            <h6>Campaign Duration</h6>
            <p>{duration} days</p>
          </div>
          <div className="row">
            <h6>Customers</h6>
            <p>{customers.length} Customers</p>
          </div>
          <div className="row">
            <h6>Status</h6>
            <span>{isActive?"Active":"Not Active"}</span>
          </div>
        </div>
        <div className="adcont">
          <h6 className="smalltitle">Ad Banner</h6>
          <div className="adpreviewcont" style={{backgroundImage: `url(${ad.img})`}}>
            <h1>{ad.title}</h1>
            <h4>{ad.subtitle}</h4>
            <p>{ad.descript}</p>
            <AdminBtn title="Learn More" solid/>
          </div>
        </div>
        <h6 className="smalltitle">Email Template</h6>
        <div className="emailcont">
          <h6>Subject</h6>
          <p>{email.subject}</p>
          <br/>
          <h6>Body</h6>
          <p className="emailbody">{email.body.replaceAll('<br/>','\n')}</p>
        </div>
        <div className="actionbtns">
          <AdminBtn title="Launch Now" solid/>
        </div>
      </div>
    </div> 
  )
}