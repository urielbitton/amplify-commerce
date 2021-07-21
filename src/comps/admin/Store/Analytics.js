import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../common/StoreContext'
import Dashbox from '../Home/Dashbox'
import AdminBtn from '../common/AdminBtn'
import './styles/Analytics.css'

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
  console.log(showAnaTips)
  useEffect(() => {
    showAnaTips&&setNotifs(prev => [...prev, {
      id: Date.now(),
      title: 'Tip', 
      color: 'var(--green)',
      icon: 'fal fa-lightbulb',
      text: `Click on Create Chart at the top of the page to create your own personalized stats for your store`,
      action: true,
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
      
    </div>
  )
}