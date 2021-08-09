import React from 'react'
import { useHistory } from 'react-router-dom'
import { convertDate } from '../../common/UtilityFuncs'
import './styles/UpdatesCard.css'

export default function UpdatesCard(props) {

  const {title, descript, color, date, icon, id, url} = props.el
  const history = useHistory()

  function shortenMsgs(text) {
    if(text.length > 70) {
      return text.substring(0,70) + "..."
    }
    return text
  }

  return (
    <div className="updatescard" onClick={() => history.push(url)}>
      <div>
        <div className="iconcontainer" style={{background: color}}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="infocont">
        <h5>{title}</h5>
        <p>{shortenMsgs(descript)}</p>
        <small>{convertDate(date.toDate())}</small>
      </div>
    </div>
  )
}