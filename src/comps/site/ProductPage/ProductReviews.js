import React from 'react'
import './styles/ProductReviews.css'
import ReviewGrid from '../../common/ReviewGrid'

export default function ProductReviews(props) {

  const {reviews} = props

  return (
    <div className="productreviewcont">
      Product Reviews
      <ReviewGrid reviews={reviews} />
    </div>
  )
}