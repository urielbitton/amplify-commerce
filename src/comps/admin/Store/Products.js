import React, { useContext, useEffect, useState } from 'react'
import './styles/Products.css'
import '../../site/common/styles/ProductTable.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import {headers} from './arrays/arrays'
import { useHistory } from 'react-router-dom'

export default function Products() {
  
  const {allProducts, currencyFormat} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(0)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const reduceStock = (el) => el.sizes?.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.stock,0),0)
  const reduceSold = (el) => el.sizes?.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.qtySold>0&&b.qtySold,0),0)
  const history = useHistory()
  const allProdsFilter = allProducts?.filter(x => (pattern.test(clean(x.name)) || pattern.test(x.price) || x.id === keyword || 
  x.categories.some(x => x===keyword) || x.collection.some(x => x===keyword) || pattern.test(x.belongs)))
 
  const headersrow = headers?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""} onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>
      {el.name}
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 
  const allprodsrow = allProdsFilter.sort((a,b) => {
    if(sort === 1) {
      if(a.name > b.name && asc) return 1 
      else return -1
    }
    else if(sort === 2) {
      if(asc) return b.price - a.price
      else return a.price - b.price
    }
    else if(sort === 3) {
      if(asc) return reduceStock(b) - reduceStock(a)
      else return reduceStock(a) - reduceStock(b)
    }
    else if(sort === 4) {
      if(asc) return reduceSold(b) - reduceSold(a)
      else return reduceSold(a) - reduceSold(b)
    }
    else if(sort === 5) {
      if(asc) return (reduceSold(b)*b.price) - (reduceSold(a)*a.price)
      else return (reduceSold(a)*a.price) - (reduceSold(b)*b.price)
    }
    else if(sort === 6) {
      if(asc) return reduceStock(b) - reduceStock(a)
      else return reduceStock(a) - reduceStock(b)
    }
  })
  .map((el,i) => {
    return <div className="proditem">
      <h5>{i+1}</h5>
      <h5>
        <img src={el.imgs[0]} alt={el.name}/>
        { reduceSold(el)>10&&
          <i title="hot selling product" className={`fas fa-badge-check ${reduceSold(el)> 10?"hot":""}`}></i>
        } 
      </h5>
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
          <div><i title="edit product" className="far fa-edit" onClick={() => editProduct(el.id)}></i></div>
          <div><i title="deelte product" className="far fa-trash-alt" onClick={() => deleteProduct()}></i></div>
          <div><i title="product info" className="far fa-info" onClick={() => infoProduct()}></i></div>
        </div>
      </h5>
    </div>
  })

  function editProduct(prodid) {
    history.push(`/admin/store/edit-product/${prodid}`)
  }
  function deleteProduct() {
    const confirm = window.confirm('Are you sure you want to remove this product? This will remove the product from customers cart and wishlist.')
    if(confirm) {
      window.alert('Product was removed from your store.')
    }
  }
  function infoProduct() {

  }

  useEffect(() => {
    window.onclick = () => setShowOpts(0)
  },[])
  console.log(allProdsFilter)

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
              <h5><span>{allProdsFilter.length}</span> products</h5>
              <h5>
                <span>{allProdsFilter?.reduce((a,b) => a + b.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.qtySold>0&&b.qtySold,0),0),0)}</span> quantities sold
              </h5>
              <h5>
                <span>{currencyFormat.format(allProdsFilter?.reduce((x,y) => x + y.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.qtySold>0&&b.qtySold*y.price,0),0),0))}</span> total earnings
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}