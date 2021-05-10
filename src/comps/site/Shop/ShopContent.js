import React, { useContext, useState } from 'react'
import './styles/ShopContent.css'
import {categArr, sortArr} from './arrays/FilterArrays'
import {AppSelect} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import ProductBox from '../common/ProductBox'

export default function ShopContent() {

  const {allProducts, colorFilter} = useContext(StoreContext)
  const [categPos, setCategPos] = useState('all')
  const [sortPos, setSortPos] = useState('default')
  const [view, setView] = useState(0)

  const categrow = categArr.map(({name,value}) => {
    return <small 
      className={value===categPos&&"active"}
      onClick={() => setCategPos(value)}
    >{name}</small>
  })

  const allproductsrow = allProducts
    ?.filter(x => x.colors.includes(colorFilter) || colorFilter==='all')
    .map(el => {
      return <ProductBox el={el} />
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
        {allproductsrow}
      </div>
    </div>
  )
}