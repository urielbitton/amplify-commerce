import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { convertDate, convertTime, getCustomerArrById, getHoursAgo, getUserArrById } from '../../common/UtilityFuncs'
import './styles/ChatBubble.css'

export default function AdminChatBubble(props) {

  const {allCustomers, allUsers, myUser, user} = useContext(StoreContext)
  const {message, senderId, messageDate} = props.el
  const {chatData} = props
  const adminUser = senderId === myUser?.userid && myUser?.isAdmin
  const adminId = myUser?.userid
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
        { adminUser?
          <img src={getUserArrById(allUsers, adminId)?.profimg} alt=""/>:
          <img src={getCustomerArrById(allCustomers, senderId)?.profimg} alt=""/>
        }
      </div>
      <div className="right">
        <div className="chatbubble">
          { adminUser?
            <h6>{getUserArrById(allUsers, adminId)?.fullname}</h6>:
            <h6>{getCustomerArrById(allCustomers, senderId)?.name}</h6>
          }
          <p>{message}</p>
        </div>
        <small>{switchTimestamp(messageDate)}</small>
      </div>
    </div>
  )
}