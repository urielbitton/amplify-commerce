import { db } from '../Fire'
import firebase from 'firebase'

export function getTotalSalesByYear(year, setTotalSales) {
  db.collection('totalSales').doc(year.toString()).collection('sales').orderBy('month','asc')
    .onSnapshot(snap => {
      const salesArr = [] 
      snap.forEach(doc => salesArr.push(doc.data())) 
      setTotalSales(salesArr)
  })
}

export function getProductsSoldByYear(year, setProductsSold) {
  db.collection('productsSold').doc(year.toString()).collection('sales').orderBy('month','asc')
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

export function updateMonthlySales(month, year, amount) {
  return db.collection('totalSales').doc(year.toString()).collection('sales').doc(month)
  .update({
    value: firebase.firestore.FieldValue.increment(amount)
  })
}

export function updateMonthlyProductsSold(month, year, amount) {
  return db.collection('productsSold').doc(year.toString()).collection('sales').doc(month)
  .update({
    value: firebase.firestore.FieldValue.increment(amount)
  })
}