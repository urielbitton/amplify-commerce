import React, { useContext, useEffect, useState } from 'react'
import Dialogue from '../../admin/Support/Dialogue'
import { getChatByUserId } from '../../common/services/ChatService'
import { StoreContext } from '../../common/StoreContext'

export default function Support() {

  const {myChat, user} = useContext(StoreContext)
  const [chatData, setChatData] = useState([])

  useEffect(() => {
    getChatByUserId(`chats/${user.uid}/messages`, setChatData)
  },[myChat]) 

  return (
    <div className="clientsupportpage">
      <Dialogue chatData={chatData} chatInfo={myChat.chatInfo} />
    </div>
  )
}