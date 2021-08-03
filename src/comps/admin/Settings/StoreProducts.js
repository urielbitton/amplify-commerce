import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'

export default function StoreProducts() {

  const {sizesOpts, colorsOpts} = useContext(StoreContext)
  
  const sizesRows = sizesOpts?.map(el => {
    return <div className="stylebox">
      <h5>{el.name}</h5>
      <small>{el.value}</small>
    </div>
  })
  const colorRows = colorsOpts?.map(el => {
    return <div className="stylebox">
      <h5>{el.name}</h5>
      <small>{el.value}</small>
    </div>
  })

  return (
    <>
      <section>
        <h4 className="settingstitle">Product Sizes</h4>
        <div className="styleboxcont">
          {sizesRows}
          <div className="stylebox addbox">
            <h5>Add New</h5>
            <small><i className="fal fa-plus"></i></small>
          </div>
        </div>
      </section>
      <section>
        <h4 className="settingstitle">Product Colors</h4>
        <div className="styleboxcont">
          {colorRows}
          <div className="stylebox addbox">
            <h5>Add New</h5>
            <small><i className="fal fa-plus"></i></small>
          </div>
        </div>  
      </section>
      <section>
        <h4 className="settingstitle">Reviews & Ratings</h4>
      </section>
    </>
  )
}