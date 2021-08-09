import React from 'react'
import { useHistory } from 'react-router-dom'
import { updateDB } from '../../common/services/CrudDb'
import { convertDate, switchTimestamp } from '../../common/UtilityFuncs'
import './styles/UpdatesCard.css'

export default function UpdatesCard(props) {

  const {id, title, descript, color="#0088ff", date=new Date(), icon="fal fa-bell", url="/admin", 
    read=false} = props.el
  const history = useHistory()

  function shortenMsgs(text) {
    if(text.length > 70) {
      return text.substring(0,70) + "..."
    }
    return text
  }
  
  function clickAction() {
    updateDB('updates', id, {read:true})
    history.push(url)
  }

  return (
    <div className="updatescard" onClick={() => clickAction()}>
      <div>
        <div className="iconcontainer" style={{background: color}}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="infocont">
        <h5>{title}<div className={`readreceipt ${read?"read":"unread"}`}></div></h5>
        <p>{shortenMsgs(descript)}</p>
        <small>{switchTimestamp(date)}</small> 
      </div>
    </div>
  )
}