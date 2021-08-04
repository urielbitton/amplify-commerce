import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../common/StoreContext'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import AdminBtn from '../common/AdminBtn'
import './styles/ReviewCard.css'

export default function ReviewCard(props) {

  const {allCustomers} = useContext(StoreContext)
  const {reviewerId, title, likes, reviewText, showRatings} = props.el

  return (
    <div className="reviewcard">
      <img src={getCustomerArrById(allCustomers, reviewerId)?.profimg} alt=""/>
      <div className="content">
        <h5 className="nametitle">
          <Link to={`/admin/customer/${getCustomerArrById(allCustomers, reviewerId)?.id}`}>{getCustomerArrById(allCustomers, reviewerId)?.name}</Link>
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
  )
}