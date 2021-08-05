import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../common/StoreContext'
import {AppSwitch} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'

export default function StoreEmails() {

  const {generalSettings, storeSettings} = useContext(StoreContext)
  const [newOrder, setNewOrder] = useState(true)
  const [newCustomer, setNewCustomer] = useState(true)
  const [delivOrder, setDelivOrder] = useState(true)
  const [refundOrder, setRefundOrder] = useState(false)
  const [delayOrder, setDelayOrder] = useState(false)
  const [newCustChat, setNewCustChat] = useState(false)
  const [deletedAccount, setDeletedAccount] = useState(false)

  const emailNotifs = [
    {name: 'New Customer', recipient: generalSettings.adminEmail, state: newOrder, setState:setNewOrder},
    {name: 'New Order', recipient: generalSettings.adminEmail, state: newCustomer, setState:setNewCustomer},
    {name: 'Delivered Order', recipient: generalSettings.adminEmail, state: delivOrder, setState:setDelivOrder},
    {name: 'Refunded Order', recipient: generalSettings.adminEmail, state: refundOrder, setState:setRefundOrder},
    {name: 'Delayed Order', recipient: generalSettings.adminEmail, state: delayOrder, setState:setDelayOrder},
    {name: 'New Customer Chat', recipient: generalSettings.adminEmail, state: newCustChat, setState:setNewCustChat},
    {name: 'Deleted Account', recipient: generalSettings.adminEmail, state: deletedAccount, setState:setDeletedAccount},
  ]

  const emailNotifRows = emailNotifs?.map(el => {
    return <div className="proditem">
      <h5>{el.name}</h5>
      <h5>{el.recipient}</h5>
      <AppSwitch type="checkbox" onChange={(e) => el.setState(e.target.checked)} checked={el.state} />
    </div>
  })

  function saveSettings() {

  }

  useEffect(() => {
    setNewOrder(storeSettings.emails.newOrderEmail)
    setNewCustomer(storeSettings.emails.newCustomerEmail)
    setDelivOrder(storeSettings.emails.deliveredEmail)
    setRefundOrder(storeSettings.emails.refundedOrderEmail)
    setDelayOrder(storeSettings.emails.delayedOrderEmail)
    setNewCustChat(storeSettings.emails.newCustomerChatEmail)
    setDeletedAccount(storeSettings.emails.deletedAccountEmail)
  },[storeSettings])

  return (
    <>
      <section>
        <h4 className="settingstitle">Email Notifications</h4>
        <small>Email me when the following events occur:</small>
        <div className="producttable">
          <div className="header">
            <h5>Event</h5>
            <h5>Recipient</h5>
            <h5>Action</h5>
          </div>
          <div className="content">
            {emailNotifRows}
          </div>
        </div>
      </section>
      <div className="actionbtns">
        <AdminBtn title="Save" solid clickEven onClick={() => saveSettings()}/>
      </div>
    </>
  )
}