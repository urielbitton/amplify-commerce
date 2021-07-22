import React from 'react'
import Ratings from '../../common/Ratings'
import './styles/Reviews.css'

export default function ReviewPage(props) {

  const {title, rating, reviewer} = props.el

  return ( 
    <div className="reviewspage">
      <div className="pagecont">
        <div>
          <div className="icontitle">
            <i className="fal fa-star-half-alt"></i>
          </div>
        </div>
        <div className="titlerow">
          <h4>{title}</h4>
          <Ratings rating={rating} />
          {rating} out of 5
        </div>
        <div className="reviewbody">
          <img src="https://i.imgur.com/Z8S9nq9.jpg" alt=""/>
          <h5>{reviewer}</h5>
        </div>
      </div>
    </div>
  )
}