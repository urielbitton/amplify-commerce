import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Dashboard from '../Home/Dashboard'
import './styles/AdminHomecont.css'

export default function AdminHomecont() {
 
  return (
    <div className="adminhomecont">
      <Navbar />
      <div className="maincontent">
        <Switch>
          <Route exact path="/admin/">
            <Dashboard />
          </Route>
        </Switch> 
      </div>
    </div> 
  )
}