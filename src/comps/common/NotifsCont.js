import React, { useContext } from 'react'
import NotifsCard from './NotifsCard'
import {StoreContext} from './StoreContext'

export default function NotifsCont() {

  const {notifs} = useContext(StoreContext)
  
  const notifsrow = notifs?.map(el => {
    return <NotifsCard el={el} /> 
  })
   
  return (
    <div className="notifscont"> 
      {notifsrow}
    </div>
  )
}