import React from 'react'
import AppAccordion from '../../site/common/AppAccordion'
import './styles/AdminSupport.css'
import {ordersFaq, productsFaq} from'./arrays/arrays'

export default function AdminSupport() {

  const ordersRow = ordersFaq?.map(({title,text,icon}) => {
    return <AppAccordion title={title} subtitle={icon} children={<p>{text}</p>} />
  })
  const productsRow = productsFaq?.map(({title,text,icon}) => {
    return <AppAccordion title={title} subtitle={icon} children={<p>{text}</p>} />
  })

  return (
    <div className="adminsupportpage">
      <div className="pagecont">
        <div className="titlesrow">
          <h4>Admin Support</h4>
        </div>
        <div className="faqcont">
          <div>
            <h6>Managing Orders</h6>
            {ordersRow}
          </div>
          <div>
            <h6>Managing Products</h6>
            {productsRow}
          </div>
        </div>
      </div>
    </div>
  )
}