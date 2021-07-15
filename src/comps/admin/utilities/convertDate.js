export default function convertDate(date, withTime) {
  return `
    ${date?.toDate().toString().split(' ')[1]} 
    ${date?.toDate().toString().split(' ')[2]} 
    ${date?.toDate().toString().split(' ')[3]}
  `
} 