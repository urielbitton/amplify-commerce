import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Dashboard from '../Home/Dashboard'
import './styles/AdminHomecont.css'
import Products from '../Store/Products'
import EditProduct from '../Store/EditProduct'
import { StoreContext } from '../../common/StoreContext'

export default function AdminHomecont() {
 
  const {allProducts} = useContext(StoreContext)
  
  const editprodpages = allProducts?.map(el => {
    return <Route path={`/admin/store/edit-product/${el.id}`}>
      <EditProduct el={el} />
    </Route>
  })

  return (
    <div className="adminhomecont">
      <Navbar />
      <div className="maincontent">
        <Switch>
          <Route exact path="/admin/">
            <Dashboard />
          </Route>
          <Route path="/admin/store/products">
            <Products />
          </Route>
          {editprodpages}
        </Switch> 
      </div>
    </div> 
  )
}