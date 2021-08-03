import React, { useContext } from 'react'
import Dashbox from './Dashbox'
import DashCont from './DashCont'
import './styles/Dashboard.css'
import {ApexChart, ApexChartPie} from '../../common/Charts'
import { StoreContext } from '../../common/StoreContext'
import {colorConverter, sizeConverter} from '../../common/UtilityFuncs'
import {AppSelect} from '../../common/AppInputs'
import refProd from '../../common/referProduct'
import {convertDate, getDaysAgo} from '../../common/UtilityFuncs'
import PageTitle from '../common/PageTitle'

export default function Dashboard() { 

  const {allOrders, allProducts, currencyFormat, allStats, highSellersLimit, setHighSellersLimit, 
    recentSellersLimit, setRecentSellersLimit, recentOrdersLimit, setRecentOrdersLimit, storeSettings
  } = useContext(StoreContext)
  const {productsSold, totalSales} = allStats
  const salescategories = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const totalsalesnumbers = totalSales?.map(el => el.value)
  const netprofitnumbers = totalSales?.map(el => el.value - (el.value * 0.15))
  const lossnumbers = [70,75,410,230,9,69,139,65,69,20,5,0]
  const orderstats = [45,65,14,3,5]
  const tableheaders = ['Product','Name','Style','Unit Price','Qty Sold','Date Sold Last','Earnings']
  const ordersheaders = ['Order Number','Products','Order Date','Order Total','Order Status']
  const filterQtySold = (x,qty) => x.sizes.find(x => x.colors.find(x => x.qtySold > qty))
  const topproducts = allProducts?.filter(x => x.sizes.find(x => x.colors.find(x => x.qtySold > 6)))
  const recentproducts = allProducts?.filter(x => getDaysAgo(filterQtySold(x,0)?.colors.find(x => x.qtySold > 0).dateSoldLast.toDate()) <= 30)
  const totalProductsSold = productsSold?.reduce((a,b) => a + b.value,0)
  const allTotalSales = totalSales?.reduce((a,b) => a + b.value,0)
  const allTotalProfits = allTotalSales - (allTotalSales * storeSettings?.adminTaxRate)
  const thisMonth = new Date().getUTCMonth() + 1
  const lastMonth = ((thisMonth - 2) % 12 + 1)
  const thisMonthProdSold = productsSold&&productsSold[thisMonth-1]?.value
  const lastMonthProdSold = productsSold&&productsSold[lastMonth-1]?.value
  const thisMonthSales = totalSales[thisMonth-1].value
  const lastMonthSales = totalSales[lastMonth-1].value
  const thisMonthProfit = totalSales[thisMonth-1].value + (totalSales[thisMonth-1].value * 0.15)
  const lastMonthProfit = totalSales[lastMonth-1].value + (totalSales[lastMonth-1].value * 0.15)
  const tableFilterOpts = [{name: '3',value: 3},{name: '5',value: 5},{name: '10',value: 10},{name: '15',value: 15},{name: '20',value: 20}]
  const activeOrders = allOrders.reduce((a,b) => a + (b.updates[b.updates.length-1].status!=='Delivered')?1:0, 0)
 
  const dashboxarr = [ 
    {title: 'Products Sold', icon: 'far fa-box-open', total: totalProductsSold, thismonth: thisMonthProdSold, lastmonth: lastMonthProdSold, format: 'number', compare: true},
    {title: 'Total Sales', icon: 'far fa-chart-line', total: allTotalSales, thismonth: thisMonthSales, lastmonth: lastMonthSales, format: 'currency', compare: true},
    {title: 'Net Profit', icon: 'far fa-dollar-sign', total: allTotalProfits, thismonth: thisMonthProfit, lastmonth: lastMonthProfit, format: 'currency', compare: true},
    {title: 'Active Orders', icon: 'far fa-print', total: activeOrders, thismonth: 0, lastmonth: 0, format: 'number', compare: true},
  ]

  const dashboxrow = dashboxarr?.map(el => {
    return <Dashbox el={el} compareTitle="This Month" />
  }) 
  const headersrows = tableheaders?.map(el => {
    return <h5>{el}</h5>
  })
  const orderheadersrow = ordersheaders?.map(el => {
    return <h5>{el}</h5>
  })
  const highsellers = allProducts
  ?.filter(x => x.sizes.find(x => x.colors.find(x => x.qtySold > 6)))
  .slice(0,highSellersLimit)
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
      <h5>{filterQtySold(el,6).colors.find(x => x.qtySold > 6).qtySold}</h5>
      <h5>{convertDate(filterQtySold(el,6).colors.find(x => x.qtySold > 6).dateSoldLast.toDate())}</h5>
      <h5>{currencyFormat.format(el.price * filterQtySold(el,6).colors.find(x => x.qtySold > 6).qtySold)}</h5>
    </div>
  })
  const recentsellers = allProducts
  ?.filter(x => getDaysAgo(filterQtySold(x,0)?.colors.find(x => x.qtySold > 0).dateSoldLast.toDate()) <= 30) 
  .slice(0,recentSellersLimit)
  .map(el => {
    return <div className="proditem">
      <div className="imgcell"><img src={el.imgs[0]} alt=""/></div>
      <h5>{el.name}</h5>
      <h5 className="labels">
        <div>
          <span>Size:</span> <small>{sizeConverter(filterQtySold(el,0)?.name)}</small><br/>
        </div>
        <div>
          <span>Color:</span> <small>{colorConverter(filterQtySold(el,0)?.colors.find(x => x.qtySold > 0).name)}</small>
        </div>
      </h5>
      <h5>{currencyFormat.format(el.price)}</h5> 
      <h5>{filterQtySold(el,0)?.colors.find(x => x.qtySold > 0).qtySold}</h5>
      <h5>{convertDate(filterQtySold(el,0)?.colors.find(x => x.qtySold > 0).dateSoldLast.toDate())}</h5>
      <h5>{currencyFormat.format(el.price * filterQtySold(el,0)?.colors.find(x => x.qtySold > 0).qtySold)}</h5>
    </div>
  })
  const recentorders = allOrders
  ?.filter(x => getDaysAgo(x.orderDateCreated.toDate()) <= 31)
  .slice(0,5)
  .map(el => { 
    return <div className="proditem">
      <h5>#{el.orderNumber}</h5>
      <h5>{refProd(allProducts, el.products[0].id).name} + {el.products.length-1}</h5> 
      <h5>{convertDate(el.orderDateCreated.toDate())}</h5>
      <h5>{currencyFormat.format(el.orderTotal)}</h5>
      <h5 className="ordstatus"><span>{el.updates[el.updates.length-1].status}</span></h5>
    </div>  
  })

  
 
  return ( 
    <div className="dashboardpage">
      <PageTitle title="Dashboard"/>
      <div className="dashboxcont">
        {dashboxrow}
      </div>
      
      <div className="salesgrid">
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
        <DashCont className="orderschart" title="Orders Summary">
        <div className="chartcont piecont">
          <ApexChartPie 
            type="pie" 
            series={orderstats}
            labels={['Received','Processing','Shipped','Delivered','Delayed']}
            legendAlign="left"
          />
          <h6>Total Orders: {allOrders?.length}</h6> 
        </div>
        </DashCont>
      </div>
      <DashCont 
        className="dashtable producttable" 
        title="Highest Selling Products" 
        filter={<AppSelect title="Products" options={tableFilterOpts} onChange={(e) => setHighSellersLimit(e.target.value)} value={highSellersLimit}/>}
      > 
        <div className="header">
          {headersrows}
        </div>
        <div className="content">
          {highsellers}
        </div>
        <div className="foot">
          <h5><span>{highsellers?.length}</span> product{highsellers?.length>1?"s":""}</h5>
          <h5>
            <span>{topproducts?.slice(0,highSellersLimit).reduce((a,b) => a + filterQtySold(b,0)?.colors.find(x => x.qtySold > 6).qtySold,0)}</span> 
            &nbsp;Quantities Sold
          </h5>
          <h5>
            <span>{currencyFormat.format(topproducts?.slice(0,highSellersLimit).reduce((a,b) => a + (filterQtySold(b,0)?.colors.find(x => x.qtySold > 6).qtySold * b.price),0))}</span>
            &nbsp;Total Earnings
          </h5>
        </div>
      </DashCont>
      <DashCont 
        className="dashtable producttable" 
        title="Recently Sold Products"
        filter={<AppSelect title="Products" options={tableFilterOpts} onChange={(e) => setRecentSellersLimit(e.target.value)} value={recentSellersLimit}/>}
      >
        <div className="header">
          {headersrows}
        </div>
        <div className="content">
          {recentsellers}
        </div>
        <div className="foot">
          <h5><span>{recentsellers?.length}</span> product{recentsellers?.length>1?"s":""}</h5>
          <h5>
            <span>{recentproducts?.slice(0,recentSellersLimit).reduce((a,b) => a + filterQtySold(b,0)?.colors.find(x => x.qtySold > 0).qtySold,0)}</span> 
            &nbsp;Quantities Sold
          </h5>
          <h5>
            <span>{currencyFormat.format(recentproducts?.slice(0,recentSellersLimit).reduce((a,b) => a + (filterQtySold(b,0)?.colors.find(x => x.qtySold > 0).qtySold * b.price),0))}</span>
            &nbsp;Total Earnings
          </h5>
        </div>
      </DashCont>
      <DashCont 
        className="dashtable producttable orderstable"
        title="Recent Orders"
        filter={<AppSelect title="Products" options={tableFilterOpts} onChange={(e) => setRecentOrdersLimit(e.target.value)} value={recentOrdersLimit}/>}
        >
          <div className="header">
          {orderheadersrow}
          </div>
          <div className="content">
            {recentorders}
          </div>
          <div className="foot">
            <h5><span>{allOrders.length}</span> Order{allOrders.length>1?"s":""}</h5>
            <h5><span>{currencyFormat.format(allOrders.reduce((a,b) => a + b.orderTotal,0))}</span> Orders Total</h5>
            <h5><span>{allOrders.reduce((a,b) => a + b.products.length,0)}</span> Products Ordered</h5>
          </div>
      </DashCont>
      <DashCont title="Site Updates" className="updatesbox">

      </DashCont>
    </div>
  )
}