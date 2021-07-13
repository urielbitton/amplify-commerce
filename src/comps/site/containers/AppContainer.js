import React, {useContext, useEffect} from 'react'
import Navbar from '../common/Navbar'
import HomeCont from './HomeCont'
import { Route, Switch, useLocation } from 'react-router-dom'
import AdminApp from '../../admin/containers/AdminApp'
import Footer from '../common/Footer'
import SlideNav from '../common/SlideNav'
import { StoreContext } from '../../common/StoreContext'

export default function AppContainer() {

  const {showSearch} = useContext(StoreContext)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0,0) 
  },[location])
 
  return ( 
    <div className={`appcontainer ${showSearch?"noscroll":""}`}>
      <Switch>
        <Route path="/admin">
          <AdminApp />
        </Route>
        <Route path="/">
          <Navbar />
          <SlideNav />
          <HomeCont />
          <Footer />
        </Route>
      </Switch>
    </div>
  )
}