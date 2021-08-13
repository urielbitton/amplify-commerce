import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Error from '../common/Error'
import './styles/Homecont.css'
import { StoreContext } from '../../common/StoreContext'
import Shop from '../Shop/Shop'
import NewArrivals from '../NewArrivals/NewArrivals'
import About from '../About/About'
import Contact from '../Contact/Contact'
import Login from '../common/Login'
import Register from '../common/Register'
import ProductPage from '../ProductPage/ProductPage'
import Wishlist from '../Wishlist/Wishlist'
import CartPage from '../Cart/CartPage'
import Checkout from '../Checkout/Checkout'
import MyAccount from '../client/MyAccount'
import QuickShopComp from '../common/QuickShopComp'
import OrderConfirm from '../Checkout/OrderConfirm'
import OrderTrackingPage from '../common/OrderTrackingPage'
import OrderTracker from '../client/OrderTracker'
import Search from '../common/Search'
import Loader from '../../common/Loader'
import MissingItem from '../../admin/common/MissingItem'

export default function HomeCont() {

  const {slideNav, allProducts, allOrders, user} = useContext(StoreContext)
 
  return (
    <div className="homecont">
      <div className={`homecontcover ${slideNav&&"visible"}`}></div>
      <QuickShopComp />
      <OrderTracker />
      <Search />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route> 
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/new-arrivals">
          <NewArrivals />
        </Route>  
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/wishlist">
          <Wishlist />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/login">
          <Login /> 
        </Route>
        <Route exact path="/register">
          <Register /> 
        </Route>
        <Route path="/order-confirmation/:orderID"  
          render={el => {
          return allOrders.find(x => x.orderid === el.match.params.orderID)?
            <OrderConfirm el={allOrders.find(x => x.orderid === el.match.params.orderID)} />:
            <MissingItem itemName="Order" itemUrl="/my-account/orders"/>
          }}
        />
        <Route path="/order-tracking">
          <OrderTrackingPage />
        </Route>
        <Route path="/shop/product/:prodID"  
          render={el => {
          return allProducts.find(x => x.id === el.match.params.prodID)?
            <ProductPage el={allProducts.find(x => x.id === el.match.params.prodID)} />:
            <MissingItem itemName="Product" itemUrl="/shop"/>
          }}
        />
        <Route path="/my-account">
          {user ? <MyAccount /> : <Loader />}
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  )
}