import React from 'react'
import PageStarter from '../../admin/common/PageStarter'

export default function Error() {
  return (
    <div className="errorpage error404page">
      <PageStarter
        subtitle="The page you are looking for does not exist."
        title="Error 404"
        img="https://i.imgur.com/XEwNGeG.png"
        btnText="Back to Home"
        btnUrl="/"
      />
    </div>
  )
} 