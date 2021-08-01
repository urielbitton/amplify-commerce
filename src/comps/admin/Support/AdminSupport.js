import React from 'react'
import AppAccordion from '../../site/common/AppAccordion'
import './styles/AdminSupport.css'
import {ordersFaq, productsFaq, couponsFaq, shippingFaq, accSettingssFaq, storeSettingssFaq,
  genSettingssFaq} from'./arrays/arrays'
import PageStarter from '../common/PageStarter'

export default function AdminSupport() {

  const faqsArr = [
    {name: 'Managing Orders', icon: 'far fa-shopping-bag', faqs: ordersFaq},
    {name: 'Managing Products', icon: 'far fa-tshirt', faqs: productsFaq},
    {name: 'Managing Coupons', icon: 'far fa-money-bill', faqs: couponsFaq},
    {name: 'Managing Shipping', icon: 'far fa-truck', faqs: shippingFaq},
    {name: 'Account Settings', icon: 'far fa-user-circle', faqs: accSettingssFaq},
    {name: 'Store Settings', icon: 'far fa-store-alt', faqs: storeSettingssFaq},
    {name: 'General Settings', icon: 'far fa-sliders-h', faqs: genSettingssFaq}
  ]

  const faqsArrRow = faqsArr?.map(({name,icon,faqs}) => {
    return <div>
      <h6><i className={icon}></i>{name}</h6>
      {
        faqs?.map(({title,text}) => {
          return <AppAccordion title={title} subtitle={<i className={icon}></i>} children={<p>{text}</p>} />
        })
      }
    </div>
  })
  

  return (
    <div className="adminsupportpage">
      <div className="pagecont">
        <div className="titlesrow">
          <h4>Admin Support</h4>
        </div>
        <p>
          Find support and help on common tasks in managing your online store. <br/>Scroll to the bottom of this page 
          to contact the sitemaster for other issues.
        </p>
        <div className="faqcont">
          {faqsArrRow}
        </div>
        <PageStarter 
          subtitle="Still didn't find a solution to your problem?"
          title="Contact Sitemaster"
          img="https://i.imgur.com/SlQ1WqY.png"
        />
        <div className="contactlinkcont">
          <a href="mailto:info@atomicsdigital.com" className="contactlink">Contact Sitemaster</a>
        </div>
      </div>
    </div>
  )
}