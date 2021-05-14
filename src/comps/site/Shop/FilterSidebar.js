import React, { useContext, useState } from 'react'
import './styles/FilterSidebar.css'
import {priceArr, sizeArr, ratingsArr, colorsArr} from './arrays/FilterArrays'
import { StoreContext } from '../../common/StoreContext'
import {colorConverter} from '../../common/UtilityFuncs'

export default function FilterSidebar() {

  const {priceFilter, setPriceFilter, colorFilter, setColorFilter, sizeFilter, setSizeFilter,
    ratingFilter, setRatingFilter
  } = useContext(StoreContext)
  const [priceBubble, setPriceBubble] = useState()
  const [sizeBubble, setSizeBubble] = useState()
  const [ratingBubble, setRatingBubble] = useState()
  const [colorBubble, setColorBubble] = useState()

  const bubblesarr = [
    {name: 'Price', state: priceBubble, setState: setPriceBubble, pricebubble: true},
    {name: 'Color', state: colorBubble, setState: setColorBubble, colorBubble: true,},
    {name: 'Size', state: sizeBubble, setState: setSizeBubble},
    {name: 'Rating', state: ratingBubble, setState: setRatingBubble},
  ]

  const pricerow = priceArr?.map(({name,value}) => {
    return <h6 
      className={`${value===priceFilter&&"active"}`}
      onClick={() => {setPriceFilter(value);setPriceBubble(value)}}
      key={name}
      >{name}</h6>
  })
  const sizerow = sizeArr?.map(({name,value}) => {
    return <h6 
      className={`${value===sizeFilter&&"active"}`}
      onClick={() => {setSizeFilter(value);setSizeBubble(value)}}
      key={name}
      >{name}</h6>
  })
  const ratingsrow = ratingsArr?.map(({name,value}) => {
    return <h6 
      className={`${value===ratingFilter&&"active"}`}
      onClick={() => {setRatingFilter(value);setRatingBubble(value)}}
      key={name}
      >{name}</h6>
  })
  const colorsrow = colorsArr?.map(({name,value}) => {
    return <h6 
      className={`${value===colorFilter&&"active"}`}
      onClick={() => {setColorFilter(value);setColorBubble(value)}}
      key={name}
      >
      <div className="colorcircle" style={{background:value}}></div>
      {name}
    </h6>
  })
  function clearFilter(num) {
    if(num===0) setPriceFilter('all')
    if(num===1) setColorFilter('all')
    if(num===2) setSizeFilter('all')
    if(num===3) setRatingFilter('all')
  }

  const bubblesrow = bubblesarr.map(({name,state,setState,pricebubble,colorBubble},i) => {
      return (
        state && state!=='all'?
        <div className="filterbubble" onClick={() => {setState();clearFilter(i)}}>
          <small>{name}: {pricebubble?`$${state[0]}-$${state[1]}`:colorBubble?colorConverter(state):state}</small>
          <i className="fal fa-times"></i>
        </div>:
        ""  
      )
  })

  return (
    <div className="filterssidebar">
      <h3>Filter Products</h3>
      <div className="filterbubblecont">
        {bubblesrow}
      </div>
      <div>
        <h4>Price</h4>
        {pricerow}
      </div>
      <div>
        <h4>Size</h4>
        {sizerow}
      </div>
      <div>
        <h4>Rating</h4>
        {ratingsrow}
      </div>
      <div>
        <h4>Color</h4>
        {colorsrow}
      </div>
      <div>
        <h4>Collection</h4>
      </div>
      <div>
        <h4>Season</h4>
      </div>
    </div>
  )
}