import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import './styles/CustomerSupport.css'

export default function CustomerSupport() {

  const {setFetchChats} = useContext(StoreContext)
  const [chatData, setChatData] = useState([])
  const [showNewChat, setShowNewChat] = useState(false)

  useEffect(() => {
    setFetchChats(true)
  },[])

  return (
    <div className="customersupportpage">
      <ChatSidebar chatData={chatData} setChatData={setChatData} showNewChat={showNewChat} setShowNewChat={setShowNewChat} />
      <ChatWindow chatData={chatData} setChatData={setChatData} showNewChat={showNewChat} setShowNewChat={setShowNewChat} />
      {/* <ChatProfile /> */}
    </div>
  )
}