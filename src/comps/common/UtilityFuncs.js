export function sizeConverter(size) {
  if(size==='xs') return 'Extra Small'
  if(size==='s') return 'Small'
  if(size==='m') return 'Medium'
  if(size==='l') return 'Large'
  if(size==='xl') return 'Extra Large'
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

export function convertTime(time) { 
  time = time.split(':')
  let hours = Number(time[0])
  let minutes = Number(time[1])
  let seconds = Number(time[2])
  let timeValue
  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours
  } else if (hours > 12) {
    timeValue = "" + (hours - 12)
  } else if (hours === 0) {
    timeValue = "12"
  }
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes
  //timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds
  timeValue += (hours >= 12) ? " PM" : " AM"
  return timeValue
}

const date = new Date()

export const nowDate = `${date.getFullYear()}-${date.getMonth()<10?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+(date.getDate()):(date.getDate())}`
export const nowDateTime = `${date.getFullYear()}-${date.getMonth()<10?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+(date.getDate()):(date.getDate())}T${date.getHours()<10?"0"+date.getHours():date.getHours()}:${date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()}`

export function getCustomerById(allCustomers, id) {
  return allCustomers[allCustomers.findIndex(x => x?.id === id)]
}

export function convertDate(date, withTime) {
  return `${date?.toString().split(' ')[1]} ${date?.toString().split(' ')[2]} ${date?.toString().split(' ')[3]} ${withTime?date?.toString().split(' ')[4]:""}`
} 