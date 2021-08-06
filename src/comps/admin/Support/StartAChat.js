import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { AppInput } from '../../common/AppInputs'
import { createAChat } from '../../common/services/ChatService'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import './styles/StartAChat.css'

export default function StartAChat(props) {

  const {allCustomers, allChats, user, setNotifs} = useContext(StoreContext)
  const {showNewChat, setShowNewChat, setUrlCustId,tempCustomerId, hideSearch=false} = props
  const [msgString, setMsgString] = useState('')
  const [customerId, setCustomerId] = useState('') 
  const [keyword, setKeyword] = useState('')
  const clean = text => text?.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allCustomersFilter = allCustomers?.filter(x => (pattern.test(clean(x.name)) && keyword.length
    && !allChats.some(y => y.chatInfo.customerId === x.id)) 
    || (keyword==='all' && !allChats.some(y => y.chatInfo.customerId === x.id)))
  const history = useHistory()

  const initChatInfo = {
    customerId,
    dateCreated: new Date(),
    dateModified: new Date(),
    isActive: true,
    isArchived: false,
    lastSenderId: user?.uid
  }

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
  function initChat(chatInfo) {
    history.push(`/admin/support/customer-support/chat/${chatInfo.customerId}`)
    setUrlCustId(chatInfo.customerId)
  }

  useEffect(() => {
    if(!showNewChat) {
      setCustomerId('')
      setMsgString('')
      setKeyword('')
    }
  },[showNewChat])

  useEffect(() => {
    setCustomerId(tempCustomerId)
    return () => setCustomerId('')
  },[tempCustomerId])

  return (
    <div className={`newchatcover ${showNewChat?"show":""}`} onClick={() => setShowNewChat(false)}>
        <div className="newchatcont" onClick={(e) => e.stopPropagation()}>
          <div>
            <div className="titlerow">
              <h4>Start a Chat</h4>
              <i className="fal fa-times" onClick={() => setShowNewChat(false)}></i>
            </div>
            {!hideSearch&&<>
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
            </>}
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
  )
}