import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Dashboard from '../Home/Dashboard'
import './styles/AdminHomecont.css'
import '../../common/styles/ProductTable.css'
import Products from '../Store/Products'
import EditProduct from '../Store/EditProduct'
import { StoreContext } from '../../common/StoreContext'
import Coupons from '../Store/Coupons'
import EditCoupon from '../Store/EditCoupon'
import EditShipping from '../Store/EditShipping'
import Shipping from '../Store/Shipping'

export default function AdminHomecont() {
 
  const {allProducts, allCoupons, allShipping} = useContext(StoreContext)
  
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
  const editshippingpages = allShipping?.map(el => {
    return <Route path={`/admin/store/edit-shipping/${el.id}`}>
      <EditShipping el={el} />
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
          <Route path="/admin/store/add-product">
            <EditProduct /> 
          </Route>
          {editprodpages}
          <Route path="/admin/store/coupons">
            <Coupons />
          </Route>
          <Route path="/admin/store/add-coupon">
            <EditCoupon />
          </Route>
          {editcouponpages}
          <Route path="/admin/store/shipping">
            <Shipping />
          </Route>
          <Route path="/admin/store/add-shipping">
            <EditShipping />
          </Route>
          {editshippingpages}
        </Switch> 
      </div>
    </div> 
  )
}