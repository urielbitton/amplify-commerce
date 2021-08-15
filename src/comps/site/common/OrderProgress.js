import React, { useContext, useEffect, useState } from 'react'
import './styles/OrderProgress.css'
import {convertDate, convertTime} from '../../common/UtilityFuncs'
import {StoreContext} from '../../common/StoreContext'

export default function OrderProgress(props) {
  
  const {showTrackCont} = useContext(StoreContext)
  const {order, dateTitles=false, tubeHeight=20, iconsize=16} = props
  const [progLevel, setProgLevel] = useState(0)
  const recieveDate = order?.updates.findIndex(x => x.status==='Received')
  const processDate = order?.updates.findIndex(x => x.status==='Processing')
  const shipDate = order?.updates.findIndex(x => x.status==='Shipped')
  const delivDate = order?.updates.findIndex(x => x.status==='Delivered')

  function convertLevel(level) {
    switch(level) {
      case 'Received': return 16;
      case 'Processing': return 42;
      case 'Shipped': return 67;
      case 'Delivered': return 100;
      case 'Delayed': return 0;
      default: return 0;
    }
  }
  
  const levels = [
    {name: 'Received', level: 16, date: order?.updates[recieveDate]?.date},
    {name: 'Processing', level: 42, date: order?.updates[processDate]?.date},
    {name: 'Shipped', level: 67, date: order?.updates[shipDate]?.date},
    {name: 'Delivered', level: 100, date: order?.updates[delivDate]?.date},
  ]
  const subtitlesrow = levels.map(({name,level,date}) => {
    return <small key={name}>
      {name}
      { dateTitles && date!==undefined&&<>
          <span> 
            {convertDate(date?.toDate())} 
          </span>
          <span>{date&&convertTime(date?.toDate())}</span>
        </>
      }
    </small>
  })
  const checksrow = levels.map(({level},i) => {
    return <i 
      key={i} 
      className={`fal fa-check-circle ${level<=progLevel?"full":""}`}
      style={{fontSize:iconsize}}
    ></i>
  })
 
  useEffect(() => {
    if(!showTrackCont) {
      setProgLevel(0)
    }
  },[showTrackCont])

  useEffect(() => {
    setProgLevel(convertLevel(order?.updates[order?.updates?.length-1]?.status))
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