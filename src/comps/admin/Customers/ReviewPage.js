import React, { useContext } from 'react'
import Ratings from '../../common/Ratings'
import './styles/Reviews.css'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import referProduct from '../../common/referProduct'
import ReviewCard from './ReviewCard'
import { deleteDB, setDB, updateDB } from '../../common/services/CrudDb'
import { db } from '../../common/Fire'

export default function ReviewPage(props) {
 
  const {allProducts, currencyFormat, setNotifs}  = useContext(StoreContext)
  const {id, title, rating, productId, isActive} = props.el
  const updateID = db.collection('updates').doc().id

  function deleteReview() {
    deleteDB('reviews', id).then(() => {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: `Review Deleted`,
        icon: 'fal fa-trash-alt',
        text: `The review has been successfully deleted from your store.`,
        time: 5000
      }])
      setDB('updates', updateID, {
        color: '#0088ff',
        date: new Date(),
        descript: `The review has been deleted from your store.`,
        icon: 'fal fa-star-half-alt',
        id: updateID,
        read: false,
        title: 'Review Deleted',
        url: `/admin/customers/reviews`
      })
    })
  }
  function toggleApprove() {
    updateDB('reviews', id, {'isActive':!isActive})
  }

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
          <AdminBtn title="Delete Review" solid className="deletebtn" clickEvent onClick={() => deleteReview()}/>
          <AdminBtn title={isActive?"Unapprove Review":"Approve Review"} solid={isActive?"Unapprove Review":"Approve Review"} clickEvent onClick={() => toggleApprove()}/>
        </div>
      </div>
    </div>
  )
}