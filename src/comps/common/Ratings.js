import React from 'react'

export default function Ratings(props) {

  const {rating, color="var(--orange)"} = props

  return (
    <div className="ratingscont">
      { Array.apply(null, { length: Math.round(rating) }).map((el,i) => <i className="fas fa-star" style={{color}} key={i}></i> ) } 
      { Array.apply(null, { length: 5-Math.round(rating) }).map((el,i) => ( <i className="far fa-star" style={{color}} key={i}></i> )) }
    </div>
  )
} 