import React from 'react'
import PageBanner from '../common/PageBanner'
import './styles/ProductPage.css'

export default function ProductPage(props) {

  const {name} = props.el

  return (
    <div className="productpage">
      <PageBanner 
        title={name}
      />
      <div className="grid xgrid">
        <div className="mainprodcont">

        </div>
      </div>
    </div>
  )
}