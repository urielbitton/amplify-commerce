import React, { useContext, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import ProductBox from '../common/ProductBox'
import SectionTitles from '../common/SectionTitles'
import './styles/HomeSections.css'
import AppButton from '../common/AppButton' 
import Loader from '../../common/Loader'

export default function Section3() {

  const {allProducts} = useContext(StoreContext)
  const [pos, setPos] = useState('all')

  const belongsarr = [
    {name: 'all'},
    {name: 'women'},
    {name: 'men'},
    {name: 'kids'}
  ]

  const newarrivals = allProducts
  ?.filter(x => x.collection?.includes('newarrivals') && x.belongs)
  .slice(0,8)
  .map(el => {
    return <ProductBox 
      el={el} 
      className={`${pos==='all'?"visible":el.belongs===pos?"visible":""}`}
      key={el.id}
    />
  })

  const belongsrow = belongsarr.map(({name}) => {
    return <h6 
      className={`${pos===name&&"active"}`}
      onClick={() => setPos(name)}
      key={name}
      >{name}</h6>
  })

  return (
    <div className="section3 homesection">
      <div className="grid xgrid">
        <SectionTitles 
          title="New Arrivals"
          text="Shop popular and new arrivals to amplify."
        />
        <div className="productssection">
          <div className="s3nav">
            {belongsrow}
          </div>
          {
            allProducts?.length?
            newarrivals:
            <Loader height="700px"/>
          }
        </div>
        <div className="btncont">
          <AppButton 
            title="View All"
            icon="fal fa-angle-right"
            url="/shop/new-releases"
          />
        </div>
      </div>
    </div>
  )
}