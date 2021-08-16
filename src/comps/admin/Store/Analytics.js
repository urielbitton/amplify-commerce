import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import Dashbox from '../Home/Dashbox'
import AdminBtn from '../common/AdminBtn'
import './styles/Analytics.css'
import { ApexChart } from '../../common/Charts'
import DashCont from '../Home/DashCont'
import { AppInput, AppSelect } from '../../common/AppInputs'
import {sizeConverter, colorConverter, convertDate} from '../../common/UtilityFuncs'
import AppAccordion from '../../site/common/AppAccordion'
import PageTitle from '../common/PageTitle'
import { getProductsSoldByYear, getStatsYearsList, getTotalSalesByYear } from '../../common/services/statsServices'
import { setDB } from '../../common/services/CrudDb'
import { db } from '../../common/Fire'
import { initSalesMonthsObj } from './arrays/arrays'

export default function Analytics() {

  const {allOrders, allProducts, allCoupons, allShipping, allCustomers, setNotifs, showAnaTips, storeSettings, 
    setShowAnaTips, currencyFormat, statsYear, setStatsYear} = useContext(StoreContext)
  const currentYear = new Date().getFullYear()
  const [totalSales, setTotalSales] = useState([])
  const [productsSold, setProductsSold] = useState([])
  const [yearsList, setYearsList] = useState([])
  const [showAddYear, setShowAddYear] = useState(false)
  const [newYear, setNewYear] = useState(+currentYear)
  const salescategories = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const totalsalesnumbers = totalSales?.map(el => el.value)
  const netprofitnumbers = totalSales?.map(el => el.value - (el.value * 0.15))
  const lossnumbers = [0,0,0,0,0,0,0,0,0,0,0,0]
  const totalProductsSold = productsSold?.reduce((a,b) => a + b.value,0)
  const allTotalSales = totalSales?.reduce((a,b) => a + b.value,0)
  const allTotalProfits = allTotalSales - (allTotalSales * 0.15)
  const thisMonth = new Date().getUTCMonth()
  const lastMonth = ((thisMonth - 2) % 12 + 1)
  const thisMonthProdSold = productsSold&&productsSold[thisMonth]?.value
  const lastMonthProdSold = productsSold&&productsSold[lastMonth]?.value
  const thisMonthSales = totalSales[thisMonth]?.value
  const lastMonthSales = totalSales[lastMonth]?.value
  const thisMonthProfit = totalSales[thisMonth]?.value + (totalSales[thisMonth]?.value * storeSettings?.taxes.adminTaxRate)
  const lastMonthProfit = totalSales[lastMonth]?.value + (totalSales[lastMonth]?.value * storeSettings?.taxes.adminTaxRate)
  const earningsHeaders = ['Product','Name','Style','Unit Price','Earnings','Date Sold Last','Qty Sold']
  const lowStockHeaders = ['Product','Name','Stock Watch','Earnings','Unit Price']
  const filterQtySold = (x,qty) => x.sizes.find(x => x.colors.find(x => x.qtySold > qty))
  const [highEarningsLimit, setHighEarningsLimit] = useState(7)
  const reduceLowStock = allProducts.reduce((a,b) => a + b.sizes.reduce((a,b) => a + (b.colors.reduce((a,b) => a + (b.stock < 5)?1:0)),0), 0)
  const monthCategories = ['January','February','March','April','May','June','July','August','September','October','November','December']    
  const tableFilterOpts = [{name: '3',value: 3},{name: '5',value: 5},{name: '10',value: 10},{name: '15',value: 15},{name: '20',value: 20}]
  const batch = db.batch()

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
    return <Dashbox el={el} compareTitle="This Month"/>
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
          {el.sizes?.filter(x => x.colors.find(x => x.stock < 5)).map(size => { 
            return <AppAccordion title="Product Styles" subtitle={`${size.colors.filter(x => x.stock < 5).length} products`}>
              <div className="styleheader">
                <h5>Name</h5><h5>Stock</h5><h5>Last Sold</h5>
              </div>
              {size.colors?.filter(x => x.stock < 5).map(color => {
                return <div className="stylerow">
                  <h5>{size.name}, {colorConverter(color.name)}</h5>
                  <h5 className={color.stock<1?"nostock":""}>{color.stock} left</h5>
                  <h5>{convertDate(color.dateSoldLast.toDate())}</h5>
                </div>
              })}
            </AppAccordion>
          })}
        <h5>{currencyFormat.format(el.price)}</h5>
        <h5>{currencyFormat.format(el.price * filterQtySold(el,0).colors.find(x => x.qtySold > 0).qtySold)}</h5>
    </div>
  })

  const yearsListOpts = yearsList?.map(el => {
    return {name: el, value: el}
  })

  function createNewChart() {
    setNotifs(prev => [...prev, {
      id: Date.now(),
      title: 'Coming Soon', 
      icon: 'fal fa-stopwatch',
      text: `Creating custom analytics charts features are coming soon.`,
      time: 5000
    }]) 
  }

  function addNewYear(autoAdd) {
    if((+newYear > currentYear || autoAdd) && (yearsList.length && !yearsList.includes(newYear))) {
      initSalesMonthsObj.forEach(doc => {
        const docRef = db.collection('totalSales').doc(newYear.toString()).collection('sales').doc(doc.name)
        batch.set(docRef, {month:doc.month,value:doc.value})
      }) 
      initSalesMonthsObj.forEach(doc => {
        const docRef = db.collection('productsSold').doc(newYear.toString()).collection('sales').doc(doc.name)
        batch.set(docRef, {month:doc.month,value:doc.value})
      }) 
      batch.commit().then(() => {
        setDB('totalSales', newYear.toString(), {year:+newYear, isActive:true})
        setDB('productsSold', newYear.toString(), {year:+newYear, isActive:true})
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'New Year Added', 
          icon: 'fal fa-plus',
          text: `A new analytics/stats year has been successfully added to your store.`,
          time: 5000
        }]) 
        setShowAddYear(false)
        setNewYear(+currentYear)
      })
    } 
    else if(yearsList.includes(newYear) && !autoAdd) {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning', 
        icon: 'fal fa-exclamation',
        color: 'var(--orange)',
        text: `The stats year you are trying to add already exists. Please add another year.`,
        time: 5000
      }])
    }
  }

  useEffect(() => {
    showAnaTips&&false&&setNotifs(prev => [...prev, {
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

  useEffect(() => {
    getTotalSalesByYear(statsYear, setTotalSales)
    getProductsSoldByYear(statsYear, setProductsSold)
    getStatsYearsList(setYearsList) 
  },[statsYear])

  useEffect(() => {
    return () => setStatsYear(new Date().getFullYear())
  },[])

  useEffect(() => {
    addNewYear(true)
  },[currentYear, yearsList]) 

  return (
    <div className="analyticspage dashboardpage">
      <PageTitle title="Analytics"/>
      <div className="pagetitle">
        <h4>
          Analytics 
          <i className="far fa-info-circle"></i>
          <span className="tooltip">Analytics for year 2021</span>
        </h4>
        <div className="btnsdiv">
          <AppSelect title="Year" options={[...yearsListOpts]} onChange={(e) => setStatsYear(e.target.value)} value={statsYear} namebased />
          <AdminBtn title="New Year" icon="fal fa-plus" solid clickEvent onClick={() => setShowAddYear(true)}/>
          <AdminBtn title="Create Chart" solid icon="fal fa-chart-area" clickEvent onClick={() => createNewChart()} />
        </div>
      </div>
      <div className="dashboxcont">
        {dashboxrow}
      </div>
      <div className="dashboxcont">
        {dashboxrow2}
      </div>
      <div className="analyticsgrid">
      <DashCont className="saleschart" title="Sales Summary">
        <div className="chartcont">
          <ApexChart 
            type="area" 
            dataArray={[
              {name: 'Total Sales',data: totalsalesnumbers},
              {name: 'Net Profit',data: netprofitnumbers},
              {name: 'Losses',data: lossnumbers},
            ]}
            series={salescategories}
            height={340} 
            legendAlign="right"
          />
        </div>
        </DashCont>
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
            <h5><span>{reduceLowStock}</span> Low Stock Products</h5>
          </div>
        </DashCont>
      </div>
      <div className={`addercover ${showAddYear?"show":""}`}> 
        <div className="addercont">
          <h4>Add New Year</h4>
          <small>Add a new analytics/stats year </small>
          <AppInput placeholder="Enter a year number" type="number" onChange={(e) => setNewYear(e.target.value)} value={newYear+1} descriptText="Enter a year in the future only."/>
          <small>Note: once the year you have set comes into effect, your store stats will automatically be saved for that selected year.</small>
          <div className="actionbtn">
          <AdminBtn title="Add Year" disabled={+newYear <= currentYear} solid clickEvent onClick={() => addNewYear(false)}/>
          <AdminBtn title="Cancel" clickEvent onClick={() => setShowAddYear(false)}/>
          </div>
        </div>
      </div>
    </div>
  )
}