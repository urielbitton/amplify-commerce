import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Error from '../common/Error'
import './styles/Homecont.css'
import { StoreContext } from '../../common/StoreContext'

export default function HomeCont() {

  const {slideNav} = useContext(StoreContext)
 
  return (
    <div className="homecont">
      <div className={`homecontcover ${slideNav&&"visible"}`}></div>
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