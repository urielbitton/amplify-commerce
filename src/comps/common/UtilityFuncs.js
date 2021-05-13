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
  if(color==='#bdc6c7') return 'Gray'
}
