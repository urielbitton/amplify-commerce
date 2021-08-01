import React from 'react'
import UserProfile from './UserProfile'

export default function StoreSettings() {

  return (
    <div className="storesettingspage">
      <div className="settingspage">
        <UserProfile />
        <div className="pagecont">

        </div>
      </div>
      <h4>Add section to add product sizes + product colors to store</h4>
      <h6>Store these sizes + colors in db and pull this data</h6>
    </div>
  )
}