import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../Home/Dashboard'

export default function AdminHomecont() {

  return (
    <div className="adminhomecont">
      <Switch>
        <Route exact path="/admin/">
          <Dashboard />
        </Route>
      </Switch>
    </div> 
  )
}