import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import DashCont from './DashCont'

export default function Dashbox(props) {

  const {currencyFormat, numberFormat} = useContext(StoreContext)
  const {total, title, icon, thismonth, lastmonth, format, compare} = props.el
  const {compareTitle} = props 

  function percentChange(v1, v2) {
    const top = Math.abs(v1 - v2)
    const bottom = (v1 + v2) / 2
    return top / bottom
  }

  return (
    <DashCont className="dashbox">
      <div>
        <div className="iconcont">
          <i className={icon}></i>
        </div>
        <h6 
          className={`${thismonth>=lastmonth?"up":"down"} ${compare?"":"hide"}`} 
          title={`Last Month: ${format==='number'?numberFormat.format(lastmonth):currencyFormat.format(lastmonth)}`}
        >
          <i className={`far fa-arrow-${thismonth>=lastmonth?"up":"down"}`}></i>&nbsp;
          {format==='number'?numberFormat.format(thismonth):currencyFormat.format(thismonth)}
        </h6>
        <small>{compareTitle}</small>
      </div> 
      <div>
        <h1>{format==='number'?numberFormat.format(total):currencyFormat.format(total)}</h1>
        <h5>{title}</h5>
      </div>
    </DashCont>
  )
}

