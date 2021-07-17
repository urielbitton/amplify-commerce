import React, { useContext, useEffect, useState } from 'react'
import './styles/NotifsCard.css'
import { StoreContext } from './StoreContext'

export default function NotifsCard(props) {

  const {notifs} = useContext(StoreContext)
  const {id, title, icon, color="var(--admincolor)", text, time=999999} = props.el
  const [fadeIn, setFadeIn] = useState(false)

  function removeNotif() {
    setFadeIn(false)
    setTimeout(() => {
      notifs.forEach(el => {
        if(el.id === id) {
          let itemindex = notifs.indexOf(el)
          notifs.splice(itemindex,1)
        }
      })
    },30)
  }
   
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setFadeIn(true)
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
    <div className={`notifsdiv ${fadeIn&&"show"}`} style={{borderColor:color}}>
      <div className="infocont">
        <div className="iconcont" style={{background:color}}>
          <i className={icon}></i>
        </div>
        <div className="msgcont">
          <h5>{title}</h5>
          <p>{text}</p>
        </div>
      </div>
      <i className="fal fa-times" onClick={() => removeNotif()}></i>
    </div>
  )
}