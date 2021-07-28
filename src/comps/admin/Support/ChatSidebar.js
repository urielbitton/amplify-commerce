import React, { useContext, useState } from 'react'
import './styles/ChatSidebar.css'
import TabsBar from '../common/TabsBar'
import {StoreContext} from '../../common/StoreContext'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import { getChatByUserId } from '../../common/services/ChatService'

export default function ChatSidebar(props) {

  const {allChats, allCustomers} = useContext(StoreContext)
  const {setChatData} = props
  const [tabPos, setTabPos] = useState(0)
  const tabsTitles = ['All Chats', 'Archived']

  const chatCardRow = allChats?.map(el => {
    return <div 
      className="chatcard" 
      onClick={() => getChatByUserId(`chats/${el.chatInfo.customerId}/messages`, setChatData)}
    >
      <img src={getCustomerArrById(allCustomers, el.chatInfo.customerId).profimg} alt=""/>
      <div>
        <h5>{getCustomerArrById(allCustomers, el.chatInfo.customerId).name}</h5>
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