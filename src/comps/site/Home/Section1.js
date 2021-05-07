import React, { useContext } from 'react'
import ProductBox from '../common/ProductBox'
import SectionTitles from '../common/SectionTitles'
import './styles/HomeSections.css'
import {StoreContext} from '../../common/StoreContext'
import AppButton from '../common/AppButton'

export default function Section1() {

  const {allProducts} = useContext(StoreContext)

  const summertrend = allProducts?.map(el => {
    return <ProductBox el={el} />
  })

  return (
    <div className="section1 homesection">
      <div className="grid xgrid">
        <SectionTitles 
          title="Summer 2021 Trends"
          text="Discover our latest fashion trends for the summer."
        />
        <div className="productssection">
          {summertrend}
        </div>
        <div className="btncont">
          <AppButton 
            title="View All"
            icon="fal fa-angle-right"
            url="/shop"
          />
        </div>
      </div>
    </div>
  )
}