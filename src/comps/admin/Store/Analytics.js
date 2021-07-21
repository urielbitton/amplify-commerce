import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import Dashbox from '../Home/Dashbox'
import AdminBtn from '../common/AdminBtn'
import './styles/Analytics.css'
import { ApexChart } from '../../common/Charts'
import DashCont from '../Home/DashCont'

export default function Analytics() {

  const {allOrders, allProducts, allCoupons, allShipping, allCustomers, allStats, setNotifs,
    showAnaTips, setShowAnaTips} = useContext(StoreContext)
  const {productsSold, totalSales} = allStats
  const totalProductsSold = productsSold?.reduce((a,b) => a + b.value,0)
  const allTotalSales = totalSales?.reduce((a,b) => a + b.value,0)
  const allTotalProfits = allTotalSales - (allTotalSales * 0.15)
  const thisMonth = new Date().getUTCMonth() + 1
  const lastMonth = ((thisMonth - 2) % 12 + 1)
  const thisMonthProdSold = productsSold&&productsSold[thisMonth-1]?.value
  const lastMonthProdSold = productsSold&&productsSold[lastMonth-1]?.value
  const thisMonthSales = totalSales[thisMonth-1].value
  const lastMonthSales = totalSales[lastMonth-1].value
  const thisMonthProfit = totalSales[thisMonth-1].value + (totalSales[thisMonth-1].value * 0.15)
  const lastMonthProfit = totalSales[lastMonth-1].value + (totalSales[lastMonth-1].value * 0.15)

  const monthCategories = ['January','February','March','April','May','June','July','August','September','October','November','December']    

  const dashboxarr = [
    {title: 'Products Sold', icon: 'far fa-box-open', total: totalProductsSold, thismonth: thisMonthProdSold, lastmonth: lastMonthProdSold, format: 'number', compare: true},
    {title: 'Total Sales', icon: 'far fa-chart-line', total: allTotalSales, thismonth: thisMonthSales, lastmonth: lastMonthSales, format: 'currency', compare: true},
    {title: 'Net Profit', icon: 'far fa-dollar-sign', total: allTotalProfits, thismonth: thisMonthProfit, lastmonth: lastMonthProfit, format: 'currency', compare: true},
    {title: 'Total Orders', icon: 'far fa-print', total: allOrders.length, thismonth: 0, lastmonth: 0, format: 'number', compare: true},
  ]
  const dashboxarr2 = [
    {title: 'Total Products', icon: 'far fa-tshirt', total: allProducts.length, format: 'number'},
    {title: 'Total Coupons', icon: 'far fa-money-bill', total: allCoupons.length, format: 'number'},
    {title: 'Total Shipping Methods', icon: 'far fa-truck', total: allShipping.length, format: 'number'},
    {title: 'Total Customers', icon: 'far fa-user-tag', total: allCustomers.length, format: 'number'},
  ]

  const dashboxrow = dashboxarr?.map(el => {
    return <Dashbox el={el} compareTitle="This Month" />
  }) 
  const dashboxrow2 = dashboxarr2?.map(el => {
    return <Dashbox el={el} />
  }) 
  
  useEffect(() => {
    showAnaTips&&setNotifs(prev => [...prev, {
      id: Date.now(),
      title: 'Tip', 
      color: 'var(--green)',
      icon: 'fal fa-lightbulb',
      text: `Click on Create Chart at the top of the page to create your own personalized stats for your store`,
      action1: true,
      event1: () => setShowAnaTips(false),
      eventTitle1: 'Hide',
      noClose: true
    }]) 
    return () => setNotifs([])
  },[showAnaTips])

  return (
    <div className="analyticspage dashboardpage">
      <div className="pagetitle">
        <h4>Analytics</h4>
        <AdminBtn title="Create Chart" solid icon="fal fa-chart-area" clickEvent />
      </div>
      <div className="dashboxcont">
        {dashboxrow}
      </div>
      <div className="dashboxcont">
        {dashboxrow2}
      </div>
      <div className="salesgrid">
        <DashCont className="saleschart" title="Customer Visits">
          <div className="chartcont">
            <ApexChart 
              type="area" 
              dataArray={[
                {name: 'Total Customers',data: [2,56,12,34,21,33,45,12,3,78,9,10]},
                {name: 'Active Customers',data: [1,16,12,25,11,30,42,2,3,58,8,1]}
              ]}
              series={monthCategories}
              height={340} 
              legendAlign="right"
            />
          </div>
        </DashCont>
        <DashCont className="saleschart" title="Orders Stats">
          <div className="chartcont">
            <ApexChart 
              type="bar" 
              dataArray={[
                {name: 'Active Orders',data: [2,56,12,34,21,33,45,12,3,78,9,10]},
                {name: 'Delivered Orders',data: [1,16,12,25,11,30,42,2,3,58,8,1]}
              ]}
              series={monthCategories}
              height={340} 
              legendAlign="right"
            />
          </div>
        </DashCont>
      </div>
    </div>
  )
}