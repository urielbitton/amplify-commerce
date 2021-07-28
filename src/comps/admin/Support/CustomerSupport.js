import React, { useState } from 'react'
import ChatProfile from './ChatProfile'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import './styles/CustomerSupport.css'

export default function CustomerSupport() {

  const [chatData, setChatData] = useState([])

  return (
    <div className="customersupportpage">
      <ChatSidebar setChatData={setChatData} />
      <ChatWindow chatData={chatData} />
      <ChatProfile />
    </div>
  )
}