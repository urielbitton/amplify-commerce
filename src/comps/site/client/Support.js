import React, { useContext, useEffect, useState } from 'react'
import Dialogue from '../../admin/Support/Dialogue'
import { getChatByUserId } from '../../common/services/ChatService'
import { StoreContext } from '../../common/StoreContext'

export default function Support() {

  const {myChat, user} = useContext(StoreContext)
  const [chatData, setChatData] = useState([])

  useEffect(() => {
    user&&getChatByUserId(`chats/${user.uid}/messages`, setChatData)
  },[user])  
 
  return (
    <div className="clientsupportpage">
      <Dialogue chatData={chatData} setChatData={setChatData} chatInfo={myChat.chatInfo} />
    </div>
  )
}