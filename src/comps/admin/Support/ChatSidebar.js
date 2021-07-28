import React, { useContext, useEffect, useState } from 'react'
import './styles/ChatSidebar.css'
import TabsBar from '../common/TabsBar'
import {StoreContext} from '../../common/StoreContext'
import { getAllChats } from '../../common/services/ChatService'
import { getCustomerArrById } from '../../common/UtilityFuncs'

export default function ChatSidebar() {

  const {allChats, allCustomers} = useContext(StoreContext)
  const [tabPos, setTabPos] = useState(0)
  const tabsTitles = ['All Chats', 'Archived']

  const chatCardRow = allChats?.map(el => {
    return <div className="chatcard">
      <img src={getCustomerArrById(allCustomers, el.chatInfo.customerId).profimg} alt=""/>
      <div>
        <h5>Jessica Haze</h5>
        <small>I was wondering if the women's peach...</small>
      </div>
    </div>
  }) 

  return (
    <div className="adminchatsidebar">
      <TabsBar 
        tabsTitles={tabsTitles} 
        tabPos={tabPos} 
        setTabPos={setTabPos} 
      />
      <div className="chatslistcont">
        {chatCardRow}
      </div>
    </div>
  )
}