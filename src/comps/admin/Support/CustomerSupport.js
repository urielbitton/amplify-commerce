import React from 'react'
import ChatProfile from './ChatProfile'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import './styles/CustomerSupport.css'

export default function CustomerSupport() {

  return (
    <div className="customersupportpage">
      <ChatSidebar />
      <ChatWindow />
      <ChatProfile />
    </div>
  )
}