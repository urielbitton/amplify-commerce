import React, { useContext} from 'react'
import { convertDate, convertTime, getCustomerArrById, getHoursAgo } from '../../common/UtilityFuncs'
import { StoreContext } from '../../common/StoreContext'
import { useHistory } from 'react-router-dom'
import { getChatByUserId } from '../../common/services/ChatService'

export default function ChatCard(props) {

  const {allCustomers} = useContext(StoreContext)
  const {urlCustId, chatInfo, setChatData} = props
  const history = useHistory()

  function initChat(chatInfo) {
    history.push(`/admin/support/customer-support/chat/${chatInfo.customerId}`)
    getChatByUserId(chatInfo.customerId, setChatData)
  }
  function shortenMsgs(text) {
    if(text.length > 40) {
      return text.substring(0,40) + "..."
    }
    return text
  }
  function switchTimestamp(date) {
    if(getHoursAgo(date?.toDate()) > 23) {
      return convertDate(date?.toDate())
    }
    else if(getHoursAgo(date?.toDate()) > 0.0166667){
      return convertTime(date?.toDate())
    }
    return 'Just now'
  }

  return (
    <div 
      className={`chatcard ${chatInfo.customerId===urlCustId?"active":""} ${!chatInfo.read?"unread":""}`} 
      onClick={() => initChat(chatInfo)}
    >
      <img src={getCustomerArrById(allCustomers, chatInfo.customerId).profimg} alt=""/>
      <div>
        <h5>{getCustomerArrById(allCustomers, chatInfo.customerId).name}</h5>
        <small>{shortenMsgs(chatInfo.lastMsg)}</small> 
      </div>
      <div className="optscont" onClick={(e) => e.stopPropagation()}>
        <i className="fal fa-ellipsis-h"></i>
      </div>
      <span className="datemodif">{switchTimestamp(chatInfo.dateModified)}</span>
    </div>
  )
}