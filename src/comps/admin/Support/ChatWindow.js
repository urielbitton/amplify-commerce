import React, { useContext } from 'react'
import './styles/ChatWindow.css'
import PageStarter from '../common/PageStarter'
import { Route, Switch } from 'react-router-dom'
import { StoreContext } from '../../common/StoreContext'
import Dialogue from './Dialogue'

export default function ChatWindow(props) {

  const {allChats} = useContext(StoreContext)
  const {chatData} = props

  const chatPages = allChats?.map(({chatInfo}) => {
    return <Route path={`/admin/support/customer-support/chat/${chatInfo.customerId}`}>
      <Dialogue chatData={chatData} chatInfo={chatInfo}/>
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
            />
          </div>
        </Route>
      </Switch>
    </div>
  )
}