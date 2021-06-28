import React, { useContext, useEffect, useState } from 'react'
import './styles/Products.css'
import '../../site/common/styles/ProductTable.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import {headers} from './arrays/arrays'

export default function Products() {
  
  const {allProducts, currencyFormat} = useContext(StoreContext)
  const [sort, setSort] = useState(2)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(0)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const reduceStock = (el) => el.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.stock,0),0)
  const reduceSold = (el) => el.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.qtySold>0&&b.qtySold,0),0)
 
  const headersrow = headers?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""} onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>
      {el.name}
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 
  const allprodsrow = allProducts
  ?.filter(x => (pattern.test(clean(x.name)) || pattern.test(x.price) || x.id === keyword || 
  x.categories.some(x => x===keyword) || x.collection.some(x => x===keyword) || pattern.test(x.belongs))) 
  .sort((a,b) => {
    if(sort === 1) {
      if(a.name > b.name && asc) return 1 
      else return -1
    }
    else if(sort === 2) {
      if(asc) return a.price - b.price
      else return b.price - a.price
    }
    else if(sort === 3) {
      if(asc) return reduceStock(a) - reduceStock(b)
      else return reduceStock(b) - reduceStock(a)
    }
    else if(sort === 4) {
      if(asc) return reduceSold(a) - reduceSold(b)
      else return reduceSold(b) - reduceSold(a)
    }
    else if(sort === 5) {
      if(asc) return (reduceSold(a)*a.price) - (reduceSold(b)*b.price)
      else return (reduceSold(b)*b.price) - (reduceSold(a)*a.price)
    }
  })
  .map((el,i) => {
    return <div className="proditem">
      <h5>{i+1}</h5>
      <h5><img src={el.imgs[0]} alt={el.name}/></h5>
      <h5>{el.name}</h5>
      <h5>{currencyFormat.format(el.price)}</h5>
      <h5>{reduceStock(el)}</h5>
      <h5>{reduceSold(el)}</h5>
      <h5>{currencyFormat.format(reduceSold(el) * el.price)}</h5>
      <h5 className={`stockcont ${reduceStock(el)>5?"instock":reduceStock(el)>0?"lowstock":"nostock"}`}>
        <span>{reduceStock(el)>5?"In Stock":reduceStock(el)>0?"Low Stock":"Out Of Stock"}</span>
      </h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===el.id?0:el.id);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${el.id===showOpts?"show":""}`}> 
          <div><i className="far fa-edit" onClick={() => editProduct()}></i></div>
          <div><i className="far fa-trash-alt" onClick={() => deleteProduct()}></i></div>
          <div><i className="far fa-info" onClick={() => infoProduct()}></i></div>
        </div>
      </h5>
    </div>
  })

  function editProduct() {
    
  }
  function deleteProduct() {
    const confirm = window.confirm('Are you sure you want to remove this product? This will remove the product from customers cart and wishlist.')
    if(confirm) {
      window.alert('Product was removed from your store.')
    }
  }
  function infoProduct() {

  }
  console.log(sort, asc)
  useEffect(() => {
    window.onclick = () => {
      setShowOpts(0)
    }
  },[])

  return (
    <div className="productspage">
      <div className="pagecont">
        <div className="titlesrow">
          <h4>Products</h4>
          <AppInput 
            placeholder="Find a Product" 
            iconclass="fal fa-search" 
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="productstablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allprodsrow}
            </div>
            <div className="foot">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}