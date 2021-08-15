import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { convertDate, convertTime, getCustomerArrById, getHoursAgo } from '../../common/UtilityFuncs'
import './styles/ChatBubble.css'

export default function ChatBubble(props) {

  const {allCustomers, user, accountSettings} = useContext(StoreContext)
  const {message, senderId, messageDate} = props.el
  const {chatData} = props
  const myBubble = senderId === user.uid
  
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
        <img 
          src={myBubble?getCustomerArrById(allCustomers, senderId)?.profimg:accountSettings.profimg} 
          alt=""
        />
      </div>
      <div className="right">
        <div className="chatbubble">
          <h6>
            {myBubble?getCustomerArrById(allCustomers, senderId)?.name:accountSettings.chatName}
          </h6>
          <p>{message}</p>
        </div>
        <small>{switchTimestamp(messageDate)}</small>
      </div>
    </div>
  )
}