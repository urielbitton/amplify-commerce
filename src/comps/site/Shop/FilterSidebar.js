import React, { useContext, useState } from 'react'
import './styles/FilterSidebar.css'
import {priceArr, sizeArr, ratingsArr, colorsArr} from './arrays/FilterArrays'
import { StoreContext } from '../../common/StoreContext'

export default function FilterSidebar() {

  const {colorFilter, setColorFilter, priceFilter, setPriceFilter, sizeFilter, setSizeFilter,
    ratingFilter, setRatingFilter
  } = useContext(StoreContext)

  const pricerow = priceArr?.map(({name,value}) => {
    return <h6 
      className={`${value===priceFilter&&"active"}`}
      onClick={() => setPriceFilter(value)}
      key={name}
      >{name}</h6>
  })
  const sizerow = sizeArr?.map(({name,value}) => {
    return <h6 
      className={`${value===sizeFilter&&"active"}`}
      onClick={() => setSizeFilter(value)}
      key={name}
      >{name}</h6>
  })
  const ratingsrow = ratingsArr?.map(({name,value}) => {
    return <h6 
      className={`${value===ratingFilter&&"active"}`}
      onClick={() => setRatingFilter(value)}
      key={name}
      >{name}</h6>
  })
  const colorsrow = colorsArr?.map(({name,value}) => {
    return <h6 
      className={`${value===colorFilter&&"active"}`}
      onClick={() => setColorFilter(value)}
      key={name}
      >
      <div className="colorcircle" style={{background:value}}></div>
      {name}
    </h6>
  })

  return (
    <div className="filterssidebar">
      <h3>Filter Products</h3>
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