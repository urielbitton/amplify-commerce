import React, { useContext, useState } from 'react'
import './styles/ShopContent.css'
import {categArr, sortArr} from './arrays/FilterArrays'
import {AppSelect} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import ProductBox from '../common/ProductBox'
import Loader from '../../common/Loader'

export default function ShopContent() {

  const {allProducts, colorFilter, sizeFilter, ratingFilter, priceFilter} = useContext(StoreContext)
  const [categPos, setCategPos] = useState('all')
  const [sortPos, setSortPos] = useState('default')
  const [view, setView] = useState(1)

  const categrow = categArr.map(({name,value}) => {
    return <small 
      className={value===categPos&&"active"}
      onClick={() => setCategPos(value)}
      key={name}
    >{name}</small>
  })

  const allproductsrow = allProducts
    ?.filter(x => { 
      return (
        (x.colors.includes(colorFilter) || colorFilter==='all') &&
        (x.sizes.includes(sizeFilter) || sizeFilter==='all') &&
        (Math.trunc(x.rating) === ratingFilter || ratingFilter==='all') &&
        ((x.price >= priceFilter[0] && x.price < priceFilter[1]) || priceFilter==='all')
      )
    })
    .map(el => {
      return <ProductBox 
        el={el} 
        small={view===0} 
        className={view===0&&"small"}
        key={el.id}
      />
  })

  return (
    <div className="shopcontent">
      <div className="categbar">
        <div className="categories">
          <h6>Show:</h6>
          {categrow}
        </div>
        <div className="sortcont">
          <i 
            className={`fas fa-th ${view===0&&"active"}`}
            onClick={() => setView(0)}
          ></i>
          <i 
            className={`fas fa-th-large ${view===1&&"active"}`}
            onClick={() => setView(1)}
          ></i>
          <AppSelect 
            options={sortArr} 
            onChange={(e) => setSortPos(e.target.value)} 
          />
        </div>
      </div>
      <div className="productscontent">
        {
          allProducts.length?
          allproductsrow:
          <Loader />
        }
      </div>
    </div>
  )
}