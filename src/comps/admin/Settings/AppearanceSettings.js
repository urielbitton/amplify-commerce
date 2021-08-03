import React, { useState } from 'react'
import PageTitlesRow from '../common/PageTitlesRow'
import UserProfile from './UserProfile'

export default function AppearanceSettings() {
  
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')

  return (
    <div className="adminappearsettings">
      <div className="settingspage">
        <UserProfile />
        <div className="pagecont">
          <PageTitlesRow 
            title={<><i className="far fa-palette"></i>Appearance Settings</>}
            searchPlaceholder="Find a setting..."
            setKeyword={setKeyword}
          />
        </div>
      </div>
    </div>
  )
}