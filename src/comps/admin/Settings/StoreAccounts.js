import React, { useContext, useEffect, useState } from 'react'
import {AppSwitch} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'

export default function StoreAccounts() {

  const {storeSettings} = useContext(StoreContext)
  const [guestOrders, setGuestOrders] = useState(true)
  const [createAccount, setCreateAccount] = useState(true)
  const [allowDelete, setAllowDelete] = useState(true)
  const [allowEdit, setAllowEdit] = useState(true)
  const [allowTrack, setAllowTrack] = useState(true)
  const [allowCancel, setAllowCancel] = useState(true)

  function saveSettings() {

  }

  useEffect(() => {
    setGuestOrders(storeSettings.accounts.guestOrders)
    setCreateAccount(storeSettings.accounts.allowCustCreateAccount)
    setAllowDelete(storeSettings.accounts.allowCustDeleteAccount)
    setAllowEdit(storeSettings.accounts.allowCustEditAccount)
    setAllowTrack(storeSettings.accounts.allowCustTrackOrders)
    setAllowCancel(storeSettings.accounts.allowCustCancelOrders)
  },[storeSettings])

  return (
    <>
      <section>
        <h4 className="settingstitle">Checkout Experience</h4>
        <AppSwitch title="Allow customers to place orders without an account" onChange={(e) => setGuestOrders(e.target.checked)} checked={guestOrders} />
        <AppSwitch title="Allow customers to create an account during checkout" onChange={(e) => setCreateAccount(e.target.checked)} checked={createAccount}/>
      </section>
      <section>
        <h4 className="settingstitle">Customer Accounts</h4>
        <AppSwitch title="Allow customers to delete their account" onChange={(e) => setAllowDelete(e.target.checked)} checked={allowDelete}/>
        <AppSwitch title="Allow customers to modify their account information" onChange={(e) => setAllowEdit(e.target.checked)} checked={allowEdit}/>
      </section>
      <section>
        <h4 className="settingstitle">Customer Orders</h4>
        <AppSwitch title="Allow customers to track their orders" onChange={(e) => setAllowTrack(e.target.checked)} checked={allowTrack}/>
        <AppSwitch title="Allow customers to cancel their orders" onChange={(e) => setAllowCancel(e.target.checked)} checked={allowCancel}/>
      </section>
      <div className="actionbtns">
        <AdminBtn title="Save" solid clickEvent onClick={() => saveSettings()}/>
      </div>
    </>
  )
}