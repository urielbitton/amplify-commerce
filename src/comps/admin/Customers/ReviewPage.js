import React, { useContext } from 'react'
import Ratings from '../../common/Ratings'
import './styles/Reviews.css'
import {StoreContext} from '../../common/StoreContext'
import { getCustomerById } from '../../common/UtilityFuncs'
import AdminBtn from '../common/AdminBtn'

export default function ReviewPage(props) {

  const {allCustomers}  = useContext(StoreContext)
  const {title, rating, reviewerId, reviewText, likes} = props.el

  return ( 
    <div className="reviewspage">
      <div className="pagecont">
        <div>
          <div className="icontitle">
            <i className="fal fa-star-half-alt"></i>
          </div>
        </div>
        <div className="titlerow">
          <h4><q>{title}</q></h4>
          <Ratings rating={rating} />
          {rating} out of 5
        </div>
        <div className="reviewbody">
          <img src={getCustomerById(allCustomers, reviewerId)?.profimg} alt=""/>
          <div className="content">
            <h5 className="nametitle">{getCustomerById(allCustomers, reviewerId)?.name}</h5>
            <h6>{title}</h6>
            <p className="reviewtext">
              {reviewText}
            </p>
            <small>{likes} people liked this review</small>
            <div className="reviewactions">
              <AdminBtn title="Like" />
              <AdminBtn title={`Contact ${getCustomerById(allCustomers, reviewerId)?.name.split(' ')[0]}`}/>
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