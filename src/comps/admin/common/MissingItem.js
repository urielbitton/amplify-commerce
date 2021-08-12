import React from 'react'
import PageStarter from './PageStarter'

export default function MissingItem(props) {

  const {itemName, itemUrl} = props

  return (
    <div classNam="missingitempage">
      <PageStarter 
        subtitle={`the ${itemName} could not be found. It was probably deleted from your store.`}
        title={`${itemName} not found`}
        img="https://i.imgur.com/Eniblar.png"
        btnText={`Return to ${itemName}s`}
        btnUrl={itemUrl}
      />
    </div>
  )
}