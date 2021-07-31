import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import AdminChatBubble from './AdminChatBubble'
import './styles/Dialogue.css'
import TextareaAutosize from 'react-textarea-autosize'
import { getChatByUserId, sendChat } from '../../common/services/ChatService'
import { Link } from 'react-router-dom'

export default function AdminDialogue(props) {

  const {allCustomers, user} = useContext(StoreContext)
  const {chatData, setChatData, chatInfo} = props
  const [msgString, setMsgString] = useState('')
  const scrollRef = useRef()

  const chatBubbleCont = chatData?.map(el => {
    return <AdminChatBubble el={el} chatData={chatData} />
  })

  function handleChange(e) {
    setMsgString(e.target.value)
  }
  function handleEnter(e) {
    if(e.key === 'Enter' && e.shiftKey) {}
    else if(e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }
  function handleSend() {
    if(msgString.length) {
      const chatObj = {
        isActive: true,
        message: msgString,
        messageDate: new Date(),
        senderId: user.uid
      }
      sendChat(chatInfo.customerId, chatObj)
      getChatByUserId(chatInfo.customerId, setChatData)
      setMsgString('') 
    }
  }

  useEffect(() => {
    scrollRef.current.scrollIntoView()
  },[chatData])

  useEffect(() => {
    getChatByUserId(chatInfo.customerId, setChatData)
  },[])

  return (
    <div className="dialoguecont">
      <header>
        <div>
          <img src={getCustomerArrById(allCustomers, chatInfo?.customerId)?.profimg} alt=""/>
          <h5>
            <Link to={`/admin/customer/${getCustomerArrById(allCustomers, chatInfo?.customerId)?.id}`}>
              {getCustomerArrById(allCustomers, chatInfo?.customerId)?.name}
            </Link>
          </h5>
        </div>
        <div>
          <div className="optscont">
            <i className="far fa-info"></i>
          </div>
          <div className="optscont">
            <i className="far fa-ellipsis-h"></i>
          </div>
        </div>
      </header>
      <section>
        <div ref={scrollRef}></div>
        {chatBubbleCont}
        <small className="loadmore">Load more</small>
      </section>
      <div className="typercont">
        <div>
          <div className="optscont">
            <i className="fal fa-images"></i>
          </div>
          <div className="optscont">
            <i className="fal fa-paperclip"></i>
          </div>
        </div>
        <label className="apptextarea">
          <TextareaAutosize 
            placeholder="Enter a message..."
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
            value={msgString}
            maxRows={10}
          />
        </label>
        <i className="fas fa-paper-plane sendbtn" onClick={() => handleSend()}></i>
      </div>
    </div>
  )
}