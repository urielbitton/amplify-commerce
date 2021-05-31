import React, { useContext, useEffect, useState } from 'react'
import './styles/ShopContent.css'
import {categArr, sortArr} from './arrays/FilterArrays'
import {AppSelect} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import ProductBox from '../common/ProductBox'
import Loader from '../../common/Loader'
import { useLocation } from 'react-router-dom'

export default function ShopContent() {

  const {allProducts, colorFilter, sizeFilter, ratingFilter, priceFilter, categFilter, setCategFilter} = useContext(StoreContext)
  const [sortPos, setSortPos] = useState('default')
  const [view, setView] = useState(1)
  const [limit, setLimit] = useState(8)
  const [page, setPage] = useState(0)
  const [urlSearch, setUrlSearch] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  const pattern = new RegExp('\\b' + clean(urlSearch), 'i')
  const options = [4,6,8,10,'all'] 
  const location = useLocation()

  const categrow = categArr.map(({name,value}) => {
    return <small 
      className={value===categFilter&&"active"}
      onClick={() => setCategFilter(value)}
      key={name}
    >{name}</small>
  })
  //select box to choose number of elements per page
  const optionsrow = options?.map(el => { 
    if(el==='all') {
      return <option value={allProducts.length}>{el}</option> 
    }
    else {
      return <option selected={el===limit} value={el}>{el}</option>
    }
  }) 
  //display and paginate results
  const allproductsrow = allProducts
    ?.slice(parseInt((limit*page),10),(parseInt((limit*page),10)+parseInt(limit,10)))
    .filter(x => { 
      return (
        (x.belongs === categFilter || categFilter === 'all') &&
        (x.sizes.includes(sizeFilter) || sizeFilter==='all') &&
        (Math.trunc(x.rating) === ratingFilter || ratingFilter==='all') &&
        ((x.price >= priceFilter[0] && x.price < priceFilter[1]) || priceFilter==='all') &&
        ((pattern.test(clean(x.name)) || urlSearch === '') || 
        (pattern.test(x.price) || urlSearch === '') ||
        (x.id === urlSearch || urlSearch === '') || 
        (x.categories.some(x => x===urlSearch) || urlSearch === '') ||
        (x.collection.some(x => x===urlSearch) || urlSearch === '') ||
        (pattern.test(x.belongs) || urlSearch === ''))
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
  //pagination number boxes
  const paginrows = Array.apply(null, { 
    length: ((allProducts.length)%limit)===0?((allProducts.length)/limit):((allProducts.length)/limit)+1
  }).map((el,i) => {
    if((i+1)===1 || Math.abs(i-page) < 2 || (i+1)===(((allProducts.length)%limit)===0?((allProducts.length)/limit):((allProducts.length)/limit)+1)) {
      return <div 
        className={`navbox ${i===page&&'active'}`} 
        onClick={() => setPage(i)}
        >
        {i+1}
      </div>  
    }
    else if((i===1 || i>(page+1)) && (i===(allProducts.length) || (i<page+3))) { 
      return <div className="navbox"><small>...</small></div>
    }
    else return ''
  })

  useEffect(() => {
    if(location.search)   
      setUrlSearch(location.search.split('=')[1])
    else 
      setUrlSearch('')
    return () => setUrlSearch('')
  },[location]) 

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
            title={<i className="fal fa-sort-size-down"></i>}
            options={sortArr} 
            onChange={(e) => setSortPos(e.target.value)} 
          />
        </div>
      </div>
      <div className="paginatorrow">
        <div className="left">
          <h5>
            Showing {allproductsrow.length} of {allProducts.length} products
          </h5>
          <hr/>
          <h5>Display: 
            <select onChange={(e) => setLimit(e.target.value)}>{optionsrow}</select>
            per page
          </h5>
        </div>
        <div className="paginrowscont">
        <div 
          onClick={() => page>0&&setPage(prev => prev-1)}
          className={`navbox ${!page>0&&"faded"}`}
        >
          <small><i className="fal fa-angle-left"></i></small>
          </div>
          <div className="paginator">
            {paginrows}
          </div>
          <div 
            onClick={() => page<(paginrows.length-1)&&setPage(prev => prev+1)} 
            className={`navbox ${page<paginrows.length-1?"":"faded"}`}
          >
            <small><i className="fal fa-angle-right"></i></small>
          </div>
        </div>
      </div>
      <div className="productscontent">
        {
          allProducts?.length?
          allproductsrow:
          <Loader />
        }
      </div>
    </div>
  )
}