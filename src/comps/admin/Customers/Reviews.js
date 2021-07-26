import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Ratings from '../../common/Ratings'
import referProduct from '../../common/referProduct'
import { StoreContext } from '../../common/StoreContext'
import { convertDate, getCustomerArrById } from '../../common/UtilityFuncs'
import PageTitle from '../common/PageTitle'
import PageTitlesRow from '../common/PageTitlesRow'
import {reviewsHeaders} from './arrays/arrays'
import './styles/Reviews.css'

export default function Reviews() { 

  const {allReviews, allCustomers, allProducts} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(-1)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allReviewsFilter = allReviews?.filter(x => (pattern.test(x.title) || x.number === keyword || pattern.test(x.reviewer)))
  const history = useHistory()  

  const headersrow = reviewsHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5> 
  }) 

  const allReviewsRow = allReviewsFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5><Link to={`/admin/customers/reviews/${el.id}`}>#{el.number}</Link></h5>
      <h5><Link to={`/admin/customers/reviews/${el.id}`}>"{el.title}"</Link></h5>
      <h5>
        <Link to={`/admin/store/edit-product/${referProduct(allProducts, el.productId).id}`}>{referProduct(allProducts, el.productId).name}</Link>
      </h5>
      <h5>
        <Link to={`/admin/customer/${getCustomerArrById(allCustomers, el.reviewerId).id}`}>{getCustomerArrById(allCustomers, el.reviewerId).name}</Link>
      </h5>
      <h5>{convertDate(el.dateReviewed.toDate())}</h5> 
      <h5 className="ratingrow">
        <Ratings rating={el.rating}/>
      </h5> 
      <h5 className="status">
        <span className={!el.isActive?"notapproved":""}>{el.isActive?"Approved":"Not Approved"}</span>
      </h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div className="disabled"><i className="far fa-edit"></i></div>
          <div onClick={() => deleteReview()}><i className="far fa-trash-alt"></i></div>
          <div onClick={() => history.push(`/admin/customers/reviews/${el.id}`)}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function deleteReview() {

  }

  useEffect(() => {
    window.onclick = () => setShowOpts(-1)
  },[])

  return (
    <div className="reviewspage longidpage">
      <PageTitle title="Reviews"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Reviews" 
          searchPlaceholder="Find a review" 
          setKeyword={setKeyword}
        />
        <div className="reviewstablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allReviewsRow}
            </div>
            <div className="foot">
              <h5><span>{allReviewsFilter.length}</span> Reviews{allReviewsFilter.length>1?'s':''}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}