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

export default function HomeCont() {

  const {slideNav, allProducts, myUser} = useContext(StoreContext)

  const productpagerow = allProducts?.map(el => {
    return <Route exact path={`/product/${el.id}`}>
      <ProductPage el={el} key={el.id}/> 
    </Route>
  })
 
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
        <Route exact path="/order-confirm">
          <OrderConfirm /> 
        </Route>
        <Route path="/order-tracking">
          <OrderTrackingPage />
        </Route>
        {productpagerow}
        <Route path="/my-account">
          {myUser&&<MyAccount />}
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  )
}