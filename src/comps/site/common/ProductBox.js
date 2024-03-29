import React, {useContext} from 'react'
import './styles/ProductBox.css'
import Ratings from '../../common/Ratings'
import { Link, useHistory } from 'react-router-dom'
import AddToWish from './AddToWish'
import CompareProduct from './CompareProduct'
import AppButton from './AppButton'
import { StoreContext } from '../../common/StoreContext'

export default function ProductBox(props) {

  const {id, name, price, rating, imgs, sizes} = props.el
  const {setShowQuickShop, setQuickProduct} = useContext(StoreContext)
  const {className, small} = props
  const history = useHistory()
  const allcolors = []

  //push all colors to single array
  sizes.forEach(el => {
    el.colors.forEach(el => {
      if(!allcolors.includes(el.name)) {
        allcolors.push(el.name)
      }
    })
  })
  const colorsrow = allcolors.slice(0,4).map(el => {
    return <div className="colorcircle" style={{background:el}} key={el}></div>
  })
 
  return (
    <div className={`productbox ${className}`}>
      <div 
        className="imgcont" 
        style={{backgroundImage: `url(${imgs[0]})`}}
        onClick={() => history.push(`/shop/product/${id}`)}
      >
        <div className="productactions" onClick={(e) => e.stopPropagation()}>
          <AddToWish el={props.el} />
          <AppButton 
            title="Quick Shop"
            className="quickshopbtn"
            onClick={() => {setQuickProduct(props.el);setShowQuickShop(true)}}
          />
          <CompareProduct el={props.el} />
        </div>
      </div>
      <div className="infocont">
        <div className="colorsbar">
          {colorsrow}
          {
            allcolors.length>4?
            <div className="colorcircle num">
              <small>+{allcolors.length-4}</small>
            </div>
            :""
          }
        </div>
        <div className="titlebar">
          <Link to={`/product/${id}`}><h6>{name}</h6></Link>
          <Ratings rating={rating} />
        </div>
        <div>
          <small>${price?.toFixed(2)}</small>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}