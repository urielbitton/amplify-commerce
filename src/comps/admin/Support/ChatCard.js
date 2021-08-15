import React, { useContext, useEffect, useState} from 'react'
import { getCustomerArrById, switchTimestamp } from '../../common/UtilityFuncs'
import { StoreContext } from '../../common/StoreContext'
import { useHistory } from 'react-router-dom'
import { archiveChat, deactivateChat, markReadChat, getChatByUserId } from '../../common/services/ChatService'
import './styles/ChatCard.css'

export default function ChatCard(props) {

  const {allCustomers} = useContext(StoreContext)
  const {urlCustId, chatInfo, setChatData, i} = props
  const [showOpts, setShowOpts] = useState(-1)
  const history = useHistory()

  function initChat(chatInfo) {
    history.push(`/admin/support/customer-support/chat/${chatInfo.customerId}`)
    getChatByUserId(chatInfo.customerId, setChatData, 10)
  }
  function shortenMsgs(text) {
    if(text.length > 40) {
      return text.substring(0,40) + "..."
    }
    return text
  }
  
  function showOptsMenu(e) {
    setShowOpts(showOpts===i?-1:i)
    e.stopPropagation()
  }
  function archiveAChat() {
    archiveChat(chatInfo.customerId, !chatInfo.isArchived)
  }
  function deleteChat() {
    const confirm = window.confirm('Are you sure you want to delete this chat? You can restore it later from your deactivated messages.')
    if(confirm) {
      deactivateChat(chatInfo.customerId, !chatInfo.isActive)
      history.push('/admin/support/customer-support')
    }
  }
  function markAsRead() {
    markReadChat(chatInfo.customerId, !chatInfo.read)
  }

  useEffect(() => {
    if(showOpts !== -1)
      window.onclick = () => setShowOpts(-1)
  },[showOpts])

  return (
    <div 
      className={`chatcard ${chatInfo.customerId===urlCustId?"active":""} ${chatInfo.customerId===chatInfo.lastSenderId&&!chatInfo.read?"unread":""}`} 
      onClick={() => initChat(chatInfo)}
    >
      <img src={getCustomerArrById(allCustomers, chatInfo.customerId).profimg} alt=""/>
      <div>
        <h5>{getCustomerArrById(allCustomers, chatInfo.customerId).name}</h5>
        <small>{shortenMsgs(chatInfo.lastMsg)}</small> 
      </div>
      <div className="optscont" onClick={(e) => showOptsMenu(e)}>
        <i className="fal fa-ellipsis-h"></i>
        <div className={`optsmenucont ${showOpts===i?"show":""}`}>
          <h6 onClick={() => archiveAChat()} className={chatInfo.isArchived?"on":""}><i className="fal fa-archive"></i>Archive{chatInfo.isArchived?"d":""}</h6>
          <h6 onClick={() => deleteChat()}><i className="fal fa-trash-alt"></i>Delete</h6>
          <h6 onClick={() => markAsRead()} className={chatInfo.read?"on":""}><i className="fal fa-check"></i>{chatInfo.read?"Unread":"Read"}</h6>
        </div>
      </div>
      <span className="datemodif">{switchTimestamp(chatInfo.dateModified)}</span>
    </div>
  )
}