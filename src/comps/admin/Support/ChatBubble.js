import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { convertDate, convertTime, getCustomerArrById, getHoursAgo } from '../../common/UtilityFuncs'
import './styles/ChatBubble.css'

export default function ChatBubble(props) {

  const {allCustomers, user} = useContext(StoreContext)
  const {message, senderId, messageDate} = props.el
  const {chatData} = props
  const myBubble = senderId === user.uid
  
  function switchTimestamp() {
    if(getHoursAgo(messageDate.toDate()) > 23) {
      return convertDate(messageDate.toDate())
    }
    else if(getHoursAgo(messageDate.toDate()) > 0.0166667){
      return convertTime(messageDate.toDate())
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
          src={myBubble?getCustomerArrById(allCustomers, senderId)?.profimg:"https://i.imgur.com/8VnozI9.jpg"} 
          alt=""
        />
      </div>
      <div className="right">
        <div className="chatbubble">
          <h6>
            {myBubble?getCustomerArrById(allCustomers, senderId)?.name:"Amplify"}
          </h6>
          <p>{message}</p>
        </div>
        <small>{switchTimestamp()}</small>
      </div>
    </div>
  )
}