import React, { useContext } from 'react'
import Ratings from '../../common/Ratings'
import './styles/Reviews.css'
import {StoreContext} from '../../common/StoreContext'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import AdminBtn from '../common/AdminBtn'
import referProduct from '../../common/referProduct'
import { Link } from 'react-router-dom'
import ReviewCard from './ReviewCard'

export default function ReviewPage(props) {
 
  const {allProducts, currencyFormat}  = useContext(StoreContext)
  const {title, rating, productId} = props.el

  return ( 
    <div className="reviewspage onereviewpage">
      <div className="pagecont"> 
        <div>
          <div className="prodimgcont">
            <img src={referProduct(allProducts, productId).imgs[0]} alt=""/>
            <div>
              <h4>{referProduct(allProducts, productId).name}</h4>
              <h5>SKU: {referProduct(allProducts, productId).sku}</h5>
              <h5>Price: {currencyFormat.format(referProduct(allProducts, productId).price)}</h5>
            </div>
          </div>
        </div>
        <div className="titlerow">
          <h4><q>{title}</q></h4>
          <Ratings rating={rating} />
          {rating} out of 5
        </div>
        <ReviewCard el={props.el}/>
        <div className="actionbtns">
          <AdminBtn title="Done" solid/>
          <AdminBtn title="Remove Review" solid className="deletebtn"/>
          <AdminBtn title="Hide Review"/>
        </div>
      </div>
    </div>
  )
}