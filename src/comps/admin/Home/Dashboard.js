import React, { useContext } from 'react'
import Dashbox from './Dashbox'
import DashCont from './DashCont'
import './styles/Dashboard.css'
import {ApexChart, ApexChartPie} from '../../common/Charts'
import { StoreContext } from '../../common/StoreContext'
import {colorConverter, sizeConverter} from '../../common/UtilityFuncs'
import '../../site/common/styles/ProductTable.css'

export default function Dashboard() {

  const {allOrders, allProducts, currencyFormat} = useContext(StoreContext)
  const salescategories = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const totalsalesnumbers = [670,900,1200,880,999,899,1399,875,905,1099,978,1545]
  const netprofitnumbers = [570,875,1100,830,929,769,1139,765,569,1020,865,900]
  const lossnumbers = [70,75,10,30,9,69,139,65,69,20,5,0]
  const ordernumbers = [45,65,14]
  const tableheaders = ['Product','Name','Style','Unit Price','Qty Sold','Date Sold Last','Earnings']
  const filterQtySold = (x, qty) => x.sizes.find(x => x.colors.find(x => x.qtySold > qty))
  const topproducts = allProducts?.filter(x => x.sizes.find(x => x.colors.find(x => x.qtySold > 6)))
  const recentproducts = allProducts?.filter(x => getDaysAgo(filterQtySold(x,0)?.colors.find(x => x.qtySold > 0).dateSold.toDate()) <= 30)
  const totalprodsold = allProducts?.reduce((a,b) => a + filterQtySold(b,0)?.colors.find(x => x.qtySold > 0).qtySold,0)
  const dashboxarr = [
    {title: 'Products Sold', icon: 'far fa-box-open', number: 21, newNum: 26, total: totalprodsold, format: 'number'},
    {title: 'Total Sales', icon: 'far fa-chart-line', number: 3900, newNum: 4100, format: 'currency'},
    {title: 'Net Profit', icon: 'far fa-dollar-sign', number: 3250, newNum: 3100, format: 'currency'},
    {title: 'Total Orders', icon: 'far fa-print', number: allOrders.length, newNum: allOrders.length, format: 'number'},
  ]

  const dashboxrow = dashboxarr?.map(el => {
    return <Dashbox el={el} compareTitle="This Month" />
  }) 
  const headersrows = tableheaders?.map(el => {
    return <h5>{el}</h5>
  })
  const highsellers = allProducts
  ?.filter(x => x.sizes.find(x => x.colors.find(x => x.qtySold > 6)))
  .slice(0,10)
  .map(el => {
    return <div className="proditem">
      <img src={el.imgs[0]} alt=""/>
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
      <h5>{convertDate(filterQtySold(el,6).colors.find(x => x.qtySold > 6).dateSold)}</h5>
      <h5>{currencyFormat.format(el.price * filterQtySold(el,6).colors.find(x => x.qtySold > 6).qtySold)}</h5>
    </div>
  })
  const recentsellers = allProducts
  ?.filter(x => getDaysAgo(filterQtySold(x,0)?.colors.find(x => x.qtySold > 0).dateSold.toDate()) <= 30) 
  .slice(0,10)
  .map(el => {
    return <div className="proditem">
      <img src={el.imgs[0]} alt=""/> 
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
      <h5>{convertDate(filterQtySold(el,0)?.colors.find(x => x.qtySold > 0).dateSold)}</h5>
      <h5>{currencyFormat.format(el.price * filterQtySold(el,0)?.colors.find(x => x.qtySold > 0).qtySold)}</h5>
    </div>
  })

  function convertDate(date) {
    return `
      ${date?.toDate().toString().split(' ')[1]} 
      ${date?.toDate().toString().split(' ')[2]} 
      ${date?.toDate().toString().split(' ')[3]}`
  }
  function msToDays(ms) {
    return (ms / (60*60*24*1000))
  }
  function getDaysAgo(date) {
    return Math.round(msToDays(new Date().getTime()) - msToDays(date))
  }
 
  return ( 
    <div className="dashboardpage">
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
            series={ordernumbers}
            labels={['Active','Processed','Cancelled']}
            legendAlign="left"
          />
          <h6>Total Orders: {allOrders?.length}</h6> 
        </div>
        </DashCont>
      </div>
      <DashCont className="dashtable producttable" title="Highest Selling Products">
        <div className="header">
          {headersrows}
        </div>
        <div className="content">
          {highsellers}
        </div>
        <div className="foot">
          <h5><span>{highsellers.length}</span> products</h5>
          <h5>
            <span>{topproducts.reduce((a,b) => a + filterQtySold(b,0)?.colors.find(x => x.qtySold > 0).qtySold,0)}</span> 
            &nbsp;Quantities Sold
          </h5>
          <h5>
            <span>{currencyFormat.format(topproducts.reduce((a,b) => a + (filterQtySold(b,0)?.colors.find(x => x.qtySold > 0).qtySold * b.price),0))}</span>
            &nbsp;Total Earnings
          </h5>
        </div>
      </DashCont>
      <DashCont className="dashtable producttable" title="Recenty Sold Products">
        <div className="header">
          {headersrows}
        </div>
        <div className="content">
          {recentsellers}
        </div>
        <div className="foot">
          <h5><span>{recentsellers.length}</span> products</h5>
          <h5>
            <span>{recentproducts.reduce((a,b) => a + filterQtySold(b,0)?.colors.find(x => x.qtySold > 0).qtySold,0)}</span> 
            &nbsp;Quantities Sold
          </h5>
          <h5>
            <span>{currencyFormat.format(recentproducts.reduce((a,b) => a + (filterQtySold(b,0)?.colors.find(x => x.qtySold > 0).qtySold * b.price),0))}</span>
            &nbsp;Total Earnings
          </h5>
        </div>
      </DashCont>
    </div>
  )
}