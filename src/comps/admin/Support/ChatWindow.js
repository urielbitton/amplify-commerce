import React from 'react'
import './styles/ChatWindow.css'
import PageStarter from '../common/PageStarter'

export default function ChatWindow(props) {

  const {chatData} = props

  return (
    <div className="adminchatwindow">
      <div className="nochatcont">
        <PageStarter 
          subtitle="Select a chat to start chatting with customers"
          title="Start a Chat"
          img="https://i.imgur.com/xP6AwB2.png"
          hide={!!chatData}
        />
      </div>
    </div>
  )
}