import React, { useContext, useState } from 'react'
import './styles/Products.css'
import '../../site/common/styles/ProductTable.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'

export default function Products() {
  
  const {allProducts, currencyFormat} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const reduceStock = (el) => el.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.stock,0),0)
  const reduceSold = (el) => el.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.qtySold>0&&b.qtySold,0),0)
  const headers = ['No.','Product','Product Name','Unit Price','Stock','Qty Sold','Earnings','Stock Status','Actions']
 
  const headersrow = headers?.map((el,i) => {
    return <h5 className={i===sort?"active":""} onClick={() => i!==8&&setSort(i)}>
      {el}
      {i!==8&&<i className="fas fa-sort"></i>}
    </h5>
  })
  const allprodsrow = allProducts?.map((el,i) => {
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
      <h5><i className="far fa-ellipsis-h actionsicon"></i></h5>
    </div>
  })

  return (
    <div className="productspage">
      <div className="pagecont">
        <div className="titlesrow">
          <h4>Products</h4>
          <AppInput placeholder="Find a Product" iconclass="fal fa-search"/>
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