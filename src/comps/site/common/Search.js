import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../common/StoreContext'
import './styles/Search.css'
import {AppInput} from '../../common/AppInputs'
import { Link, useHistory, useLocation } from 'react-router-dom'

export default function Search() {

  const {showSearch, setShowSearch, allProducts, currencyFormat} = useContext(StoreContext)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const history = useHistory()

  const productsrow = allProducts
  ?.filter(x => (pattern.test(clean(x.name)) || pattern.test(x.price) || x.id === keyword || 
  x.categories.some(x => x===keyword) || x.collection.some(x => x===keyword) || pattern.test(x.belongs)) 
  && keyword.length)
  .map(prod => {
    return <Link to={`/product/${prod.id}`} onClick={() => closeSearch()}>
      <div className="searchproductrow">
        <img src={prod.imgs[0]} alt="" />
        <div>
          <h4>{prod.name}</h4>
          <h5>{currencyFormat.format(prod.price)}</h5>
        </div>
      </div>
    </Link>
  })

  function closeSearch() {
    pattern = ''
    setShowSearch(false)
  }
  function searchPage(e) {
    if(e.key === 'Enter') {
      history.push({
        pathname: '/shop',
        search: `?k=${keyword}`
      })
      setShowSearch(false)
    }
  }

  return (
    <div className={`searchcover ${showSearch?"show":""}`}>
      <i className="fal fa-times"  onClick={() => setShowSearch(false)}></i>
      <div className="searchcont">
        <div className={`searchbar ${showSearch?"down":""}`}>
          <AppInput 
            placeholder="Search by product, tag, category or price..." 
            iconclass="fal fa-search"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => searchPage(e)}
          />
        </div>
        <div className={`searchresultscont bluescrollbar ${showSearch?"show":""}`}>
          {productsrow}
        </div>
      </div>
    </div>
  )
}