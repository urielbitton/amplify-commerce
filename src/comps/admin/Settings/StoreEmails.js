import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../common/StoreContext'
import {AppSwitch} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {setDB, updateDB} from '../../common/services/CrudDb'
import { db } from '../../common/Fire'

export default function StoreEmails() {

  const {generalSettings, storeSettings, setNotifs} = useContext(StoreContext)
  const [newOrder, setNewOrder] = useState(true)
  const [newCustomer, setNewCustomer] = useState(true)
  const [delivOrder, setDelivOrder] = useState(true)
  const [refundOrder, setRefundOrder] = useState(false)
  const [delayOrder, setDelayOrder] = useState(false)
  const [newCustChat, setNewCustChat] = useState(false)
  const [deletedAccount, setDeletedAccount] = useState(false)
  const updateID = db.collection('admin').doc().id

  const emailNotifs = [
    {name: 'New Customer', recipient: generalSettings.adminEmail, state: newCustomer, setState:setNewCustomer},
    {name: 'New Order', recipient: generalSettings.adminEmail, state: newOrder, setState:setNewOrder},
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
    updateDB('admin', 'storeSettings', { 
      emails: {
        delayedOrderEmail: delayOrder,
        deletedAccountEmail: deletedAccount,
        deliveredOrderEmail: delivOrder,
        newCustomerChatEmail: newCustChat,
        newCustomerEmail: newCustomer,
        newOrderEmail: newOrder,
        refundedOrderEmail: refundOrder
      }
    }).then(() => {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: `Email Preferences Updated`,
        icon: 'fal fa-cog',
        text: `The store email Preferences were successfully updated`,
        time: 5000
      }])
      setDB('updates', updateID, {
        color: '#0088ff',
        date: new Date(),
        descript: `The store email Preferences were updated. View them here.`,
        icon: 'fal fa-user-cog',
        id: updateID,
        read: false,
        title: 'Email Preferences Updated',
        url: `/admin/settings/store?emails`
      })
    })
  }

  useEffect(() => {
    setNewOrder(storeSettings.emails.newOrderEmail)
    setNewCustomer(storeSettings.emails.newCustomerEmail)
    setDelivOrder(storeSettings.emails.deliveredOrderEmail)
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