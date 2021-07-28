import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { convertDate, getCustomerArrById, getUserArrById } from '../../common/UtilityFuncs'
import './styles/ChatBubble.css'

export default function ChatBubble(props) {

  const {allCustomers, allUsers, myUser, user} = useContext(StoreContext)
  const {message, senderId, messageDate} = props.el
  const adminUser = senderId === myUser?.userid && myUser?.isAdmin
  const adminId = myUser?.userid
  const myBubble = senderId === user.uid
  
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
        <small>{convertDate(messageDate.toDate())}</small>
      </div>
    </div>
  )
}