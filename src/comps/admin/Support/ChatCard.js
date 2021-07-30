import React, { useContext, useEffect, useState } from 'react'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import { getChatByUserId, getLastMessage } from '../../common/services/ChatService'
import { StoreContext } from '../../common/StoreContext'
import { useHistory } from 'react-router-dom'

export default function ChatCard(props) {

  const {allCustomers} = useContext(StoreContext)
  const {urlCustId, setUrlCustId, chatInfo, chatData, setChatData} = props
  const [lastMsg, setLastMsg] = useState({})
  const history = useHistory()

  function initChat(chatInfo) {
    getChatByUserId(`chats/${chatInfo.customerId}/messages`, setChatData)
    history.push(`/admin/support/customer-support/chat/${chatInfo.customerId}`)
    setUrlCustId(chatInfo.customerId)
  }

  useEffect(() => {
    getLastMessage(`chats/${chatInfo.customerId}/messages`, setLastMsg)
  },[])

  return (
    <div 
      className={`chatcard ${chatInfo.customerId===urlCustId?"active":""}`} 
      onClick={() => initChat(chatInfo)}
    >
      <img src={getCustomerArrById(allCustomers, chatInfo.customerId).profimg} alt=""/>
      <div>
        <h5>{getCustomerArrById(allCustomers, chatInfo.customerId).name}</h5>
        <small>{lastMsg.message?.slice(0,30)} {lastMsg.message?.length>30&&"..."}</small>
      </div>
      <div className="optscont" onClick={(e) => e.stopPropagation()}>
        <i className="fal fa-ellipsis-h"></i>
      </div>
    </div>
  )
}