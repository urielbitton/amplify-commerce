import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import './styles/QuickShop.css'
import {colorConverter, sizeConverter} from '../../common/UtilityFuncs'
import AddToCart from './AddToCart'

export default function QuickShopComp() {

  const {showQuickShop, setShowQuickShop, quickShopProd, currencyFormat} = useContext(StoreContext)
  const {name, imgs, price, sizes, descript} = quickShopProd
  const [chosenSize, setChosenSize] = useState(sizes[0]?.name)
  const [chosenColor, setChosenColor] = useState(sizes[0]?.colors[0])

  const sizesrow = sizes.map(el => {
    return <div 
      className={`sizebox ${el.name===chosenSize?"active":""}`}
      onClick={() => setChosenSize(el.name)}
    >
      <small>{el.name}</small> 
    </div>
  })
  const colorsrow = sizes[sizes.findIndex(x => x.name===chosenSize)]?.colors.map(el => {
    return <div 
      className={`colorcircle ${el===chosenColor?"active":""}`}
      onClick={() => setChosenColor(el)}
    >
      <div className="color" style={{background: el}}></div>
    </div>
  })

  useEffect(() => {
    setChosenColor(sizes[sizes.findIndex(x => x.name===chosenSize)]?.colors[0])
  },[chosenSize])

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
          <div className="btnscont">
            
          </div>
        </div>
      </div>
    </div>
  )
}