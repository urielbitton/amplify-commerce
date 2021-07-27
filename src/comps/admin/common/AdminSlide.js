import React from 'react'
import './styles/AdminSlide.css'
import AdminBtn from '../common/AdminBtn'

export default function AdminSlide(props) {

  const {slidePos, setSlidePos, slidePages, slideTitle} = props
  const slidesLength = slidePages.length-1

  const sliderNav = <div className="slidernav">
    <AdminBtn 
      title={<i className="fal fa-arrow-left"></i>} clickEvent 
      disabled={slidePos<=0}
      solid
      onClick={() => slidePos>0&&setSlidePos(prev => prev-1)}
    />
    <AdminBtn 
      title={<i className="fal fa-arrow-right"></i>} clickEvent 
      disabled={slidePos>=slidesLength}
      solid
      onClick={() => slidePos<slidesLength&&setSlidePos(prev => prev+1)}
    />
  </div>
  console.log(slidePos,slidesLength) 

  const slidesRender = slidePages?.map((el,i) => {
    return <div className={`slide ${slidePos===i?"active":''} ${i<slidePos?"left":""}`}>
      {el}
      {sliderNav}
    </div>
  })

  return (
    <div className="adminslidecont">
      <h3 className="slidetitle">{slideTitle}</h3>
      {slidesRender}
    </div>
  )
}