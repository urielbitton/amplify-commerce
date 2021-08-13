import React, { useContext, useState } from 'react'
import {StoreContext} from '../../common/StoreContext'
import PageStarter from '../common/PageStarter'
import PageTitlesRow from '../common/PageTitlesRow'
import PageTitle from '../common/PageTitle'

export default function Subscribers() {

  const {allSubscribers} = useContext(StoreContext)
  const [keyword, setKeyword] = useState('')

  return (
    <div className="subscriberspage">
      <PageTitle title="Customers"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Subscribers"
          btnTitle="New Subscriber"
          btnUrl="/admin/subscribers/add-subscriber"
          searchPlaceholder="Find a Subscriber"
          setKeyword={setKeyword}
        />
        <PageStarter 
          subtitle="You have no subscribers yet."
          title="Add a Subscriber"
          img="https://i.imgur.com/KDqhRGi.png"
          btnText="Add Subscriber"
          btnUrl="/admin/subscribers/add-subscriber"
          hide={allSubscribers.length}
        />
        <div className="customerstablecont">
          <div className="producttable">
            <div className="header">
              
            </div>
            <div className="content">
              
            </div>
            <div className="foot">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}