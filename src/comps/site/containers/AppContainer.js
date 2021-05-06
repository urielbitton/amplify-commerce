import React from 'react'
import Navbar from '../common/Navbar'
import HomeCont from './HomeCont'
import { Route, Switch } from 'react-router-dom'
import AdminApp from '../../admin/containers/AdminApp'

export default function AppContainer() {

  return (
    <div className="appcontainer">
      <Switch>
        <Route path="/admin">
          <AdminApp />
        </Route>
        <Route path="/">
          <Navbar />
          <HomeCont />
        </Route>
      </Switch>
    </div>
  )
}