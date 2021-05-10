import React from 'react'
import './styles/ProductBox.css'
import Ratings from '../../common/Ratings'

export default function ProductBox(props) {

  const {name, price, rating, imgs, instock, colors} = props.el
  const {className, small} = props

  const colorsrow = colors?.map(el => {
    return <div className="colorcircle" style={{background:el}}></div>
  })

  function addToCart() {

  }
 
  return (
    <div className={`productbox ${className}`}>
      <div className="imgcont" style={{backgroundImage: `url(${imgs[0]})`}}>
        <div className="productactions">
          <div>
            <i className="fal fa-heart"></i>
          </div>
          <div className={`addtocartbtn ${!instock&&"disabled"}`}>
            <small onClick={() => instock&&addToCart()}>
              {!small?"Add to Cart":<i className="fal fa-shopping-cart"></i>}
            </small>
          </div>
          <div>
            <i className="fal fa-random"></i>
          </div>
        </div>
      </div>
      <div className="infocont">
        <div className="colorsbar">
          {colorsrow}
        </div>
        <div className="titlebar">
          <h6>{name}</h6>
          <Ratings rating={rating} />
        </div>
        <div>
          <small>${price?.toFixed(2)}</small>
        </div>
        <div>
          {!instock&&<small className="outofstock">Out of Stock</small>}
        </div>
      </div>
    </div>
  )
}