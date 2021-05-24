import React, { useEffect, useState } from 'react'
import './styles/OrderProgress.css'

export default function OrderProgress(props) {
  
  const {order, dateTitles=false, tubeHeight=20, iconsize=16} = props
  const [progLevel, setProgLevel] = useState(0)
  const openDate = order?.updates.findIndex(x => x.status==='open')
  const processDate = order?.updates.findIndex(x => x.status==='processing')
  const shipDate = order?.updates.findIndex(x => x.status==='shipped')
  const delivDate = order?.updates.findIndex(x => x.status==='delivered')

  function convertLevel(level) {
    switch(level) {
      case 'open': return 18;
      case 'processing': return 43;
      case 'shipped': return 68;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  }

  const levels = [
    {name: 'Open', level: 18, date: order?.updates[openDate]?.date},
    {name: 'Processing', level: 43, date: order?.updates[processDate]?.date},
    {name: 'Shipped', level: 68, date: order?.updates[shipDate]?.date},
    {name: 'Delivered', level: 100, date: order?.updates[delivDate]?.date},
  ]
  const subtitlesrow = levels.map(({name,level,date}) => {
    return <small key={name}>
      {name}
      {
        dateTitles&&
        <span>{date.toDate().toString().split(' ')[1]}</span>
      }
    </small>
  })
  const checksrow = levels.map(({name,level},i) => {
    return <i 
      key={i} 
      className={`fal fa-check-circle ${level<=progLevel?"full":""}`}
      style={{fontSize:iconsize}}
    ></i>
  })

  useEffect(() => {
    setProgLevel(convertLevel(order?.orderStatus))
  },[order]) 

  return (
    <div className="orderprogcont">
      <div className="tubecont" style={{height:tubeHeight}}>
        <div className="progress" style={{width:`${progLevel}%`}}></div>
        <div className="checkscont">
          {checksrow}
        </div>
      </div>
      <div className="subtitlescont">
        {subtitlesrow}
      </div>
    </div>
  )
}