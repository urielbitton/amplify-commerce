import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import Dashbox from '../Home/Dashbox'
import AdminBtn from '../common/AdminBtn'
import './styles/Analytics.css'
import { ApexChart } from '../../common/Charts'
import DashCont from '../Home/DashCont'
import { AppSelect } from '../../common/AppInputs'
import {sizeConverter, colorConverter, convertDate} from '../../common/UtilityFuncs'
import AppAccordion from '../../site/common/AppAccordion'

export default function Analytics() {

  const {allOrders, allProducts, allCoupons, allShipping, allCustomers, allStats, setNotifs,
    showAnaTips, setShowAnaTips, currencyFormat} = useContext(StoreContext)
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
  const earningsHeaders = ['Product','Name','Style','Unit Price','Earnings','Date Sold Last','Qty Sold']
  const lowStockHeaders = ['Product','Name','Stock Watch','Earnings','Unit Price']
  const filterQtySold = (x,qty) => x.sizes.find(x => x.colors.find(x => x.qtySold > qty))
  const [highEarningsLimit, setHighEarningsLimit] = useState(7)

  const monthCategories = ['January','February','March','April','May','June','July','August','September','October','November','December']    
  const tableFilterOpts = [{name: '3',value: 3},{name: '5',value: 5},{name: '10',value: 10},{name: '15',value: 15},{name: '20',value: 20}]

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
  const earningsHeadersRow = earningsHeaders?.map(el => {
    return <h5>{el}</h5>
  })
  const lowStockHeadersRow = lowStockHeaders?.map(el => {
    return <h5>{el}</h5>
  })

  const highEarnings = allProducts
  ?.filter(x => x.sizes.find(x => x.colors.find(x => x.qtySold > 6)))
  .slice(0,highEarningsLimit)
  .map(el => {
    return <div className="proditem">
      <div className="imgcell"><img src={el.imgs[0]} alt=""/></div>
      <h5>{el.name}</h5>
      <h5 className="labels">
        <div>
          <span>Size:</span> <small>{sizeConverter(filterQtySold(el,6).name)}</small><br/>
        </div>
        <div>
          <span>Color:</span> <small>{colorConverter(filterQtySold(el,6).colors.find(x => x.qtySold > 6).name)}</small>
        </div>
      </h5>
      <h5>{currencyFormat.format(el.price)}</h5> 
      <h5>{currencyFormat.format(el.price * filterQtySold(el,6).colors.find(x => x.qtySold > 6).qtySold)}</h5>
      <h5>{convertDate(filterQtySold(el,6).colors.find(x => x.qtySold > 6).dateSoldLast.toDate())}</h5>
      <h5>{filterQtySold(el,6).colors.find(x => x.qtySold > 6).qtySold}</h5>
    </div>
  })
  const lowStockWatch = allProducts
  ?.filter(x => x.sizes.find(x => x.colors.find(x => x.stock < 5)))
  .map(el => {
    return <div className="proditem">
        <div className="imgcell"><img src={el.imgs[0]} alt=""/></div>
        <h5>{el.name}</h5>
        <AppAccordion title="Product Styles">
          {el.sizes?.filter(x => x.colors.find(x => x.stock < 5)).map(el => { 
            return el.colors?.filter(x => x.stock < 5).map(el => {
              return <div className="labels">
                <h5>{el.name}</h5>
                <h5>{el.stock}</h5>
                <h5>{el.qtySold}</h5>
                <h5>{convertDate(el.dateSoldLast.toDate())}</h5>
              </div>
            })
          })}
        </AppAccordion>
        <h5>{currencyFormat.format(el.price * filterQtySold(el,0).colors.find(x => x.qtySold > 0).qtySold)}</h5>
        <h5>{currencyFormat.format(el.price)}</h5>
    </div>
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
      <div className="analyticsgrid">
        <DashCont className="saleschart" title="Customer Visits">
          <div className="chartcont">
            <ApexChart 
              type="line" 
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
                {name: 'Open Orders',data: [2,56,12,34,21,33,45,12,3,78,9,10]},
                {name: 'Delivered Orders',data: [1,16,12,25,11,30,42,2,3,58,8,1]}
              ]}
              series={monthCategories}
              height={340} 
              legendAlign="right"
            />
          </div>
        </DashCont>
        <DashCont 
          className="dashtable producttable" 
          title="Highest Earning Products" 
          filter={<AppSelect title="Products" options={tableFilterOpts} onChange={(e) => setHighEarningsLimit(e.target.value)} value={highEarningsLimit} />}
          > 
          <div className="header">
            {earningsHeadersRow}
          </div>
          <div className="content">
            {highEarnings}
          </div>
          <div className="foot">
            <h5><span>{highEarnings?.length}</span> product{highEarnings?.length>1?"s":""}</h5>
          </div>
        </DashCont>
        <DashCont 
          className="dashtable producttable lowstocktable" 
          title="Low Stock Watch" 
          > 
          <div className="header">
            {lowStockHeadersRow}
          </div>
          <div className="content">
            {lowStockWatch}
          </div>
          <div className="foot">
            <h5><span>{lowStockWatch?.length}</span> product{lowStockWatch?.length>1?"s":""}</h5>
          </div>
        </DashCont>
      </div>
    </div>
  )
}