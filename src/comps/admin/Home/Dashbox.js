import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import DashCont from './DashCont'

export default function Dashbox(props) {

  const {currencyFormat, numberFormat, percentFormat} = useContext(StoreContext)
  const {total, title, icon, thismonth, lastmonth, format, compare} = props.el
  const {compareTitle} = props 

  function percentChange(before, now) {
    const top = +now - +before
    const bottom = Math.abs(+before)
    return top / bottom
  } 

  return (
    <DashCont className="dashbox">
      <div>
        <div className="iconcont">
          <i className={icon}></i>
        </div>
        <div 
          className="advancedstats"
          title={`Last Month: ${format==='number'?numberFormat.format(lastmonth):currencyFormat.format(lastmonth)}\nIncrease: ${percentFormat.format(percentChange(lastmonth, thismonth))}`}
        >
        <h6 className={`${thismonth>=lastmonth?"up":"down"} ${compare?"":"hide"}`}>
          <i className={`far fa-arrow-${thismonth>=lastmonth?"up":"down"}`}></i>&nbsp;
          {format==='number'?numberFormat.format(thismonth):currencyFormat.format(thismonth)}
        </h6>
        <small>{compareTitle}</small>
        </div>
      </div> 
      <div>
        <h1>{format==='number'?numberFormat.format(total):currencyFormat.format(total)}</h1>
        <h5>{title}</h5>
      </div>
    </DashCont>
  )
}

