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
import Orders from '../Orders/Orders'
import EditOrder from '../Orders/EditOrder'
import Transactions from '../Orders/Transactions'
import NotifsCont from '../../common/NotifsCont'
import Analytics from '../Store/Analytics'
import Customers from '../Customers/Customers'
import EditCustomer from '../Customers/EditCustomer'
import Reviews from '../Customers/Reviews'

export default function AdminHomecont() {
 
  const {allProducts, allCoupons, allShipping, allOrders, allCustomers} = useContext(StoreContext)
  
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
  const editorderspages = allOrders?.map(el => {
    return <Route path={`/admin/orders/edit-order/${el.orderid}`}>
      <EditOrder el={el} />
    </Route> 
  }) 
  const editcustomerpages = allCustomers?.map(el => {
    return <Route path={`/admin/customers/edit-customer/${el.id}`}>
      <EditCustomer el={el} />
    </Route>
  })

  return (
    <div className="adminhomecont">
      <Navbar />
      <NotifsCont />
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
          <Route path="/admin/store/analytics">
            <Analytics />
          </Route>
          {editshippingpages}
          <Route exact path="/admin/orders">
            <Orders />
          </Route>
          <Route path="/admin/orders/add-order">
            <EditOrder />
          </Route>
          {editorderspages}
          <Route path="/admin/orders/transactions">
            <Transactions />
          </Route>
          <Route exact path="/admin/customers">
            <Customers />
          </Route>
          <Route exact path="/admin/customers/add-customer">
            <EditCustomer />
          </Route>
          {editcustomerpages}
          <Route exact path="/admin/customers/reviews">
            <Reviews />
          </Route>
        </Switch> 
      </div>
    </div> 
  )
}