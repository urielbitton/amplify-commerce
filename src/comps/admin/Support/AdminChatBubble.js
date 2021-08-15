import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { convertDate, convertTime, getCustomerArrById, getHoursAgo } from '../../common/UtilityFuncs'
import './styles/ChatBubble.css'

export default function AdminChatBubble(props) {

  const {allCustomers, accountSettings} = useContext(StoreContext)
  const {message, senderId, messageDate} = props.el
  const {chatData} = props
  const myBubble = senderId === 'admin' 
  
  function switchTimestamp(date) {
    if(getHoursAgo(date?.toDate()) > 23) {
      return convertDate(date?.toDate())
    }
    else if(getHoursAgo(date?.toDate()) > 0.0166667){
      return convertTime(date?.toDate())
    }
    return 'Just now'
  }

  useEffect(() => {
    switchTimestamp()
  },[chatData])

  return (
    <div className={`chatbubblecont ${!myBubble?"other":""}`}>
      <div className="left">
        { senderId==='admin'?
          <img src={accountSettings.profimg} alt=""/>:
          <img src={getCustomerArrById(allCustomers, senderId)?.profimg} alt=""/>
        }
      </div>
      <div className="right">
        <div className="chatbubble">
          { senderId==='admin'?
            <h6>{accountSettings.name}</h6>:
            <h6>{getCustomerArrById(allCustomers, senderId)?.name}</h6>
          }
          <p>{message}</p>
        </div>
        <small>{switchTimestamp(messageDate)}</small>
      </div>
    </div>
  )
}