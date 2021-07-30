import React, { useState } from 'react'
import ChatProfile from './ChatProfile'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import './styles/CustomerSupport.css'

export default function CustomerSupport() {

  const [chatData, setChatData] = useState([])
  const [showNewChat, setShowNewChat] = useState(false)

  return (
    <div className="customersupportpage">
      <ChatSidebar setChatData={setChatData} showNewChat={showNewChat} setShowNewChat={setShowNewChat} />
      <ChatWindow chatData={chatData} showNewChat={showNewChat} setShowNewChat={setShowNewChat} />
      <ChatProfile />
    </div>
  )
}