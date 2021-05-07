import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import ProductBox from '../common/ProductBox'
import SectionTitles from '../common/SectionTitles'
import './styles/HomeSections.css'

export default function Section3() {

  const {allProducts} = useContext(StoreContext)

  const newarrivals = allProducts
  ?.filter(x => x.collection?.includes('newarrivals'))
  .map(el => {
    return <ProductBox el={el} />
  })

  return (
    <div className="section3 homesection">
      <div className="grid xgrid">
        <SectionTitles 
          title="New Arrivals"
          text="Shop popular and new arrivals to amplify."
        />
        <div className="productssection">
          {newarrivals}
        </div>
      </div>
    </div>
  )
}