import React, { useContext } from 'react'
import Dashbox from './Dashbox'
import DashCont from './DashCont'
import './styles/Dashboard.css'
import {ApexChart, ApexChartPie} from '../../common/Charts'
import { StoreContext } from '../../common/StoreContext'

export default function Dashboard() {

  const {allOrders} = useContext(StoreContext)
  const salescategories = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const dashboxarr = [
    {title: 'Products Sold', icon: 'far fa-box-open', number: 21, newNum: 26, format: 'number'},
    {title: 'Total Sales', icon: 'far fa-chart-line', number: 3900, newNum: 4100, format: 'currency'},
    {title: 'Net Profit', icon: 'far fa-dollar-sign', number: 3250, newNum: 3100, format: 'currency'},
    {title: 'Total Orders', icon: 'far fa-print', number: 149, newNum: 159, format: 'number'},
  ]
  const totalsalesnumbers = [670,900,1200,880,999,899,1399,875,905,1099,978,1545]
  const netprofitnumbers = [570,875,1100,830,929,769,1139,765,569,1020,865,900]
  const lossnumbers = [70,75,10,30,9,69,139,65,69,20,5,0]
  const ordernumbers = [45,65,14]

  const dashboxrow = dashboxarr?.map(el => {
    return <Dashbox el={el} compareTitle="This Month" />
  }) 
 
  return (
    <div className="dashboardpage">
      {dashboxrow}
      <DashCont className="saleschart" title="Sales Summary">
      <div className="chartcont">
        <ApexChart 
          type="area" 
          dataarray={[
            {name: 'Total Sales',data: totalsalesnumbers},
            {name: 'Net Profit',data: netprofitnumbers},
            {name: 'Losses',data: lossnumbers},
          ]}
          series={salescategories}
          title1="Total Sales" 
          title2="Net Profit" 
          height={340} 
          legendAlign="right"
        />
      </div>
      </DashCont>
      <DashCont className="orderschart" title="Orders Summary">
      <div className="chartcont piecont">
        <ApexChartPie 
          type="pie" 
          series={ordernumbers}
          labels={['Active','Processed','Cancelled']}
          legendAlign="left"
        />
        <h6>Total Orders: {allOrders?.length}</h6> 
      </div>
      </DashCont>
    </div>
  )
}