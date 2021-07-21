import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { convertDate } from '../../common/UtilityFuncs'
import PageTitle from '../common/PageTitle'
import {reviewsHeaders} from './arrays/arrays'

export default function Reviews() {

  const {allReviews} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(-1)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allReviewsFilter = allReviews?.filter(x => (pattern.test(x.title) || x.number === keyword || pattern.test(x.reviewer)))


  const headersrow = reviewsHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  const alLReviewsRow = allReviewsFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5>#{el.number}</h5>
      <h5>{el.title}</h5>
      <h5>{el.productName}</h5>
      <h5>{el.reviewer}</h5>
      <h5>{convertDate(el.dateReviewed.toDate())}</h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div><i className="far fa-edit"></i></div>
          <div title="Delete Review"><i className="far fa-trash-alt"></i></div>
          <div title="Review Info"><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  useEffect(() => {
    window.onclick = () => setShowOpts(-1)
  },[])

  return (
    <div className="reviewspage longidpage">
      <PageTitle title="Reviews"/>
      <div className="pagecont">
        <div className="reviewstablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {alLReviewsRow}
            </div>
            <div className="foot">
              <h5><span>{allReviewsFilter.length}</span> Reviews{allReviewsFilter.length>1?'s':''}</h5>
            </div>
          </div>
        </div>
      </div>
      Table of all reviews (allow moderating reviews: delete only - no creating, editing)
      OneCustomer page will show all reviews of a customer as ReviewCard component
    </div>
  )
}