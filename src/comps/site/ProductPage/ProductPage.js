import React, { useState } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/ProductPage.css'
import AddToCart from '../common/AddToCart'

export default function ProductPage(props) {

  const {id, name, price, rating, imgs, instock, colors, stock, sizes, collection} = props.el
  const [activeImg, setActiveImg] = useState(imgs[0])
  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'})

  const imgsrow = imgs?.map(el => {
    return <img src={el} alt="" onClick={() => setActiveImg(el)}/>
  })

  function magnifyImg(e) {
    
  }

  return (
    <div className="productpage">
      <PageBanner 
        title={name}
      />
      <div className="grid xgrid">
        <div className="mainprodcont">
          <div className="imgscontent">
            <div className="imgcontainer">
              <div 
                className="imgcont" 
                style={{backgroundImage: `url(${activeImg})`}} 
                onMouseMove={(e) => magnifyImg(e)}
              >
            </div>
            </div>
            <div className="imgsrow">
              {imgsrow}
            </div>
          </div>
          <div className="infocont">
            <h2>{name}</h2>
            <h6 className="productid">Product ID: {id}</h6>
            <h3 className="price">{currencyFormat.format(price)}</h3>
            <div className="prodactionsrow">
              <AddToCart el={props.el} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}