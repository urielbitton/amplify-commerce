import React, { useContext, useState } from 'react'
import './styles/FilterSidebar.css'
import {priceArr, sizeArr, ratingsArr, colorsArr} from './arrays/FilterArrays'
import { StoreContext } from '../../common/StoreContext'
import {colorConverter} from '../../common/UtilityFuncs'

export default function FilterSidebar() {

  const {colorFilter, setColorFilter, priceFilter, setPriceFilter, sizeFilter, setSizeFilter,
    ratingFilter, setRatingFilter, categFilter, setCategFilter
  } = useContext(StoreContext)
  const [priceBubble, setPriceBubble] = useState()
  const [sizeBubble, setSizeBubble] = useState()
  const [ratingBubble, setRatingBubble] = useState()
  const [colorBubble, setColorBubble] = useState()
  const [categBubble, setCategBubble] = useState()

  const bubblesarr = [
    {name: 'Price', state: priceBubble, setState: setPriceBubble, clearFilter: setColorFilter, pricebubble: true},
    {name: 'Size', state: sizeBubble, setState: setSizeBubble, clearFilter: setPriceFilter},
    {name: 'Rating', state: ratingBubble, setState: setRatingBubble, clearFilter: setSizeFilter},
    {name: 'Color', state: colorBubble, setState: setColorBubble, clearFilter: setRatingFilter, colorBubble: true,},
    {name: 'Category', state: categBubble, setState: setCategBubble, clearFilter: setCategFilter}
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

  const bubblesrow = bubblesarr.map(({name,state,setState,pricebubble,clearFilter}) => {
      return (
        state && state!=='all'?
        <div className="filterbubble" onClick={() => {setState();clearFilter('all')}}>
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