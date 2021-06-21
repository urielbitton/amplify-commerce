import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import DashCont from './DashCont'

export default function Dashbox(props) {

  const {percentFormat, currencyFormat, numberFormat} = useContext(StoreContext)
  const {number, title, icon, newNum, total, format} = props.el
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
        <h6 className={newNum>=number?"up":"down"}>
          <i className={`far fa-arrow-${newNum>=number?"up":"down"}`}></i>&nbsp;
          {percentFormat.format(percentChange(number, newNum))}
        </h6>
        <small>{compareTitle}</small>
      </div> 
      <div>
        <h1>{format==='number'?numberFormat.format(number):currencyFormat.format(number)}</h1>
        <h5>{title}</h5>
        <small>Total: {total}</small>
      </div>
    </DashCont>
  )
}

