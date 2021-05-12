import React, { useContext } from 'react'
import './styles/ProductBox.css'
import Ratings from '../../common/Ratings'
import { Link, useHistory } from 'react-router-dom'
import AddToCart from './AddToCart'
import { StoreContext } from '../../common/StoreContext'
import AddToWish from './AddToWish'
import CompareProduct from './CompareProduct'

export default function ProductBox(props) {

  const {myUser} = useContext(StoreContext)
  const {id, name, price, rating, imgs, instock, colors} = props.el
  const {className, small} = props
  const history = useHistory()

  const colorsrow = colors?.map(el => {
    return <div className="colorcircle" style={{background:el}} key={el}></div>
  })
 
  return (
    <div className={`productbox ${className}`}>
      <div 
        className="imgcont" 
        style={{backgroundImage: `url(${imgs[0]})`}}
        onClick={() => history.push(`/product/${id}`)}
      >
        <div className="productactions" onClick={(e) => e.stopPropagation()}>
          <AddToWish el={props.el} />
          <AddToCart el={props.el} />
          <CompareProduct el={props.el} />
        </div>
      </div>
      <div className="infocont">
        <div className="colorsbar">
          {colorsrow}
        </div>
        <div className="titlebar">
          <Link to={`/product/${id}`}><h6>{name}</h6></Link>
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