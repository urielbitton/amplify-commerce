import React, { useContext } from 'react'
import './styles/ChatWindow.css'
import PageStarter from '../common/PageStarter'
import { Route, Switch } from 'react-router-dom'
import { StoreContext } from '../../common/StoreContext'
import AdminDialogue from './AdminDialogue'

export default function ChatWindow(props) {

  const {allChats} = useContext(StoreContext)
  const {chatData, setChatData, setShowNewChat} = props

  const chatPages = allChats
  ?.filter(x => x.chatInfo.isActive)
  .map(({chatInfo}) => {
    return <Route path={`/admin/support/customer-support/chat/${chatInfo.customerId}`}>
      <AdminDialogue chatData={chatData} setChatData={setChatData} chatInfo={chatInfo}/>
    </Route>
  })

  return (
    <div className="adminchatwindow">
      <Switch>
        {chatPages}
        <Route>
          <div className="nochatcont">
            <PageStarter 
              subtitle="Select a chat to start chatting with customers"
              title="Start a Chat"
              img="https://i.imgur.com/xP6AwB2.png"
              btnText="New Chat"
              clickEvent
              onClick={() => setShowNewChat(true)}
            />
          </div>
        </Route>
      </Switch>
    </div>
  )
}