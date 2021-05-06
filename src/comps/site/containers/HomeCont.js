import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Error from '../common/Error'
import './styles/Homecont.css'

export default function HomeCont() {
 
  return (
    <div className="homecont">
      <div className="homecontcover"></div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>  
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  )
}