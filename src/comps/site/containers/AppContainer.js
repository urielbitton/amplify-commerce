import React, {useContext, useEffect} from 'react'
import Navbar from '../common/Navbar'
import HomeCont from './HomeCont'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import AdminApp from '../../admin/containers/AdminApp'
import Footer from '../common/Footer'
import SlideNav from '../common/SlideNav'
import { StoreContext } from '../../common/StoreContext'

export default function AppContainer() {

  const {showSearch, myUser} = useContext(StoreContext)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0,0) 
  },[location])

  useEffect(() => {
    /*
    myUser?.admin === undefined&&!myUser?.admin?
    history.push('/'):
    history.push('/admin') 
    */
   //**remove when done developing**
  },[myUser])
 
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