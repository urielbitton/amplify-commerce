import React from 'react'
import { Link } from 'react-router-dom'
import SectionTitles from '../common/SectionTitles'
import './styles/HomeSections.css'

export default function Section2() {

  const categories = [
    {name: 'Summer Collection', img: 'https://i.imgur.com/u2ZmQgD.jpg', url: '/shop/summer-collection'},
    {name: 'Spring Collection', img: 'https://i.imgur.com/9KuIvBN.jpg', url: '/shop/spring-collection'},
    {name: 'Accessories Collection', img: 'https://i.imgur.com/DCvuIsU.jpg', url: '/shop/accessories'}
  ]

  const categoriesrow = categories?.map(({name,img,url}) => {
    return <div className="categbox" style={{backgroundImage: `url(${img})`}} key={name}>
      <div className="categtitles">
        <h4>{name}</h4>
        <Link to={url}><hr/>Shop Now</Link>
      </div>
    </div>
  })

  return (
    <div className="section2 homesection">
      <SectionTitles 
        title="Shop Collections"
        text="Discover our latest collections for all seasons."
      />
      <div className="categsection">
        {categoriesrow}
      </div>
    </div> 
  )
} 