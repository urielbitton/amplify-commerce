import React from 'react'
import './styles/Shop.css'
import PageBanner from '../common/PageBanner'
import FilterSidebar from './FilterSidebar'
import ShopContent from './ShopContent'
import SubscribeComp from '../common/SubscribeComp'

export default function Shop() {
  return (
    <div className="shoppage">
      <PageBanner 
        title="Shop"
      />
      <div className="grid xgrid shopgrid">
        <FilterSidebar />
        <ShopContent />
      </div>
      <SubscribeComp />
    </div>
  )
}