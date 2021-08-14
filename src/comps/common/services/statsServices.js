import { db } from '../Fire'

export function getTotalSalesByYear(year, setTotalSales) {
  db.collection('totalSales').doc(year.toString()).collection('sales').orderBy('month','desc')
    .onSnapshot(snap => {
      const salesArr = [] 
      snap.forEach(doc => salesArr.push(doc.data())) 
      setTotalSales(salesArr)
  })
}

export function getProductsSoldByYear(year, setProductsSold) {
  db.collection('productsSold').doc(year.toString()).collection('sales').orderBy('month','desc')
    .onSnapshot(snap => {
      const salesArr = [] 
      snap.forEach(doc => salesArr.push(doc.data())) 
      setProductsSold(salesArr)
  })
}

export function getStatsYearsList(setList) {
  db.collection('totalSales').get().then(doc => {
    const yearsArr = []
    doc.forEach(el => yearsArr.push(el.data().year))
    setList(yearsArr)
  })
}