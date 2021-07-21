import React, { useContext, useEffect, useState } from 'react'
import './styles/NotifsCard.css'
import { StoreContext } from './StoreContext'
import AdminBtn from '../admin/common/AdminBtn'

export default function NotifsCard(props) {

  const {notifs, setNotifs} = useContext(StoreContext)
  const {id, title, icon, color="var(--admincolor)", text, time=999999, action, event, eventTitle, 
    noClose=false} = props.el
  const [show, setShow] = useState(false)

  function removeNotif() {
    let itemindex = notifs.findIndex(x => x.id === id)
    notifs.splice(itemindex,1)
    setNotifs(prev => [...prev])
  } 
   
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShow(id) 
    },30)
    const endTimer = setTimeout(() => {
      removeNotif()
    },time)
    return () => {
      clearTimeout(startTimer)
      clearTimeout(endTimer)
    }
  },[notifs])


  return (
    <div className={`notifsdiv ${show===id&&"show"}`} style={{borderColor:color}}>
      <div className="infocont">
        <div className="iconcont" style={{background:color}}>
          <i className={icon}></i>
        </div>
        <div className="msgcont">
          <h5>{title}</h5>
          <p>{text}</p>
        </div>
      </div>
      {action&&<AdminBtn title={eventTitle} solid clickEvent onClick={() => event()}/>}
      {!noClose&&<i className="fal fa-times" onClick={() => removeNotif()}></i>}
    </div>
  )
}