import React, { useContext, useEffect, useState } from 'react'
import './styles/ChatSidebar.css'
import '../common/styles/TabsBar.css'
import {StoreContext} from '../../common/StoreContext'
import { useHistory, useLocation } from 'react-router-dom'
import {AppInput} from '../../common/AppInputs'
import ChatCard from './ChatCard'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import StartAChat from './StartAChat'

export default function ChatSidebar(props) {
 
  const {allChats, allCustomers} = useContext(StoreContext)
  const {setChatData, showNewChat, setShowNewChat} = props
  const [tabPos, setTabPos] = useState(0)
  const [urlCustId, setUrlCustId] = useState(0)
  const [keyword2, setKeyword2] = useState('')
  const clean = text => text?.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern2 = new RegExp('\\b' + clean(keyword2), 'i')
  const history = useHistory()
  const location = useLocation()
  
  const tabsTitles = [
    {name: 'All Chats', url: '/admin/support/customer-support/chat'},
    {name: 'Archived', url: '/admin/support/customer-support/archived'}
  ]
  
  const activeChatsRow = allChats
  ?.filter(x => (
    pattern2.test(clean(getCustomerArrById(allCustomers, x.chatInfo.customerId).name)) && !x.chatInfo.isArchived
    && x.chatInfo.isActive
  ))
  .map(({chatInfo},i) => {
    return <ChatCard 
      urlCustId={urlCustId} 
      chatInfo={chatInfo} 
      setChatData={setChatData} 
      i={i}
    />
  }) 

  const archivedChatsRow = allChats
  ?.filter(x => (
    pattern2.test(clean(getCustomerArrById(allCustomers, x.chatInfo.customerId).name)) && x.chatInfo.isArchived
    && x.chatInfo.isActive
  ))
  .map(({chatInfo},i) => {
    return <ChatCard 
      urlCustId={urlCustId} 
      chatInfo={chatInfo} 
      setChatData={setChatData} 
      i={i}
    />
  })

  const tabsheadrow = tabsTitles?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => {setTabPos(i);history.push(el.url)}}
    >{el.name}<hr/></h5>
  })

  useEffect(() => {
    const cardUrl = location.pathname.split('/chat/')[1]
    setUrlCustId(cardUrl)
  },[location])

  return (
    <div className="adminchatsidebar">
      <div className="tabsbar">
        <div className="tabstitles"> 
          {tabsheadrow} 
        </div>
        <hr className="tabline"/>
      </div>
      <div className={`tabsection ${tabPos===0?"show":""}`}>
        <div className="chatslistcont">
          <div className="newchatrow" onClick={() => setShowNewChat(true)}>
            <h5>New Chat</h5>
            <i className="far fa-plus"></i>
          </div>
          <div className="searchbar">
            <AppInput 
              placeholder="Find a conversation..."
              onChange={(e) => setKeyword2(e.target.value)}
            />
          </div>
          {activeChatsRow}
        </div>
      </div>
      <div className={`tabsection ${tabPos===1?"show":""}`}>
        <div className="archiveslistcont">
          <h5>Archived Chats will show up here.</h5>
          {archivedChatsRow}
        </div>
      </div>
      <StartAChat 
        showNewChat={showNewChat}
        setShowNewChat={setShowNewChat}
        tempCustomerId=""
      />
    </div>
  )
}