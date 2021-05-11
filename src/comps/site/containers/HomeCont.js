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

export default function HomeCont() {

  const {slideNav} = useContext(StoreContext)
 
  return (
    <div className="homecont">
      <div className={`homecontcover ${slideNav&&"visible"}`}></div>
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
        <Route exact path="/login">
          <Login /> 
        </Route>
        <Route exact path="/register">
          <Register /> 
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  )
}