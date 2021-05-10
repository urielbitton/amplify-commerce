import React, { useEffect, useState } from 'react'
import AppButton from '../common/AppButton'
import './styles/HomeBanner.css'

export default function HomeBanner() {

  const [slidePos, setSlidePos] = useState(-1) 
  const slidettime = 8000

  const slidesarr = [
    {title: 'Women\'s Summer Trends', subtitle: 'New collection 2021', btntext: 'Shop Now', btnlink: '/shop/collections', img: 'https://i.imgur.com/4uKF9Ew.jpg'},
    {title: 'Latest Fashion Apparel', subtitle: 'Winter fashion 2021', btntext: 'Shop Now', btnlink: '/shop/collections', img: 'https://i.imgur.com/LqO5TYJ.jpg'},
    {title: 'Season Fashion Features', subtitle: 'Fall collection 2021', btntext: 'Shop Now', btnlink: '/shop/collections', img: 'https://i.imgur.com/M6NyUzJ.jpg'}
  ] 

  const slidesrow = slidesarr.map(({title,subtitle,btntext,btnlink},i) => {
    return <div className={`titlescont ${i===slidePos&&"active"}`}>
      <h5>{subtitle}</h5>
      <h1>{title}</h1>
      <div className="btnscont">
        <AppButton 
          title={btntext} 
          icon="fal fa-angle-right" 
          white
          url={btnlink}
        />
      </div>
    </div>
  })
  const slidesbg = slidesarr.map(({img},i) => {
    return <div 
      className={`bannerbg ${i===slidePos&&"active"}`} 
      style={{backgroundImage: `url(${img})`}}
      ></div>
  })
  const bannernavrow = slidesarr.map((el,i) => {
    return <small 
      className={i===slidePos&&"active"}
      onClick={() => setSlidePos(i)}
    > 
      0{i+1}
      <hr/>
    </small>
  })
  const progbarrow = slidesarr.map((el,i) => {
    return <div 
      className={`slideprogbar ${slidePos===i&&"active"}`}
      style={{transition: slidePos===i&&`width ${slidettime/1000}s linear`}}
      ></div>
  })

  useEffect(() => {
    setSlidePos(0)
  },[])

  useEffect(() => {
    const timer = setInterval(() => {
      setSlidePos(prev => prev<(slidesarr.length-1)?prev+1:0)
    },slidettime) 
    return () => {
      clearInterval(timer) 
    }
  },[slidePos])

  return (
    <div className="homebanner">
      {progbarrow}
      {slidesbg}
      <div className="grid">
        <div className="bannerslidecont">
          {slidesrow}
        </div>
        <div className="bannernav">
          {bannernavrow}
        </div>
      </div>
    </div>
  )
}