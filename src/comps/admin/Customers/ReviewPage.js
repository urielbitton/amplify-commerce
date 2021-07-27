import React, { useContext } from 'react'
import Ratings from '../../common/Ratings'
import './styles/Reviews.css'
import {StoreContext} from '../../common/StoreContext'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import AdminBtn from '../common/AdminBtn'
import referProduct from '../../common/referProduct'
import { Link } from 'react-router-dom'

export default function ReviewPage(props) {
 
  const {allCustomers, allProducts, currencyFormat}  = useContext(StoreContext)
  const {title, rating, reviewerId, reviewText, likes, productId} = props.el

  return ( 
    <div className="reviewspage">
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
        <div className="reviewbody">
          <img src={getCustomerArrById(allCustomers, reviewerId)?.profimg} alt=""/>
          <div className="content">
            <h5 className="nametitle">
              <Link to={`/admin/customer/${getCustomerArrById(allCustomers, reviewerId).id}`}>{getCustomerArrById(allCustomers, reviewerId)?.name}</Link>
            </h5>
            <h6>{title}</h6>
            <p className="reviewtext">
              {reviewText}
            </p>
            <small>{likes} people liked this review</small>
            <div className="reviewactions">
              <AdminBtn title="Like" />
              <AdminBtn title={`Contact ${getCustomerArrById(allCustomers, reviewerId)?.name.split(' ')[0]}`}/>
            </div>
          </div>
        </div>
        <div className="actionbtns">
          <AdminBtn title="Done" solid/>
          <AdminBtn title="Remove Review" solid className="deletebtn"/>
          <AdminBtn title="Hide Review"/>
        </div>
      </div>
    </div>
  )
}