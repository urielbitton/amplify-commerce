import React, { useContext, useEffect, useState } from 'react'
import './styles/ChatSidebar.css'
import '../common/styles/TabsBar.css'
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
  const tabsTitles = [
    {name: 'All Chats', url: '/admin/support/customer-support/chat'},
    {name: 'Archived', url: '/admin/support/customer-support/archived'}
  ]

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

  const tabsheadrow = tabsTitles?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => {setTabPos(i);history.push(el.url)}}
    >{el.name}<hr/></h5>
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
      <div className="tabsbar">
        <div className="tabstitles"> 
          {tabsheadrow} 
        </div>
        <hr className="tabline"/>
      </div>
      <div className={`tabsection ${tabPos===0?"show":""}`}>
        <div className="chatslistcont">
          {chatCardRow}
        </div>
      </div>
      <div className={`tabsection ${tabPos===1?"show":""}`}>
        <div className="archiveslistcont">
          <h5>Archived Chats will show up here.</h5>
        </div>
      </div>
      
    </div>
  )
}