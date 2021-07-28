import React, { useContext, useEffect, useState } from 'react'
import './styles/ChatSidebar.css'
import TabsBar from '../common/TabsBar'
import {StoreContext} from '../../common/StoreContext'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import { getChatByUserId } from '../../common/services/ChatService'
import { useHistory, useLocation } from 'react-router-dom'

export default function ChatSidebar(props) {

  const {allChats, allCustomers} = useContext(StoreContext)
  const {setChatData} = props
  const [tabPos, setTabPos] = useState(0)
  const [urlCustId, setUrlCustId] = useState(0)
  const history = useHistory()
  const location = useLocation()
  const tabsTitles = ['All Chats', 'Archived']

  const chatCardRow = allChats?.map(({chatInfo}) => {
    return <div 
      className={`chatcard ${chatInfo.customerId===urlCustId?"active":""}`} 
      onClick={() => initChat(chatInfo)}
    >
      <img src={getCustomerArrById(allCustomers, chatInfo.customerId).profimg} alt=""/>
      <div>
        <h5>{getCustomerArrById(allCustomers, chatInfo.customerId).name}</h5>
        <small>I was wondering if the women's peach...</small>
      </div>
      <div className="optscont" onClick={(e) => e.stopPropagation()}>
        <i className="fal fa-ellipsis-h"></i>
      </div>
    </div>
  }) 
  
  function initChat(chatInfo) {
    getChatByUserId(`chats/${chatInfo.customerId}/messages`, setChatData)
    history.push(`/admin/support/customer-support/chat/${chatInfo.customerId}`)
    setUrlCustId(chatInfo.customerId)
  }

  useEffect(() => {
    const cardUrl = location.pathname.split('/chat/')[1]
    setUrlCustId(cardUrl)
  },[location])

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