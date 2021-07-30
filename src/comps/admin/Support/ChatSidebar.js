import React, { useContext, useEffect, useState } from 'react'
import './styles/ChatSidebar.css'
import '../common/styles/TabsBar.css'
import {StoreContext} from '../../common/StoreContext'

import { createAChat, getChatByUserId } from '../../common/services/ChatService'
import { useHistory, useLocation } from 'react-router-dom'
import {AppInput} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import TextareaAutosize from 'react-textarea-autosize'
import ChatCard from './ChatCard'

export default function ChatSidebar(props) {
 
  const {allChats, allCustomers, setNotifs, user} = useContext(StoreContext)
  const {chatData, setChatData, showNewChat, setShowNewChat} = props
  const [tabPos, setTabPos] = useState(0)
  const [urlCustId, setUrlCustId] = useState(0)
  
  const [msgString, setMsgString] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [keyword, setKeyword] = useState('')
  const clean = text => text?.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const history = useHistory()
  const location = useLocation()
  const allCustomersFilter = allCustomers?.filter(x => (pattern.test(clean(x.name)) && keyword.length
    && !allChats.some(y => y.chatInfo.customerId === x.id)) 
    || (keyword==='all' && !allChats.some(y => y.chatInfo.customerId === x.id)) )

  const tabsTitles = [
    {name: 'All Chats', url: '/admin/support/customer-support/chat'},
    {name: 'Archived', url: '/admin/support/customer-support/archived'}
  ]
  const initChatInfo = {
    customerId,
    dateCreated: new Date(),
    dateModified: new Date(),
    isActive: true,
    isArchived: false
  }

  const chatCardRow = allChats?.map(({chatInfo}) => {
    return <ChatCard urlCustId={urlCustId} setUrlCustId={setUrlCustId} chatInfo={chatInfo} chatData={chatData} setChatData={setChatData}/>
  }) 

  const tabsheadrow = tabsTitles?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => {setTabPos(i);history.push(el.url)}}
    >{el.name}<hr/></h5>
  })

  const allCustList = allCustomersFilter
  ?.map(({id,name,profimg}) => {
    return <div 
      className="custrow" 
      onClick={() => customerId!==id?setCustomerId(id):setCustomerId('')}
    >
      <div className="first">
        <img src={profimg} alt=""/>
        <h6>{name}</h6>
      </div>
      <AdminBtn 
        title={customerId===id?<i className="fal fa-check"></i>:<i className="fal fa-user"></i>} 
        solid 
      />
    </div>
  })
  
  function initChat(chatInfo) {
    getChatByUserId(`chats/${chatInfo.customerId}/messages`, setChatData)
    history.push(`/admin/support/customer-support/chat/${chatInfo.customerId}`)
    setUrlCustId(chatInfo.customerId)
  }
  function handleEnter(e) {
    if(e.key === 'Enter' && e.shiftKey) {}
    else if(e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }
  function handleSend() {
    if(msgString.length && customerId.length) {
      createAChat(customerId, msgString, user.uid)
      initChat(initChatInfo)
      setMsgString('') 
      setShowNewChat(false)
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please select a customer and enter a message to start chatting.`,
        time: 5000
      }])
    }
  }

  useEffect(() => {
    const cardUrl = location.pathname.split('/chat/')[1]
    setUrlCustId(cardUrl)
  },[location])

  useEffect(() => {
    if(!showNewChat) {
      setCustomerId('')
      setMsgString('')
      setKeyword('')
    }
  },[showNewChat])


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
          {chatCardRow}
        </div>
      </div>
      <div className={`tabsection ${tabPos===1?"show":""}`}>
        <div className="archiveslistcont">
          <h5>Archived Chats will show up here.</h5>
        </div>
      </div>
      <div className={`newchatcover ${showNewChat?"show":""}`} onClick={() => setShowNewChat(false)}>
        <div className="newchatcont" onClick={(e) => e.stopPropagation()}>
          <div>
            <div className="titlerow">
              <h4>Start a Chat</h4>
              <i className="fal fa-times" onClick={() => setShowNewChat(false)}></i>
            </div>
            <AppInput 
              className="searchinp" 
              iconclass="fal fa-search" 
              placeholder="Search customers..."
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <div className={`resultscont ${keyword.length?"show":""}`}>
              { allCustList.length?allCustList:<small>No Results.</small> }
            </div>
          </div>
          <div className="actions">
            <TextareaAutosize 
              placeholder="Enter a message..."
              onChange={(e) => setMsgString(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
              value={msgString}
              maxRows={10}
            />
            <AdminBtn 
              title="Send" 
              solid clickEvent 
              className={(!msgString.length||!customerId.length)?"disabled":""}
              disable={!msgString.length && !customerId.length}
              onClick={() => handleSend()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}