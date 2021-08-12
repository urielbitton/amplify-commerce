import { db } from "./Fire"
import { countries } from "./Lists"

export function sizeConverter(size) {
  if(size==='XS') return 'Extra Small'
  if(size==='S') return 'Small'
  if(size==='M') return 'Medium'
  if(size==='L') return 'Large'
  if(size==='XL') return 'Extra Large'
}

export function colorConverter(color) {
  if(color==='#222') return 'Black'
  if(color==='#ff174d') return 'Red'
  if(color==='#47d400') return 'Green'
  if(color==='#00a2ff') return 'Blue'
  if(color==='#ff9100') return 'Orange'
  if(color==='#ffea05') return 'Yellow'
  if(color==='#edb5ff') return 'Pink'
  if(color==='#b5b5b5') return 'Gray'
}
 
export function convertProvinceCode(provinceChoices, province) {
  return provinceChoices?.find(x => x.name.toLowerCase()===province?.toLowerCase() || x.isoCode===province)?.isoCode
}

export function convertCountryCode(country) {
  return countries?.find(x => x.name.toLowerCase()===country?.toLowerCase())?.code 
}

export function convertTime(time) { 
  time = time.toString().split(' ').slice(4,7)[0]
  time = time.split(':')
  let hours = Number(time[0])
  let minutes = Number(time[1])
  let timeValue
  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours
  } else if (hours > 12) {
    timeValue = "" + (hours - 12)
  } else if (hours === 0) {
    timeValue = "12"
  }
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes
  timeValue += (hours >= 12) ? " PM" : " AM"
  return timeValue
}

const date = new Date() 
export const nowDate = `${date.getFullYear()}-${date.getMonth()<10?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+(date.getDate()):(date.getDate())}`
export const nowDateTime = `${date.getFullYear()}-${date.getMonth()<10?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+(date.getDate()):(date.getDate())}T${date.getHours()<10?"0"+date.getHours():date.getHours()}:${date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()}`

export function convertDate(date, withTime) {
  return `${date?.toString().split(' ')[1]} ${date?.toString().split(' ')[2]} ${date?.toString().split(' ')[3]} ${withTime?date?.toString().split(' ')[4]:""}`
}

export function msToHours(ms) {
  return (ms / (60*60*1000))
}
export function getHoursAgo(date) { 
  return msToHours(Date.now()) - msToHours(date)
}
export function msToDays(ms) {
  return (ms / (60*60*24*1000))
}
export function getDaysAgo(date) {
  return Math.round(msToDays(Date.now()) - msToDays(date))
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function switchTimestamp(date) {
  if(getHoursAgo(date?.toDate()) > 23) {
    return convertDate(date?.toDate())
  }
  else if(getHoursAgo(date?.toDate()) > 0.0166667){
    return convertTime(date?.toDate())
  }
  return 'Just now'
}

export function updateProductByStyle(sizesArr, size, color, units) {
  const sizeIndex = sizesArr.indexOf(sizesArr.find(x => x.name === size))
  const colorIndex = sizesArr[sizeIndex].colors.indexOf(sizesArr[sizeIndex].colors.find(x => x.name === color))
  sizesArr[sizeIndex].colors[colorIndex].stock -= units 
  sizesArr[sizeIndex].colors[colorIndex].qtySold += units
  sizesArr[sizeIndex].colors[colorIndex].dateSoldLast = new Date()
}
 
export function dbUpdateProductStyle(prodData, prodSizes) {
  prodData.forEach((el,i) => {
    db.collection('products').doc(el.id).update({
      sizes: prodSizes[i]
    })
  })
}

/* collections */
export function getCustomerArrById(allCustomers, id) {
  return allCustomers?.find(x => x.id === id)
}

export function getUserArrById(allUsers, id) {
  return allUsers?.find(x => x.userid === id)
}

export function getOrderArrById(allOrders, id) {
  return allOrders?.find(x => x.orderid === id)
}

export function getOrdersById(userid, setOrders) {
  return db.collection('orders').where('customer.id','==',userid).onSnapshot(snap => {
    let ordersArr = []
    snap.forEach(el => {
      ordersArr.push(el.data())
    })
    setOrders(ordersArr)
  })
}

export function getReviewsById(userid, setReviews) {
  return db.collection('reviews').where('reviewerId','==',userid).onSnapshot(snap => {
    let revsArr = []
    snap.forEach(el => {
      revsArr.push(el.data())
    })
    setReviews(revsArr)
  })
}

export function getReviewsArrById(allReviews, reviewId) {
  return allReviews?.find(x => x.id === reviewId)
}

export function getTransactionsById(userid, setTrans) {
  return db.collection('transactions').where('customerId','==',userid).onSnapshot(snap => {
    let transArr = []
    snap.forEach(el => {
      transArr.push(el.data())
    })
    setTrans(transArr)
  })
}
