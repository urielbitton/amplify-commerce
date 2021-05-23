import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import './styles/QuickShop.css'
import {colorConverter, sizeConverter} from '../../common/UtilityFuncs'
import AddToCart from './AddToCart'
import AppButton from './AppButton'

export default function QuickShopComp(props) {

  const {currencyFormat, quickProduct, showQuickShop, setShowQuickShop} = useContext(StoreContext)
  const {id, name, imgs, price, sizes, descript} = quickProduct
  const [chosenSize, setChosenSize] = useState(sizes[0]?.name)
  const [chosenColor, setChosenColor] = useState(sizes[0]?.colors[0]?.name)
  const chosenSizeIndex = sizes.findIndex(x => x.name===chosenSize)
  const stocksLeft = sizes[chosenSizeIndex]?.colors[sizes[chosenSizeIndex].colors.findIndex(x => x.name===chosenColor)]?.stock
  const subid = id+chosenSize+chosenColor
 
  const sizesrow = sizes.map(el => {
    return <div 
      className={`sizebox ${el.name===chosenSize?"active":""}`}
      onClick={() => setChosenSize(el.name)}
      key={el.name}
    >
      <small>{el.name}</small>  
    </div>
  })
  const colorsrow = sizes[chosenSizeIndex]?.colors.map(el => {
    return <div 
      className={`colorcircle ${el.name===chosenColor?"active":""}`}
      onClick={() => setChosenColor(el.name)}
      key={el.name}
    >
      <div className="color" style={{background: el.name}}></div>
    </div>
  })

  useEffect(() => {
    setChosenColor(sizes[chosenSizeIndex]?.colors[0]?.name)
  },[chosenSize])

  useEffect(() => {
    setChosenSize(sizes[0]?.name)
    setChosenColor(sizes[0]?.colors[0]?.name)
  },[showQuickShop])  


  return ( 
    <div  
      className={`quickshopcover ${showQuickShop?"show":""}`} 
      onClick={() => setShowQuickShop(false)}
    >
      <div className="quickshopcont" onClick={(e) => e.stopPropagation()}>
        <i className="fal fa-times closeicon" onClick={() => setShowQuickShop(false)}></i>
        <div className="imgcont">
          <img src={imgs[0]} alt="" />
        </div>
        <div className="infocont">
          <h2>{name}</h2>
          <p className="descript">{descript}</p>
          <div className="section">
            <h6>Price</h6>
            <span>{currencyFormat.format(price)}</span>
          </div>
          <div className="section">
            <h6>Size: &nbsp;&nbsp;{sizeConverter(chosenSize)}</h6>
            <span className="sizesopts">{sizesrow}</span>
          </div>
          <div className="section">
            <h6>Color: &nbsp;&nbsp;{colorConverter(chosenColor)}</h6>
            <span className="colorsopts">{colorsrow}</span>
          </div>
          <div className="notifssection">
            {
              stocksLeft>3?
              <small className="instock">In Stock</small>:
              stocksLeft===0?<small className="lowstock">Out of Stock</small>:
              stocksLeft<=3?
              <small className="lowstock">Only {stocksLeft} left in stock</small>:""
            }
          </div>
          <div className="btnscont">
            {
              chosenSize&&
              <AddToCart 
                el={quickProduct} 
                stocksLeft={stocksLeft} 
                chosenSize={chosenSize}
                chosenColor={chosenColor}
                subid={subid}
              />
            }
            <AppButton 
              title="View Details"
              url={`/product/${id}?${chosenSize}${chosenColor}`}
              className="viewdetails"
            />
          </div>
        </div>
      </div>
    </div>
  )
}