import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Dashboard from '../Home/Dashboard'
import './styles/AdminHomecont.css'
import '../../site/common/styles/ProductTable.css'
import Products from '../Store/Products'
import EditProduct from '../Store/EditProduct'
import { StoreContext } from '../../common/StoreContext'
import Coupons from '../Store/Coupons'
import EditCoupon from '../Store/EditCoupon'

export default function AdminHomecont() {
 
  const {allProducts, allCoupons} = useContext(StoreContext)
  
  const editprodpages = allProducts?.map(el => {
    return <Route path={`/admin/store/edit-product/${el.id}`}>
      <EditProduct el={el} />
    </Route> 
  })
  const editcouponpages = allCoupons?.map(el => {
    return <Route path={`/admin/store/edit-coupon/${el.id}`}>
      <EditCoupon el={el} />
    </Route> 
  })

  return (
    <div className="adminhomecont">
      <Navbar />
      <div className="maincontent">
        <Switch>
          <Route exact path="/admin/">
            <Dashboard />
          </Route>
          <Route path="/admin/store/products">
            <Products />
          </Route>
          {editprodpages}
          <Route path="/admin/store/add-product">
            <EditProduct /> 
          </Route>
          <Route path="/admin/store/coupons">
            <Coupons />
          </Route>
          {editcouponpages}
          <Route path="/admin/store/add-coupon">
            <EditCoupon />
          </Route>
        </Switch> 
      </div>
    </div> 
  )
}