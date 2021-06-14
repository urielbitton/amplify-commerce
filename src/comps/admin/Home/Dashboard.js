import React, { useContext } from 'react'
import Dashbox from './Dashbox'
import './styles/Dashboard.css'
import {StoreContext} from '../../common/StoreContext'

export default function Dashboard() {
 
  const {currencyFormat, numberFormat, percentFormat} = useContext(StoreContext)

  const dashboxarr = [
    {title: 'Products Sold', icon: 'far fa-box-open', number: numberFormat.format(21), compareNum: percentFormat.format(19)},
    {title: 'Total Sales', icon: 'far fa-chart-line', number: currencyFormat.format(3900), compareNum: percentFormat.format(4100)},
    {title: 'Net Profit', icon: 'far fa-dollar-sign', number: currencyFormat.format(3250), compareNum: percentFormat.format(3100)},
    {title: 'Total Orders', icon: 'far fa-print', number: numberFormat.format(149), compareNum: percentFormat.format(119)},
  ]
  const dashboxrow = dashboxarr?.map(el => {
    return <Dashbox el={el} compareTitle="This Month" />
  }) 

  return (
    <div className="dashboardpage">
      {dashboxrow}
    </div>
  )
}